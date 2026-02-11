import { useState } from 'react'
import Header from './components/Header'
import News from './components/News'
import Publications from './components/Publications'
import Research from './components/Research'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-5 py-8">
        <Header />
        <News />
        <Publications />
        <Research />
      </div>
    </div>
  )
}

export default App
