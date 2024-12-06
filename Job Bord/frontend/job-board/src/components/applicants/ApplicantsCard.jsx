import React, { useState } from 'react'

function ApplicantsCard({ applicant }) {
  const { fname, lname, email, status, applied_at, cover_letter: cv, note } = applicant
  const [show, setShow] = useState(false)

  const handleAccept = async () => {

  }
  const handleReject = async () => {

  }
  return (
    <section >
      {/* <div className={`flex flex-col w-11/12 ml-auto mr-auto gap-4`}> */}
      <div
        className={`flex flex-col w-5/6 h-fit bg-white gap-4 ml-auto mr-auto mt-8 p-8
              border-gray-400 border-2 rounded-md shadow-[1px_0px_0px_blue] text-xl 
              ${show && "rounded-bl-none rounded-br-none border-b-0"} lg:w-3/4`}
      >
          <p> <strong className='pr-3' >Name:</strong> {`${fname} ${lname}`}</p>
          <p> <strong className='pr-3' >Resume:</strong> Resume</p>
          <p> <strong className='pr-3' >Status:</strong> {status}</p>
          <p> <strong className='pr-3' >Email:</strong> {email}</p>
          <p> <strong className='pr-3' >Phone:</strong> Phone</p>
          <p> <strong className='pr-3' >Date:</strong> {applied_at}</p>
          {show && <p> <strong className='pr-3' >CV:</strong> {cv}</p>}
          {show && <p> <strong className='pr-3' >Note:</strong> Note</p> }
          {/* <button onClick={() => { setShow((p) => !p) }}
            className="w-28 h-10 bg-blue-800 rounded-md lg:w-36 lg:h-12">
            {show ? "see Less" : "see More"}
          </button> */}
          <div className='flex gap-5 lg:gap-8 lg:pt-8 '>
              <button onClick={() => { setShow((prev) => (!prev)) }} className=' min-w-28 h-10 bg-blue-800 rounded-md lg:w-36 lg:h-12 '>
                  {show ? "Show Less" : "Show More"}
              </button>
              <button onClick={handleAccept} className=' min-w-28 h-10 bg-blue-800 rounded-md lg:w-36 lg:h-12 '>Accept</button>
              <button onClick={handleReject} className=' min-w-28 h-10 bg-blue-800 rounded-md lg:w-36 lg:h-12 '>Reject</button>
          </div>
      </div>
    </section>
  )
}

export default ApplicantsCard


// return (
//   <section className=" ">
//       <div
//           className={`flex w-5/6 h-36 justify-between bg-white ml-auto mr-auto mt-8 p-8
//               border-gray-400 border-2 rounded-md ${!show && 'shadow-[3px_3px_7px_blue]'} text-xl
//               ${show && "shadow-[1px_0px_0px_blue] rounded-bl-none rounded-br-none border-b-0"} lg:w-3/4`}
//       >
//           <div className="flex flex-col gap-1">
//               <p className="text-blue-700 text-2xl font-bold font-mono lg:text-3xl">{title}</p>
//               <p className="text-lg font-bold font-mono lg:text-xl">{fname}</p>
//           </div>

//           <p className="text-lg font-mono font-bold self-center lg:text-xl">{location}</p>
//           <p className="text-lg font-mono font-bold self-center lg:text-xl">{status}</p>
//           <p className="text-lg font-mono font-bold self-center lg:text-xl">{formattedAppliedAt}</p>
//           <p className="text-lg font-mono font-bold self-center lg:text-xl">{email}</p>

//           <div className="flex flex-col h-32 relative bottom-3 gap-5 lg:flex-row lg:gap-8 lg:pt-8 ">
//               <button
//                   onClick={handleDetailToggle}
//                   className="min-w-28 h-10 bg-blue-800 rounded-md lg:w-36 lg:h-12"
//               >
//                   {show ? "Show Less" : "Detail"}
//               </button>
//           </div>
//       </div>

//       {<div
//           className={`w-5/6 bg-white ml-auto mr-auto -mt-1 p-8 border-gray-400 border-2 border-t-0
//               rounded-bl-md rounded-br-md shadow-[1px_1px_0px_blue] ${!show && 'hidden'} text-xl lg:w-3/4`}
//       >
//           <p className="text-xl font-mono mb-3">
//               <strong>Salary:</strong> ${salary}
//           </p>
//           <p className="text-xl font-mono mb-3">
//               <strong>Posted At:</strong> {formattedPostedAt}
//           </p>
//           <p className="text-xl font-mono mb-3">
//               <strong>Resume:</strong> resume
//           </p>
//           <p className="text-xl font-mono mb-3">
//               <strong>CV:</strong> {cv}
//           </p>
//       </div>}
//   </section>
// );