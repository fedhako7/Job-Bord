import React from 'react'
import classes from './Job.module.css'

function JobCard({ job }) {
    const { title, fname, lname, description, location, salary, created_at } = job
    const editedSal = Math.trunc(salary)
    const date = new Date(created_at);
    const month = date.toLocaleString('default', { month: 'short' });
    const formattedDate = `${month}-${date.getDate()}`;

    // #TODO
    const handleApplication = () => {
    }
    // #TODO
    const handleDetail = () => {
    }
    return (
        <section className=' '>
            <div className={`flex w-5/6 h-36 justify-between bg-white ml-auto mr-auto mt-4 p-8 border-gray-400 border-2 rounded-md text-xl lg:w-3/4 ${classes.card__container}`}>
                
                <div className='flex flex-col gap-1'>
                    <p className='text-blue-700 text-2xl font-bold font-mono lg:text-3xl'>{title}</p>
                    <p className='text-lg font-bold font-mono lg:text-xl '>{`${fname} ${lname}`}</p>
                </div>

                <p className='text-lg font-mono font-bold self-center lg:text-xl'>{location}</p>
                <p className='text-lg font-mono font-bold self-center lg:text-xl'>{`$${editedSal}`}</p>
                <p className='text-xl font-mono font-bold self-center lg:text-2xl'>{formattedDate}</p>
                <div className='flex flex-col h-32 relative bottom-3 gap-5 lg:flex-row lg:gap-8 lg:pt-8 '>
                    <button onClick={handleApplication} className=' min-w-28 h-10 bg-blue-600 rounded-md lg:w-36 lg:h-12 '>Apply</button>
                    <button onClick={handleDetail} className=' min-w-28 h-10 bg-blue-600 rounded-md lg:w-36 lg:h-12 '>Detail</button>
                </div>
            </div>

        </section>
    )
}

export default JobCard