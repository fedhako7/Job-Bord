import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {

  return (
    <footer className='flex justify-around p-2 items-center bg-gray-800 text-white xl:text-xl '>
      <div className={` flex flex-col mb-2 gap-1 items-left text-white `}>
        <p>Fedesa Yelmachew</p>
        <a className={` flex items-center gap-1 hover:text-white
                  hover:scale-110 transition-transform duration-300 ease-out`} href="mailto:fedhasayelmachew@gmail.com"><> < EmailIcon /> Email me </></a>
      </div>
      <div className={` flex flex-col mb-2 gap-1 items-left text-white `}>
        <a className={` flex items-center gap-1 hover:text-white
                  hover:scale-125 transition-transform duration-300 ease-out`} href="https://www.linkedin.com/in/linkfedhako7/" target="_blank" rel="noopener noreferrer" > <> < LinkedInIcon /> LinkedIn </> </a>
        <a className={` flex items-center gap-1 hover:text-white
                  hover:scale-110 transition-transform duration-300 ease-out`} href="https://github.com/fedhako7?tab=repositories" target="_blank" rel="noopener noreferrer"> <> < GitHubIcon /> gitHub </> </a>
      </div>
    </footer>
  )
}

export default Footer
