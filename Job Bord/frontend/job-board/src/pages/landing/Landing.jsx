import React, { Component } from 'react'
import hero_image from '../../assets/hero_image.webp'
import { sectionTexts } from './sectionTexts'
import Buttons from './buttons'
import SearchComponent from './SearchComponent'
import FeaturedJobs from '../../components/job/FeaturedJobs'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/Phone';


function Landing() {
  const links = [
    [`Email`, `mailto:fedhasayelmachew@gmail.com`, MailIcon],
    [`LinkedIn`, `https://www.linkedin.com/in/linkfedhako7/`,  LinkedInIcon ],
    [`Telegram`, `https://t.me/fedhako77`,  TelegramIcon ],
    [`gitHub`, `https://github.com/fedhako7/fedhako7`,  GitHubIcon ],
    [`+2519542008`, `Phone`,  PhoneIcon ],
  ]

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
      <section>
        <SectionsText section={sectionTexts.featuredJobs} />
        <div className='  bg-blue-00'>
          <FeaturedJobs />

        </div>
        <Buttons buttonName={`Login & See More`} />
      </section>
      <Break />


      {/* How it works */}
      <section>
        <SectionsText section={sectionTexts.howItWorks} />
      </section>
      <Break />

      {/* Auths */}
      <section>
        <SectionsText section={sectionTexts.auth} />
        <div className=' flex flex-col md:flex-row md:justify-around md:items-end md:gap-5'>
          <div>
            <Buttons buttonName={`Get Started`} />
          </div>
          <div className=' mt-4 '>
            <p className=' -mb-2 italic  text-center '>
              Already have an account?
            </p>
            <Buttons buttonName={`Log In`} />
          </div>

        </div>

      </section>
      <Break />

      {/* Feedback */}
      <section> </section>

      {/* Contact Section */}
      <section className=' mb-6 '>
        <div className=' flex flex-col '>
          <div>
            <SectionsText section={sectionTexts?.contact} />
          </div>

          <div className='flex m-4 p-4 justify-center self-center border-[1px] rounded-md border-gray-600 md:w-[500px]'>
            {/* Send message box */}
            <div className='flex flex-col gap-4 p-3'>
              <div className='flex flex-col gap-3'>
                <input type="text" placeholder='Name'
                  className=' min-h-9 min-w-56 pl-2 rounded-md '
                />
                <input type="email" placeholder='Email'
                  className=' min-h-9 pl-2 rounded-md '
                />
              </div>
              <textarea name="message"
                id="message"
                placeholder='Message'
                className=' min-w-60 min-h-20 pl-2 md:min-w-72 rounded-md'>
              </textarea>
              <div>
                <Buttons buttonName={`Send message`} />
              </div>
            </div>
          </div>

          {/* Social media links */}
          <div className='flex flex-col min-w-60 m-4 p-4 gap-3 justify-center self-center border-[1px] rounded-md border-gray-600 md:w-[500px]'>
            <p className=' italic '>Connect with us!</p>
            <div className='grid grid-cols-2 gap-3'>
              {
                links.map((data, idx) => (
                  <LinkComponent
                  key={idx}
                    name={data[0]}
                    link={data[1]}
                    Icon={data[2]}
                  />
                ))
              }
            </div>
          </div>

        </div>
      </section>
    </section>
  )
}

// Section Component
const SectionsText = ({ section }) => {
  return (
    <div className={` flex-grow ml-4 pl-4 pr-4  text-center `}>
      <h1 className='flx flex-grow text-4xl mb-3 xl:mb-5 sm:text-5xl'> {section?.title} </h1>
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

//Links Component
const LinkComponent = ({ link, name, Icon }) => {
  return (
    <div>
      <a href={link}>
        <>
          <Icon/>
          {name}
        </>
      </a>
    </div>
  )
}


export default Landing