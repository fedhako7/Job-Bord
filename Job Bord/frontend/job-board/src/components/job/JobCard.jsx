import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function JobCard({ job, emp, has_applied, from_detail }) {
    const navigate = useNavigate()
    const { job_id, title, fname, lname, description, location, deadline, } = job
    const { salary, company, applicants: tot_app, created_at, responsibilities, criteria } = job
    const date = new Date(deadline);
    const month = date.toLocaleString('default', { month: 'short' });
    const formattedDate = `${month}-${date.getDate()}`;
    const [show, setShow] = useState(from_detail)

    const handleApply = (e) => {
        has_applied ?
            alert("You have already applied to this job. Update feature will be implemented soon!") :
            navigate("/apply", { state: { job_id, title } });
    }
    
    const handleDetails = (e) => {
        navigate("/job/detail", { state: { title, job_id, emp } });
    }

    return (
        <section className=' '>
            <div className={` flex flex-col w-11/12 bg-white ml-auto mr-auto mt-8 p-8 pb-0 border-gray-400 border-2 rounded-md
                ${!show && 'shadow-[3px_3px_7px_blue]'} ${show && "shadow-[1px_1px_0px_blue] rounded-bl-none rounded-br-none border-b-0"} lg:w-3/4 `}>

                <div className={` flex flex-col justify-between gap-4 text-xl md:flex-row`}>

                    <div className='flex flex-col gap-1'>
                        <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Title</p>
                        <p className='text-blue-700 text-2xl font-bold font-mono lg:text-3xl'>{title}</p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Company</p>
                        <p className=' text-md font-serif pl-4 lg:text-xl lg:pl-0 '>{company || fname}</p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Location</p>
                        <p className=' text-md font-serif pl-4 lg:text-xl lg:pl-0 '>{location}</p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Deadline </p>
                        <p className=' text-md font-serif pl-4 lg:text-xl lg:pl-0 '>{formattedDate}</p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Applicants</p>
                        <p className=' text-md font-serif pl-4 lg:text-xl lg:pl-0 '>{tot_app}</p>
                    </div>
                </div>

                <div className={` mt-5 ${!show && 'hidden'}`}>
                    <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Employer Name</p>
                    <p className='mb-3 lg:mb-5'> {`${fname} ${lname}`} </p>
                    <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Salary</p>
                    <p className='mb-3 lg:mb-5'> ${salary} </p>
                    <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Description</p>
                    <p className='mb-3 lg:mb-5'> {description || "Description"} </p>
                    <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Responsibilities</p>
                    <p className='mb-3 lg:mb-5'>{responsibilities || "Not Mentioned. "}</p>
                    <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Criterias</p>
                    <p className='mb-3 lg:mb-5'>{criteria || "Not Mentioned."} </p>

                </div>

                {
                    !emp ?
                        <div className='flex h-32 justify-around lg:pt-8 '>
                            <button onClick={handleApply} className={` min-w-28 h-10 bg-blue-800 ${has_applied && "bg-green-800"} rounded-md lg:w-36 lg:h-12 `}>
                                {
                                    has_applied ? <> Applied! </> : <>Apply</>
                                }
                            </button>
                            <button onClick={() => { setShow((prev) => (!prev)) }} className=' min-w-28 h-10 bg-blue-800 rounded-md lg:w-36 lg:h-12 '>
                                {show ? "Show Less" : "Detail"}
                            </button>
                        </div> : <>
                            {
                                !from_detail &&
                                <div className='flex h-32 justify-around lg:pt-8 '>
                                    <button onClick={handleDetails} name={job_id} className=' min-w-28 h-10 bg-blue-800 rounded-md lg:w-36 lg:h-12 '> See Detail </button>
                                </div>
                            }</>
                }

            </div>

        </section>
    )
}

export default JobCard

