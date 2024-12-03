import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

function Footer() {
  //##TODO
  const handleSearch = () => {

  }

  return (
    <footer className='flex h-36 justify-center bg-gray-800 pt-6 pl-5 '>
      <input 
        className='h-14 w-2/3 pl-5 pb-1 border-gray-400 border-4 rounded-xl text-2xl font-medium lg:w-1/2 '
        type="text" 
        placeholder='Search'
      />
      <button onClick={ handleSearch } className='h-14 w-16 -ml-16 bg-black text-yellow-600 rounded-e-xl'>
        <SearchIcon fontSize='large' />
      </button>
      
    </footer>
  )
}

export default Footer