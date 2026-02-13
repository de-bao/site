# 聊天记录持久化方案

## ✅ 已实现：前端 localStorage 持久化

前端已实现本地存储，聊天记录会自动保存到浏览器的 localStorage 中：
- ✅ 自动保存：聊天记录变化时自动保存（防抖500ms）
- ✅ 自动加载：页面刷新后自动恢复聊天记录
- ✅ 自动标题：第一条消息自动作为聊天标题
- ✅ 存储管理：处理存储空间不足的情况

## 📋 后端数据库持久化方案（推荐）

### 方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| **SQLite** | 简单、无需额外服务、文件存储 | 并发性能一般 | 单机部署、小规模 |
| **PostgreSQL** | 功能强大、性能好、支持复杂查询 | 需要单独部署 | 生产环境、多用户 |
| **MySQL** | 成熟稳定、生态丰富 | 需要单独部署 | 传统项目 |
| **MongoDB** | 灵活、适合JSON数据 | 需要单独部署 | 文档型数据 |

### 🎯 推荐方案：SQLite（简单）或 PostgreSQL（生产）

#### 方案1：SQLite（快速实现）

**优点：**
- 无需额外服务，单文件数据库
- Python内置支持，零配置
- 适合单用户或小规模使用

**实现步骤：**

1. **安装依赖**
```bash
cd /home/10355407/下载/baode-resume/chatback
pip install sqlalchemy aiosqlite
```

2. **创建数据库模型** (`chatback/models.py`)
```python
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

Base = declarative_base()

class ChatSession(Base):
    __tablename__ = 'chat_sessions'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(200), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ChatMessage(Base):
    __tablename__ = 'chat_messages'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(Integer, nullable=False, index=True)
    role = Column(String(20), nullable=False)  # 'user' or 'assistant'
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
```

3. **创建数据库工具** (`chatback/database.py`)
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, ChatSession, ChatMessage
import os

# SQLite数据库路径
DB_PATH = os.getenv('DB_PATH', 'chat_history.db')

engine = create_engine(f'sqlite:///{DB_PATH}', echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    """初始化数据库"""
    Base.metadata.create_all(bind=engine)

def get_db():
    """获取数据库会话"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

4. **添加API端点** (`chatback/app.py` 中添加)
```python
from fastapi import Depends
from sqlalchemy.orm import Session
from database import get_db, init_db
from models import ChatSession, ChatMessage
from pydantic import BaseModel
from typing import List, Optional

# 初始化数据库
init_db()

# 请求模型
class SaveChatRequest(BaseModel):
    session_id: Optional[int] = None
    name: str
    messages: List[dict]  # [{role: str, content: str}]

class ChatSessionResponse(BaseModel):
    id: int
    name: str
    created_at: str
    updated_at: str

# 保存聊天记录
@app.post("/api/chat/save")
async def save_chat(request: SaveChatRequest, db: Session = Depends(get_db)):
    """保存聊天记录"""
    if request.session_id:
        # 更新现有会话
        session = db.query(ChatSession).filter_by(id=request.session_id).first()
        if not session:
            raise HTTPException(status_code=404, detail="Chat session not found")
        session.name = request.name
    else:
        # 创建新会话
        session = ChatSession(name=request.name)
        db.add(session)
        db.flush()
    
    # 删除旧消息
    db.query(ChatMessage).filter_by(session_id=session.id).delete()
    
    # 添加新消息
    for msg in request.messages:
        message = ChatMessage(
            session_id=session.id,
            role=msg['role'],
            content=msg['content']
        )
        db.add(message)
    
    db.commit()
    return {"session_id": session.id, "message": "Chat saved successfully"}

# 获取聊天列表
@app.get("/api/chat/sessions", response_model=List[ChatSessionResponse])
async def get_chat_sessions(db: Session = Depends(get_db)):
    """获取所有聊天会话"""
    sessions = db.query(ChatSession).order_by(ChatSession.updated_at.desc()).all()
    return sessions

# 获取聊天详情
@app.get("/api/chat/session/{session_id}")
async def get_chat_session(session_id: int, db: Session = Depends(get_db)):
    """获取聊天会话详情"""
    session = db.query(ChatSession).filter_by(id=session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Chat session not found")
    
    messages = db.query(ChatMessage).filter_by(session_id=session_id).order_by(ChatMessage.created_at).all()
    
    return {
        "id": session.id,
        "name": session.name,
        "messages": [
            {"role": msg.role, "content": msg.content}
            for msg in messages
        ],
        "created_at": session.created_at.isoformat(),
        "updated_at": session.updated_at.isoformat()
    }

# 删除聊天会话
@app.delete("/api/chat/session/{session_id}")
async def delete_chat_session(session_id: int, db: Session = Depends(get_db)):
    """删除聊天会话"""
    session = db.query(ChatSession).filter_by(id=session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Chat session not found")
    
    # 删除关联消息
    db.query(ChatMessage).filter_by(session_id=session_id).delete()
    # 删除会话
    db.delete(session)
    db.commit()
    
    return {"message": "Chat session deleted successfully"}
```

5. **前端调用** (可选，在 `src/services/api.js` 中添加)
```javascript
// 保存聊天到服务器
export async function saveChatToServer(sessionId, name, messages) {
  const response = await fetch(`${API_BASE_URL}/api/chat/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id: sessionId || null,
      name,
      messages
    })
  })
  return await response.json()
}

// 从服务器加载聊天列表
export async function loadChatsFromServer() {
  const response = await fetch(`${API_BASE_URL}/api/chat/sessions`)
  return await response.json()
}
```

#### 方案2：PostgreSQL（生产环境）

如果使用PostgreSQL，只需修改数据库连接：

```python
# database.py
import os
from sqlalchemy import create_engine

DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://user:password@localhost/chatdb')
engine = create_engine(DATABASE_URL)
```

安装依赖：
```bash
pip install psycopg2-binary sqlalchemy
```

## 🔄 混合方案（最佳实践）

**推荐实现：前端 localStorage + 后端数据库**

1. **前端优先使用 localStorage**（快速、离线可用）
2. **后台同步到服务器**（持久化、多设备同步）
3. **冲突处理**：服务器数据优先

### 实现策略

```javascript
// 在 App.vue 中
import { saveChatToServer } from './services/api'

// 保存聊天时，同时保存到服务器（可选）
watch(chats, async () => {
  // 先保存到本地
  saveChatsToLocal(chats.value)
  
  // 后台同步到服务器（不阻塞UI）
  if (navigator.onLine) {
    try {
      for (const [id, chat] of chats.value) {
        await saveChatToServer(id, chat.name, chat.messages)
      }
    } catch (error) {
      console.warn('同步到服务器失败:', error)
      // 失败不影响本地使用
    }
  }
}, { deep: true })
```

## 📊 数据迁移

如果需要从 localStorage 迁移到数据库：

```javascript
// 迁移脚本
const localChats = loadChatsFromLocal()
for (const [id, chat] of localChats) {
  await saveChatToServer(id, chat.name, chat.messages)
}
```

## 🎯 建议

1. **当前阶段**：使用 localStorage 已足够（已实现）
2. **需要多设备同步时**：添加后端数据库
3. **生产环境**：推荐 PostgreSQL
4. **快速原型**：SQLite 足够

## 📝 注意事项

- **数据安全**：敏感信息考虑加密
- **存储限制**：localStorage 通常限制 5-10MB
- **备份**：定期备份数据库
- **清理**：定期清理旧聊天记录
