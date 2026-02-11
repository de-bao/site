import { useState } from 'react'
import { publications } from '../data/publications'

const PublicationItem = ({ publication }) => {
  const [showAbstract, setShowAbstract] = useState(false)
  const [showBibtex, setShowBibtex] = useState(false)

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="md:col-span-2">
        {publication.video && (
          <video
            playsInline
            autoPlay
            loop
            muted
            src={publication.video}
            poster="https://tairanhe.com/images/loading-icon.gif"
            className="w-full rounded-2xl"
          />
        )}
        {publication.image && (
          <img
            src={publication.image}
            alt={publication.title}
            className="w-full rounded-2xl"
          />
        )}
        {!publication.video && !publication.image && (
          <div className="w-full aspect-video bg-gray-100 rounded-2xl flex items-center justify-center">
            <span className="text-gray-400">No preview</span>
          </div>
        )}
      </div>
      <div className="md:col-span-3">
        <h3 className="text-lg font-semibold mb-2">
          <a href={publication.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">
            {publication.title}
          </a>
        </h3>
        <p className="mb-2 text-sm">{publication.authors}</p>
        <div className="mb-2 text-sm">
          {publication.year && <span className="font-semibold">{publication.year}</span>}
          {publication.conference && (
            <>
              {publication.year && ' '}
              <span>{publication.conference}</span>
            </>
          )}
          {publication.special && (
            <>
              {' '}
              <span className="text-red-600 font-semibold">({publication.special})</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-sm mb-2">
          {publication.webpage && (
            <a href={publication.webpage} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">webpage</a>
          )}
          {publication.pdf && (
            <>
              | <a href={publication.pdf} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">pdf</a>
            </>
          )}
          {publication.abstract && (
            <>
              | <button
                  onClick={() => setShowAbstract(!showAbstract)}
                  className="text-primary hover:text-secondary cursor-pointer bg-transparent border-none"
                >
                  abstract
                </button>
            </>
          )}
          {publication.bibtex && (
            <>
              | <button
                  onClick={() => setShowBibtex(!showBibtex)}
                  className="text-primary hover:text-secondary cursor-pointer bg-transparent border-none"
                >
                  bibtex
                </button>
            </>
          )}
          {publication.arxiv && (
            <>
              | <a href={publication.arxiv} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">arXiv</a>
            </>
          )}
          {publication.code && (
            <>
              | <a href={publication.code} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">code</a>
            </>
          )}
        </div>
        {showAbstract && publication.abstract && (
          <p className="text-sm italic mb-2 text-justify mt-2">{publication.abstract}</p>
        )}
        {showBibtex && publication.bibtex && (
          <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto mt-2">
            {publication.bibtex}
          </pre>
        )}
      </div>
    </div>
  )
}

const Publications = () => {
  return (
    <div className="mb-8">
      <hr className="my-6 border-t border-gray-300" />
      <h2 className="text-2xl font-semibold mb-6">Publications</h2>
      <div>
        {publications.map((pub, index) => (
          <PublicationItem key={index} publication={pub} />
        ))}
      </div>
    </div>
  )
}

export default Publications
