import { useState } from 'react'

const Header = () => {
  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-normal mb-2">Index 「何泰然」</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <img 
            src="./index_files/tairan&h1_crop.JPG" 
            alt="Profile" 
            className="w-full rounded-2xl mb-4"
          />
          <div className="text-center space-y-2 text-sm">
            <div>
              | <a href="https://tairanhe.com/data/TairanHe_CV_20251127.pdf" target="_blank" rel="noopener noreferrer">CV</a> |
              <a href="mailto:tairanh@andrew.cmu.edu"> Email</a> |
              <a href="https://scholar.google.com/citations?user=TVWH2U8AAAAJ" target="_blank" rel="noopener noreferrer"> Google Scholar</a> |
            </div>
            <div>
              | <a href="https://github.com/TairanHe" target="_blank" rel="noopener noreferrer">Github</a> | 
              <a href="https://www.linkedin.com/in/tairan-he-41a904294/" target="_blank" rel="noopener noreferrer">LinkedIn</a> |
            </div>
            <div>
              | <a href="https://www.youtube.com/@whynottv1999" target="_blank" rel="noopener noreferrer">YouTube</a> | 
              <a href="https://space.bilibili.com/14145636" target="_blank" rel="noopener noreferrer">Bilibili</a> | 
            </div>
            <div>
              | <a href="https://tairanhe.com/podcast_en" target="_blank" rel="noopener noreferrer">WhynotTV Podcast</a> | 
              <a href="https://tairanhe.com/podcast_cn" target="_blank" rel="noopener noreferrer">播客</a> |
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="space-y-4 text-justify">
            <p>
              I am a final-year Ph.D. student at the{' '}
              <a href="https://www.ri.cmu.edu/" target="_blank" rel="noopener noreferrer">Robotics Institute</a> at{' '}
              <a href="https://www.cmu.edu/" target="_blank" rel="noopener noreferrer">Carnegie Mellon University</a>, advised by{' '}
              <a href="http://www.gshi.me/" target="_blank" rel="noopener noreferrer">Guanya Shi</a> and{' '}
              <a href="https://www.cs.cmu.edu/~cliu6/" target="_blank" rel="noopener noreferrer">Changliu Liu</a>. I am also a member of{' '}
              <a href="https://research.nvidia.com/labs/gear/" target="_blank" rel="noopener noreferrer">NVIDIA GEAR group</a> led by{' '}
              <a href="https://jimfan.me/" target="_blank" rel="noopener noreferrer">Jim Fan</a> and{' '}
              <a href="https://yukezhu.me/" target="_blank" rel="noopener noreferrer">Yuke Zhu</a>. My research is supported by CMU RI Presidential Fellowship and NVIDIA Graduate Fellowship.
            </p>
            <p>
              I received my Bachelor's degree in computer science at{' '}
              <a href="http://en.sjtu.edu.cn/" target="_blank" rel="noopener noreferrer">Shanghai Jiao Tong University</a>, advised by{' '}
              <a href="http://wnzhang.net/" target="_blank" rel="noopener noreferrer">Weinan Zhang</a>. I also spent time at{' '}
              <a href="https://www.microsoft.com/en-us/research/lab/microsoft-research-asia/" target="_blank" rel="noopener noreferrer">Microsoft Research Asia</a>.
            </p>
            <p>
              <strong>Goal:</strong> Robots that improve everyone's life.
            </p>
            <p>
              <strong>Research Interest:</strong> The intersection of <u>robotics</u>, <u>large-scale machine learning</u>, and <u>general-purpose loco-manipulation</u>.
            </p>
            <p>
              <strong>Research Question:</strong> How can we build <u>scalable robot learning flywheel</u> that unify <u>perception</u>, whole-body <u>control</u>, and dexterous <u>manipulation</u>, enabling reliable general-purpose robots in <u>unstructured, real-world environments</u>?
            </p>
            <p>
              <strong>Robots:</strong> I love working on <u>humanoids</u> and aim to make them capable of doing everything I can do—and more.
            </p>
            <p>
              Email: tairanh [AT] andrew.cmu.edu
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
