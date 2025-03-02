import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { frequentDatas } from '../../contextProvider/ContextProvider'
import { Menu, X } from "lucide-react";


function landingNavbar({ navData }) {
  const role = localStorage.getItem("role")
  const fname = localStorage.getItem("fname")
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { setUserId } = useContext(frequentDatas)
  const E = role === "Employer"
  const S = role === "Job Seeker"
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user_id")
    localStorage.removeItem("role")
    localStorage.removeItem("fname")
    setUserId(null)
    navigate('/login')
  }

  return (
    <>
      {/* Humburger icon */}
      <button onClick={() => setIsOpen(!isOpen)}
        className="md:hidden">
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      <nav className={`mr-3 ml-3`}>
        {/* Mobile menu */}
        {
          isOpen &&
          <ul className={`flex flex-col gap-3 md:hidden`}>
            <>
              {
                navData.map((data, index) => (
                  <li key={index} onClick={() => setIsOpen(false)} >
                    <NavLink to={data.link} className={({ isActive }) =>
                      `flex gap-1 items-center hover:text-white  hover:scale-105 transition-transform duration-300 ease-out ${isActive && 'text-white'}`}>
                      <> {data.logo && < data.logo fontSize='small' />} {data.name} </>
                    </NavLink>
                  </li>

                ))
              }
              <button onClick={handleLogout} className='bg-blue-800 w-1/2 rounded-sm hover:scale-105 hover:text-white '> { role ? <>Log out </> : <>Log in</> } </button>
            </>
          </ul>
        }

        {/* Tablet menu */}
        <ul className={` hidden mx-10 justify-between md:flex md:items-center lg:text-lg xl:text-xl `}>
          {
            navData.map((data, index) => (
              <li key={index}>
                <NavLink
                  className={({ isActive }) => ` flex items-center hover:text-white
                  hover:scale-110 transition-transform duration-300 ease-out ${isActive && 'text-white scale-125'}`}
                  to={data.link}>
                  <> {data.logo && < data.logo fontSize='medium' />} {data.name} </>
                </NavLink>
              </li>
            ))
          }
          <button className={` flex w-32 h-12 items-center justify-center bg-blue-800 text-gray-200 p-2 rounded-md `} onClick={handleLogout}>
          { role ? <>Log out </> : <>Log in</> }
          </button>
        </ul>
      </nav>
    </>
  )
}

export default landingNavbar