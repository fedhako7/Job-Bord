import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

function Landing({children}) {
  return (
    <>
        <div className='sticky top-0 z-50'>
            <Header />
        </div>
        <div>
            {children}
        </div>
        <div>
            <Footer/>
        </div>
    </>
  )
}

export default Landing