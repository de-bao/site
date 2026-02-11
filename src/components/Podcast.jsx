const Podcast = () => {
  return (
    <div className="mb-8">
      <hr className="my-6 border-t border-gray-300" />
      <h2 className="text-2xl font-semibold mb-6">Podcast</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2">
          <a href="https://tairanhe.com/podcast_en" target="_blank" rel="noopener noreferrer">
            <img 
              src="/index_files/whynottv.png" 
              alt="WhynotTV Podcast" 
              className="w-[60%] rounded-[35px] mx-auto"
            />
          </a>
        </div>
        <div className="md:col-span-3">
          <h3 className="text-lg font-semibold mb-4">
            <a 
              href="https://tairanhe.com/podcast_en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary"
            >
              WhynotTV Podcast
            </a>
          </h3>
          <p className="text-base mb-4">
            I host <a href="https://tairanhe.com/podcast_en" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">WhynotTV Podcast</a> /{' '}
            <a href="https://tairanhe.com/podcast_cn" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">WhynotTV播客</a>, a deep, professional, hardcore, long-form (2-4 hours) AI tech video podcast—focusing on
          </p>
          <ul className="list-disc list-inside mb-4 ml-4 space-y-1">
            <li>in-depth discussions about AI/technology;</li>
            <li>breaking down underlying technical details and business logic;</li>
            <li>while also exploring life wisdom and personal growth philosophy.</li>
          </ul>
          <p className="text-base mb-2">You can find the podcast on</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="https://www.youtube.com/@whynottv1999" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">YouTube</a> |
            <a href="https://space.bilibili.com/14145636" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">Bilibili</a> |
            <a href="https://open.spotify.com/show/15liAZ2hDo4YLoyXjruq9A" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">Spotify</a> |
            <a href="https://podcasts.apple.com/us/podcast/whynottv-podcast/id1824936911" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">Apple Podcast</a> |
            <a href="https://www.xiaoyuzhoufm.com/podcast/686a1832222ae2de21fea940" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">小宇宙</a> |
            <a href="https://anchor.fm/s/106f6c76c/podcast/rss" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">RSS</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Podcast
