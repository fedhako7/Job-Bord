import React, { useRef, useState } from 'react'
import hero_image from '../../assets/hero_image.webp'
import { sectionTexts } from './componentsData/sectionTexts'
import FeaturedJobs from '../../components/job/FeaturedJobs'
import { linksData } from './componentsData/linksData'
import { ButtonComponent, SearchComponent, Break, LinkComponent, SectionComponent } from './smallComponents/componentsExporter'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../axios/Axios'
import JobCard from '../../components/job/JobCard'
import GoogleAuth from '../auth/googleAuth/GoogleAuth'

function Landing() {
  // Constants and Variables
  const navigate = useNavigate()
  const [searchResult, setSearchResult] = useState([])
  const [filterHidden, setFilterHidden] = useState(true)
  const [searchMessage, setSearchMessage] = useState('')
  const searchRef = useRef('')

  // Handle search
  const handleSearch = async (e) => {
    const title = searchRef.current.value
    if (!title) {
      console.log(`No search keyword`)
      return
    }

    try {
      const result = await axiosInstance.get('/guest/search', { params: { title } })
      setSearchResult(result.data.search_jobs)
      // setFilterHidden(false)
      setSearchMessage(`Results for \`${title}\``)

    } catch (error) {
      setSearchResult([])
      // setFilterHidden(true)
      setSearchMessage(`No jobs found for \`${title}\``)
      console.log(error.message)
    }
  }

  // Handle click
  const handleClick = (e) => {
    const toDo = e.target?.dataset?.todo;
    switch (toDo) {
      case `sendMessage`:
        console.log("Implement send message")

        break;

      case undefined:
        navigate(e.target?.dataset?.navto, { state: { role: e.target?.dataset?.role } })

      default:

        break;
    }
  }

  // Return
  return (
    <section className={` bg-[#8A9A5B] w-full `}>

      {/* Hero Section */}
      <section className={` flex flex-col mt-4 justify-around items-center md:flex-row `}>
        <div className={` flex-grow m-4 p-4`}>
          <h1 className='flex flex-grow text-7xl mb-3 xl:mb-5 '>Find your dream job!</h1>
          <p className=' flex flex-grow text-lg xl:text-2xl'>
            Search for your dream job and apply with one click!
          </p>

          {/* Google registration */}
          <div className=' xl:textxl'>
            <p className=' text-center mt-5 mb-1 text-wite italic text-sm sm:text-base md:text-lg xl:text-xl'>Continue with Google</p>
            <div>
              <GoogleAuth />
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
        <div className={` flex flex-col items-center`}>
          <div>
            <SectionComponent section={sectionTexts.search} />
          </div>

          {/* Search  component */}
          <div>
            <SearchComponent
              handleSearch={handleSearch}
              searchRef={searchRef}
              filterHidden={filterHidden}
            />
          </div>

          {/* Search Results */}
          <div>
            <h2 className={` text-center text-2xl font-medium`}>
              {searchMessage}
            </h2>
            {
              searchResult.length !== 0 &&
              <>
                <hr className=' w-full border-black ' />
                {
                  searchResult.map((job) =>
                    <JobCard job={job} key={job.job_id} />)
                }
              </>
            }
          </div>
        </div>
      </section>
      <Break />


      {/* Featured Jobs */}
      <section>
        <div className={` flex flex-col items-center`}>
          <div>
            <SectionComponent section={sectionTexts.featuredJobs} />
            <hr className=' w-full mt-1 border-black ' />
          </div>

          <div>
            <FeaturedJobs />
          </div>
          <div className=' w-full mt-6 -mb-3'>
            <ButtonComponent buttonName={`Login & See More`} handleClick={handleClick} navTo={`/login`} />
          </div>
        </div>
      </section>
      <Break />


      {/* How it works */}
      <section>
        <div className={` flex flex-col items-center`}>
          <SectionComponent section={sectionTexts.howItWorks} />
        </div>
      </section>
      <Break />

      {/* Auths */}
      <section>
        <SectionComponent section={sectionTexts.auth} />
        <div className=' flex flex-col md:flex-row md:justify-evenly md:items-end md:gap-5'>
          <div>
            <p className=' -mb-2 italic text-white text-center '>
              Create Account and continue
            </p>
            <ButtonComponent buttonName={`Get Started`} handleClick={handleClick} navTo={`/register`} />
          </div>
          <div className=' mt-4 '>
            <p className=' -mb-2 italic text-white text-center '>
              Already have an account?
            </p>
            <ButtonComponent buttonName={`Log In`} handleClick={handleClick} navTo={`/login`} />
          </div>
          <div className=' mt-4 '>
            <p className=' mb-1 italic text-center '>
              Continue with your Google account
            </p>
            <GoogleAuth />
          </div>
        </div>

      </section>
      <Break />

      {/* Contact Section */}
      <section className=' mb-6 '>
        <div className=' flex flex-col '>
          <div>
            <SectionComponent section={sectionTexts?.contact} />
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
                <ButtonComponent
                  buttonName={`Send message`}
                  handleClick={handleClick}
                  toDo={`sendMessage`} />
              </div>
            </div>
          </div>

          {/* Social media links */}
          <div className='flex flex-col min-w-60 m-4 p-4 gap-3 justify-center self-center border-[1px] rounded-md border-gray-600 md:w-[500px]'>
            <p className=' italic '>Connect with us!</p>
            <div className='grid grid-cols-2 gap-3'>
              {
                linksData.map((data, idx) => (
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

export default Landing
