import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'

function Landing({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      {/* Main Content - Grow to take available space */}
      <div className="flex-grow">
        {children}
      </div>

      {/* Footer */}
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  )
}

export default Landing;
