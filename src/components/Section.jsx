const Section = ({ title, children, className = '' }) => {
  return (
    <div className={`mb-8 ${className}`}>
      <hr className="my-6 border-t border-gray-300" />
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  )
}

export default Section
