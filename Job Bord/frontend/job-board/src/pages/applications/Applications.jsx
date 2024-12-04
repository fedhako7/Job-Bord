import React from 'react'

function Applications() {

const handleSubmit = async (e) => {
  e.preventDefault()

  
}
  return (
    <form className={` flex flex-col w-3/4 bg-gray-100 ml-auto mr-auto mt-16 p-6 gap-5 items-center border-2 border-gray-400 rounded-xl font-medium lg:text-lg `} onSubmit={handleSubmit}> 
        <p className={`text-red-600 font-medium italic lg:text-xl`}>* Requered field</p>
        <div className=''><span className={`text-red-600 text-xl font-bold `}>*</span><input className={`w-72 h-12 ml-1 border-2 border-gray-400 rounded-md pl-3 lg:w-80 lg:h-14 `} type="text" placeholder='Name' /></div>
        <div><span className={`text-red-600 text-xl font-bold `}>*</span><input className={`w-72 h-12 ml-1 border-2 border-gray-400 rounded-md pl-3 lg:w-80 lg:h-14 `} type="email" placeholder='email' /></div>
        <div><span className={`text-red-600 text-xl font-bold `}>*</span><input className={`w-72 h-12 ml-1 border-2 border-gray-400 rounded-md pl-3 lg:w-80 lg:h-14 `} type="telephone" placeholder='Phone no.' /></div>
        <label className={`mt-4`}>Your Cover Letter</label>
        <div className={`flex `}>
          <span className={`text-red-600 text-xl font-bold `}>*</span>
          <textarea className={`w-80 h-32  border-2 border-gray-400 rounded-xl focus:h-40 focus:w-96 lg:w-96`} name="" id="" placeholder='Cover Letter'></textarea></div>
        <div className={`flex flex-col w-80 gap-4 items-center mt-3 lg:w-96 lg:font-semibold `}>
          <label className='mt-4' htmlFor="">Upload Your Resume</label>
          <input className={`w-52 lg:w-60 `} type="file" />
        </div>
        <button className={`w-32 h-10 bg-blue-800 mt-12 rounded-md `}>Submit</button>
    </form>
  )
}

export default Applications