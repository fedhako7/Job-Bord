import React, { useState } from 'react';

function ApplicationCard({ app }) {
    const { title, fname, lname, location, status, company, applied_at, applicants: tot_app, salary, created_at, resume, cover_letter: cv } = app;
    const dateApplied = new Date(applied_at);
    const datePosted = new Date(created_at);
    const formattedAppliedAt = `${dateApplied.toLocaleString('default', { month: 'short' })}-${dateApplied.getDate()}`;
    const formattedPostedAt = `${datePosted.toLocaleString('default', { month: 'short' })}-${datePosted.getDate()}`;
    const [show, setShow] = useState(false);

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
                        <p className=' text-md font-serif pl-4 lg:text-xl lg:pl-0 '>{`${company}`}</p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Location</p>
                        <p className=' text-md font-serif pl-4 lg:text-xl lg:pl-0 '>{location}</p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Status</p>
                        <p className=' text-md font-serif pl-4 lg:text-xl lg:pl-0 '>{`${status}`}</p>
                    </div>
                </div>

                <div className={` mt-5 ${!show && 'hidden'}`}>
                    <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Employer Name</p>
                    <p className='mb-3 lg:mb-5'> {`${fname} ${lname}`} </p>

                    <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Salary</p>
                    <p className='mb-3 lg:mb-5'> ${salary} </p>

                    <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Applied Date</p>
                    <p className='mb-3 lg:mb-5'> {formattedAppliedAt} </p>

                    <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Total Applications</p>
                    <p className='mb-3 lg:mb-5'> {tot_app} </p>

                    <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>CV</p>
                    <p className='mb-3 lg:mb-5'> {cv} </p>

                    <p className=' text-lg font-bold font-mono lg:text-xl lg:inline-flex '>Resume</p>
                    <p className='mb-3 lg:mb-5'> {resume} </p>
                </div>

                <div className='flex h-32 justify-around lg:pt-8 '>
                    <button onClick={() => { setShow((p) => (!p)) }} className=' min-w-28 h-10 bg-blue-800 rounded-md lg:w-36 lg:h-12 '>
                        {show ? "Show Less" : "Detail"}
                    </button>
                </div>

            </div>
        </section>
    );
}

export default ApplicationCard;
