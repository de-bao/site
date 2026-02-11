#!/usr/bin/env python3
"""
从原始HTML文件中提取所有论文和其他内容数据
"""
import re
import json
from pathlib import Path

def extract_publications(html_content):
    """提取所有论文信息"""
    publications = []
    
    # 找到Publications部分的开始和结束
    pub_start = html_content.find('<sectionheading>&nbsp;&nbsp;Publications</sectionheading>')
    pub_end = html_content.find('<sectionheading>&nbsp;&nbsp;Projects</sectionheading>')
    
    if pub_start == -1 or pub_end == -1:
        print("未找到Publications部分")
        return []
    
    # 只提取Publications部分的内容
    pub_section = html_content[pub_start:pub_end]
    
    # 匹配每个论文的tr块
    paper_pattern = r'<tr>.*?<heading>(.*?)</heading>.*?</tr>'
    matches = list(re.finditer(paper_pattern, pub_section, re.DOTALL))
    
    print(f"找到 {len(matches)} 篇论文（仅Publications部分）")
    
    for i, match in enumerate(matches):
        paper_html = match.group(0)
        
        # 提取标题
        title_match = re.search(r'<heading>(.*?)</heading>', paper_html)
        title = title_match.group(1).strip() if title_match else ""
        
        # 提取作者
        authors_match = re.search(r'<heading>.*?</heading>.*?<br>\s*(.*?)\s*<br>', paper_html, re.DOTALL)
        authors = authors_match.group(1).strip() if authors_match else ""
        
        # 提取年份
        year_match = re.search(r'(\d{4})\s*<br>', paper_html)
        year = year_match.group(1) if year_match else ""
        
        # 提取链接
        link_match = re.search(r'<a href="([^"]+)"[^>]*id="[^"]*">\s*<heading>', paper_html)
        link = link_match.group(1) if link_match else ""
        
        # 提取webpage, pdf, arxiv, code
        webpage_match = re.search(r'<a href="([^"]+)"[^>]*>webpage</a>', paper_html)
        webpage = webpage_match.group(1) if webpage_match else ""
        
        pdf_match = re.search(r'<a href="([^"]+)"[^>]*>pdf</a>', paper_html)
        pdf = pdf_match.group(1) if pdf_match else ""
        
        arxiv_match = re.search(r'<a href="([^"]+)"[^>]*>arXiv</a>', paper_html)
        arxiv = arxiv_match.group(1) if arxiv_match else ""
        
        code_match = re.search(r'<a href="([^"]+)"[^>]*>code</a>', paper_html)
        code = code_match.group(1) if code_match else ""
        
        # 提取abstract
        abstract_match = re.search(r'<i[^>]*id="[^"]*_abs"[^>]*>(.*?)</i>', paper_html, re.DOTALL)
        abstract = abstract_match.group(1).strip() if abstract_match else ""
        
        # 提取bibtex
        bibtex_match = re.search(r'<pre[^>]*>(.*?)</pre>', paper_html, re.DOTALL)
        bibtex = bibtex_match.group(1).strip() if bibtex_match else ""
        
        # 提取图片或视频
        image_match = re.search(r'<img[^>]*src="([^"]+)"', paper_html)
        video_match = re.search(r'<video[^>]*src="([^"]+)"', paper_html)
        
        image = ""
        video = ""
        if image_match:
            image = image_match.group(1).replace("./Tairan He_files/", "/index_files/")
        if video_match:
            video = video_match.group(1)
        
        pub = {
            "title": title,
            "authors": authors,
            "year": year,
            "link": link or webpage,
            "webpage": webpage,
            "pdf": pdf,
            "arxiv": arxiv,
            "code": code,
            "abstract": abstract,
            "bibtex": bibtex,
            "image": image,
            "video": video
        }
        
        publications.append(pub)
        print(f"{i+1}. {title[:60]}...")
    
    return publications

if __name__ == "__main__":
    html_file = Path("/home/10355407/下载/baode-resume/Tairan He.html")
    
    if not html_file.exists():
        print(f"文件不存在: {html_file}")
        exit(1)
    
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    publications = extract_publications(html_content)
    
    # 保存为JSON
    output_file = Path(__file__).parent.parent / "src" / "data" / "publications.json"
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(publications, f, ensure_ascii=False, indent=2)
    
    print(f"\n已保存 {len(publications)} 篇论文到 {output_file}")
