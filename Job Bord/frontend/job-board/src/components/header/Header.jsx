import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Logo from "../../assets/logo.webp"
import { frequentDatas } from '../../contextProvider/ContextProvider'

function Header() {
  const navigate = useNavigate()
  const { setUserId } = useContext(frequentDatas)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user_id")
    setUserId(null)
    navigate('/login')
  }
  
  return (
    <section>
      <header className="h-28 w-screen text-white bg-gray-800 shadow-gray-400 shadow-lg">
        <nav className=" ">
          <ul className='flex justify-between items-center text-2xl font-bold pl-5 pr-5 pt-5 lg:w-5/6 lg:mr-auto lg:ml-auto'>
            <Link className='hidden lg:flex text-base text-yellow-300' to="/">
              <img className='w-20 border-2 border-y-yellow-50 mr-1 rounded-lg' src={Logo} alt="logo" />
              <div className='pt-3'>
                <h3>Job Board</h3>
                <p>Your Dream Job!</p>
              </div>
            </Link>
            <Link to="/" className='lg:ml-18'>Home</Link>
            <Link to="/job">Jobs</Link>
            <Link to="/apply/my">My Applications</Link>
            <Link to="/job/my">My Jobs</Link>
            <button onClick={handleLogout} className='w-32 h-10 bg-blue-800 rounded-lg mt-2 pb-1 font-semibold lg:ml-18 lg:w-36 lg-h-12 '>
              Log Out
            </button>
            <Link className='flex flex-col items-center pl-1 text-lg text-emerald-400' to="/profile">
              <AccountCircleOutlinedIcon fontSize='large' /> Fedhasa
            </Link>
          </ul>
        </nav>
      </header>
    </section>
  )
}

export default Header