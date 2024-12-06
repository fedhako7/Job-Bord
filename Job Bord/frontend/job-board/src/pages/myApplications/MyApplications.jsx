import React from 'react'
import ApplicationList from '../../components/application/ApplicationList'

function MyApplications() {
    return (
        <>
        <div>
            <div className='flex w-5/6 ml-auto mr-auto mt-8 justify-between font-semibold lg:w-3/4 lg:mt-14 '>
                <p className='w-full text-center pr-6 text-4xl'> My Applications </p>
            </div>
            <hr className='h-1 w-5/6 ml-auto mr-auto mt-3 mb-3 bg-black lg:w-3/4'/>
            <ApplicationList />
        </div>
        </>
    )
}

export default MyApplications
