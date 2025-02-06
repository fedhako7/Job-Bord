import React, { Component } from 'react'
import hero_image from '../../assets/hero_image.webp'
import { sectionTexts } from './sectionTexts'
import Buttons from './buttons'
import SearchComponent from './SearchComponent'

function Landing() {
  return (
    <section className={` bg-[#8A9A5B] w-full `}>

      {/* Hero Section */}
      <section className={` flex flex-col mt-4 justify-around items-center md:flex-row `}>
        <div className={` flex-grow m-4 p-4`}>
          <h1 className='flex flex-grow text-7xl mb-3 xl:mb-5 '>Find your dream job!</h1>
          <p className=' flex flex-grow text-lg xl:text-2xl'>
            Search for your dream job and apply with one click!
          </p>

          <div className=' xl:textxl'>
            <p className=' text-center  mt-5 text-sm sm:text-base md:text-lg xl:text-xl'>Continue with Google</p>
            <div>
              <Buttons buttonName={` 🛠️Find Jobs`} />
              <Buttons buttonName={` 👨‍💼Hire Talent`} />
            </div>
          </div>
        </div>

        <div className="flex relative">
          <img
            src={hero_image}
            className=" w-[84%] max-w-[950px] m-4 pl-4 self-center object-cover"
          />
          <div className="w-[84%] m-4 mb-2 pl-4 absolute inset-0 bg-gradient-to-b from-transparent to-[#f8f9fa] to-95%">
          </div>
        </div>
      </section>
      <Break />

      {/* Search Section */}
      <section>
        <SectionsText section={sectionTexts.search} />
        <div className={`max-w-[1200px] ml-auto mr-auto `}>
          <SearchComponent />
        </div>
      </section>
      <Break />

      {/* Featured Jobs */}
      <section></section>

      {/* How it works */}
      <section>
        <SectionsText section={sectionTexts.howItWorks} />
      </section>
      <Break />

      {/* CTO */}
      <section> </section>

      {/* Feedback */}
      <section> </section>

      {/* Remove the following sections: */}
      {/* About Section */}
      <section className='flex justify-center itemscenter'>
        <SectionsText section={sectionTexts?.about} />
      </section>
      <Break />

      {/* Contact Section */}
      <section className=' mb-6 '>
        <SectionsText section={sectionTexts?.contact} />
      </section>
    </section>
  )
}

// Section Component
const SectionsText = ({ section }) => {
  return (
    <div className={` flex-grow ml-4 pl-4 pr-4  text-center `}>
      <h1 className='flx flex-grow text-5xl mb-3 xl:mb-5 '> {section?.title} </h1>
      <p className=' flex flex-grow text-start text-lg xl:text-2xl whitespace-pre-line md:pl-6 pmd:pr-6'>
        {section?.text}
      </p>
    </div>
  )
}

// Line Break Component
const Break = () => {
  return (
    <hr className=' m-7 border-black border-[1px]' />
  )
}


export default Landing