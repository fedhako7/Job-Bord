import React from 'react'
import { employerNavData, landingNavData, seekerNavData } from './navbarBarData';
import Navbar from './Navbar';


function Header() {
  const role = localStorage.getItem("role")
  const E = role === "Employer"
  const S = role === "Job Seeker"

  return (
    <section>
      <header className={`bg-gray-800 text-gray-300 p-3 shadow-md shadow-gray-400 transition-all duration-500 ease-in-out
 `}>
        {
          role ? E ?
            <Navbar navData={employerNavData} /> :
            <Navbar navData={seekerNavData} /> :
            <Navbar navData={landingNavData} />
        }
      </header>
    </section>
  )
}

export default Header
