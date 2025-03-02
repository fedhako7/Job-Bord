import React, { useRef, useState } from 'react';
import hero_image from '../../assets/hero_image.webp';
import { sectionTexts } from './componentsData/sectionTexts';
import FeaturedJobs from '../../components/job/FeaturedJobs';
import { linksData } from './componentsData/linksData';
import { ButtonComponent, SearchComponent, Break, LinkComponent, SectionComponent } from './smallComponents/componentsExporter';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/Axios';
import GoogleAuth from '../auth/googleAuth/GoogleAuth';
import JList from '../../components/job/JList';

function Landing() {
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState([]);
  const [filterHidden, setFilterHidden] = useState(true);
  const [searchMessage, setSearchMessage] = useState('');
  const searchRef = useRef('');
  const nameRef = useRef('')
  const emailRef = useRef('')
  const messageRef = useRef('')

  const handleSearch = async (e) => {
    const title = searchRef.current.value;
    if (!title) {
      console.log('No search keyword');
      return;
    }

    try {
      const result = await axiosInstance.get('/guest/search', { params: { title } });
      setSearchResult(result.data.search_jobs);
      setSearchMessage(`Results for "${title}"`);
    } catch (error) {
      setSearchResult([]);
      setSearchMessage(`No jobs found for "${title}"`);
      console.error('Search error:', error.message);
    }
  };

  const handleMessage = async () => {
    const name = nameRef.current.value
    const email = emailRef.current.value
    const message = messageRef.current.value

    if (!name || !email || !message) {
      messageError.set('Fill all fields')
      return
    }
    try {
      axiosInstance.post('/guest/message', { name, email, message })
      alert('Message sent successfully')

    } catch (error) {
      console.log(error.message)
      alert('Something went wrong')
    }
  }

  const handleClick = (e) => {
    const toDo = e.target?.dataset?.todo;
    navigate(e.target?.dataset?.navto, { state: { role: e.target?.dataset?.role } });
  };

  return (
    <main className="bg-gradient-to-b from-[#8A9A5B] to-[#6B7A4A] min-h-screen text-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-16 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg">
            Find Your Dream Job!
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-lg mx-auto md:mx-0">
            Search for your dream job and apply with one click!
          </p>
          <div className="space-y-3">
            <p className="text-sm md:text-base text-white/80 italic">Continue with Google</p>
            <GoogleAuth />
          </div>
        </div>
        <div className="flex-1 relative">
          <img
            src={hero_image}
            alt="Hero illustration"
            className="w-full max-w-[600px] mx-auto object-cover rounded-lg shadow-xl"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100/50 rounded-lg"></div>
        </div>
      </section>
      <Break />

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="space-y-6 max-w-4xl mx-auto">
          <SectionComponent section={sectionTexts.search} />
          <SearchComponent
            handleSearch={handleSearch}
            searchRef={searchRef}
            filterHidden={filterHidden}
          />
          {searchMessage && (
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-center text-white">
                {searchMessage}
              </h2>
              {searchResult.length > 0 && (
                <>
                  <hr className="border-white/30" />
                  <JList jobs={searchResult} />
                </>
              )}
            </div>
          )}
        </div>
      </section>
      <Break />

      {/* Featured Jobs */}
      <section className="container mx-auto px-4 py-8">
        <div className="space-y-6 max-w-5xl mx-auto">
          <div>
            <SectionComponent section={sectionTexts.featuredJobs} />
            <hr className="border-white/30 mt-2" />
          </div>
          <FeaturedJobs />
          <div className="text-center">
            <ButtonComponent
              buttonName="Login & See More"
              handleClick={handleClick}
              navTo="/login"
              className="bg-white text-[#8A9A5B] hover:bg-gray-100 transition-colors"
            />
          </div>
        </div>
      </section>
      <Break />

      {/* How it Works */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center">
          <SectionComponent section={sectionTexts.howItWorks} />
        </div>
      </section>
      <Break />

      {/* Auth Section */}
      <section className="container mx-auto px-4 py-8">
        <SectionComponent section={sectionTexts.auth} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-6">
          {[
            { text: 'Create Account and continue', btn: 'Get Started', navTo: '/register' },
            { text: 'Already have an account?', btn: 'Log In', navTo: '/login' },
            { text: 'Continue with Google', component: <GoogleAuth /> },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2 text-center">
              <p className="text-white/80 italic">{item.text}</p>
              {item.component || (
                <ButtonComponent
                  buttonName={item.btn}
                  handleClick={handleClick}
                  navTo={item.navTo}
                  className="bg-white text-[#8A9A5B] hover:bg-gray-100 transition-colors"
                />
              )}
            </div>
          ))}
        </div>
      </section>
      <Break />

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-8 pb-12">
        <SectionComponent section={sectionTexts?.contact} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                ref={nameRef}
                className="w-full p-2 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/50"
              />
              <input
                type="email"
                placeholder="Email"
                ref={emailRef}
                className="w-full p-2 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/50"
              />
              <textarea
                placeholder="Message"
                ref={messageRef}
                className="w-full p-2 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/50 min-h-[100px]"
              />
              <ButtonComponent
                buttonName="Send message"
                handleClick={handleMessage}
                toDo="sendMessage"
                className="w-full bg-white text-[#8A9A5B] hover:bg-gray-100 transition-colors"
              />
            </form>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <p className="text-white/80 italic mb-4">Connect with us!</p>
            <div className="grid grid-cols-2 gap-3">
              {linksData.map((data, idx) => (
                <LinkComponent
                  key={idx}
                  name={data[0]}
                  link={data[1]}
                  Icon={data[2]}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
