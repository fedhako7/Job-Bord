import React from 'react'
import hero_image from '../../assets/hero_image.webp'

function Landing() {
  return (
    <section className={` bg-[#8A9A5B] w-full `}>
      {/* Hero Section */}
      <section className={` flex flex-col justify-around items-center md:flex-row `}>

        <div className={` flex-grow m-4 p-4`}>
          <h1 className='flex flex-grow text-7xl mb-3 xl:mb-5 '>Find your dream job!</h1>
          <p className=' flex flex-grow text-lg xl:text-2xl'>
            Search for your dream job and apply with one click!
          </p>
          {/* Search Input field here */}
        </div>

        <div className="flex relative">
          <img
            src={hero_image}
            className="w-[84%] max-w-[950px] m-4 pl-4 self-center object-cover"
          />
          <div className="w-[84%] m-4 mb-2 pl-4 absolute inset-0 bg-gradient-to-b from-transparent to-[#f8f9fa] to-95%">
          </div>
        </div>
      </section>

      {/* How it works */}
      <section>
        <div>
          How It Works
        </div>
      </section>

      {/* About Section */}
      <section className='flex flex-col justify-center items-center'>
        <div>
          <h1>About Job Bord</h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className='flex flex-col justify-center items-center'>
        <div>
          <h1>Contact</h1>
        </div>
      </section>

    </section>
  )
}

export default Landing