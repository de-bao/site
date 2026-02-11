import Section from './Section'

const Projects = () => {
  return (
    <Section title="Projects">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="md:col-span-2">
          <a href="https://www.bilibili.com/video/BV1Rp4y187ZJ" target="_blank" rel="noopener noreferrer">
            <img 
              src="/index_files/wkfgicon.png" 
              alt="SJTU Anonymous Forum" 
              className="w-[70%] rounded-2xl mx-auto"
            />
          </a>
        </div>
        <div className="md:col-span-3">
          <h3 className="text-lg font-semibold mb-2">
            <a 
              href="https://www.bilibili.com/video/BV1Rp4y187ZJ" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              SJTU Anonymous Forum 「无可奉告」
            </a>
          </h3>
          <div className="flex flex-wrap gap-2 text-sm mb-2">
            <a href="https://github.com/TairanHe/SJTU-Anonymous_Forum" target="_blank" rel="noopener noreferrer">
              Android Code
            </a>
            | <a href="https://github.com/oscardhc/Forum" target="_blank" rel="noopener noreferrer">
              iOS Code
            </a>
            | <a href="https://www.bilibili.com/video/BV1Rp4y187ZJ" target="_blank" rel="noopener noreferrer">
              Farewell Video
            </a>
          </div>
          <p className="text-sm text-justify italic">
            A carefree forum platform for SJTUers sharing and talking with anonymous identity. More than{' '}
            <span className="text-red-600 font-semibold italic">10000+</span> users used「无可奉告」in the SJTU campus.
          </p>
        </div>
      </div>
    </Section>
  )
}

export default Projects
