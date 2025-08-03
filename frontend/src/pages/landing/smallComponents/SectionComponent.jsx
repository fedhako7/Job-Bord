import React from 'react'

const SectionComponent = ({ section }) => {
  return (
    <div className={` flex-grow ml-4 pl-4 pr-4  text-center `}>
      <h1 className='flx flex-grow text-4xl mb-3 xl:mb-5 sm:text-5xl'> {section?.title} </h1>
      <p className=' flex flex-grow text-start text-lg xl:text-2xl whitespace-pre-line md:pl-6 pmd:pr-6'>
        {section?.text}
      </p>
    </div>
  )
}

export default SectionComponent
