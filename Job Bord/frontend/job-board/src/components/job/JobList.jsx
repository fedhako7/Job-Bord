import React, { useContext, useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axiosInstance from '../../axios/Axios';
import JobCard from './JobCard';

function JobList({ emp, top_5 = false }) {
    const token = localStorage.getItem("token")
    const employee_id = parseInt(localStorage.getItem('user_id'))
    const [dbError, setDbError] = useState('');
    const [jobs, setJobs] = useState([]);
    const [fromSearch, setFromSearch] = useState(false)
    const [fetching, setFetching] = useState(true);
    const searchRef = useRef('')

    const fetchJobs = async () => {
        try {
            setFetching(true);
            const response = await axiosInstance.get(
                !emp ? "/jobs" : "/jobs/myposts",
                {
                    params: emp ? { employee_id } : { top_5 },
                    headers: { authorization: "Bearer " + token },
                }
            );
            setJobs(response?.data?.user_jobs);

        } catch (error) {
            setDbError(error.response?.data?.msg || error.message);
            console.log(error);
        } finally {
            setFetching(false);
        }
    };

    const handleSearch = async () => {
        const search = searchRef.current.value
        if (search.trim() === ''){
            return
        }
        try {
            const response = await axiosInstance.get("jobs/search", {params: {title: search}, headers: {authorization: 'Bearer ' + token}})
            setJobs((p) => response?.data?.search_jobs || p)
            setFromSearch(response?.data?.search_jobs ? true : false)
            
        } catch (error) {
            console.log(error)
            setDbError(error?.response?.data?.msg || error.message)
        }
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <>
            <div className='w-5/6 ml-auto mr-auto'>
            <div className='w-96 ml-auto mr-auto'>
                <input
                    className='h-11 w-96 pl-5 pb-1 border-yellow-500  border-2 rounded-xl text-md font-medium lg '
                    type="text"
                    placeholder='Search'
                    ref={searchRef}
                    />
                <button onClick={handleSearch} className='h-11 w-16 bg-gray-800 -ml-16 self-center border-yellow-500 border-2 border-l-0 rounded-e-xl text-white '>
                    <SearchIcon fontSize='large' />
                </button>
            </div>
                {
                dbError && <p className=' text-center text-xl font-semibold font-mono  '>{dbError}</p>
                }
            </div>
            { fromSearch &&

                <div className='flex w-5/6 ml-auto mr-auto mt-8 justify-between font-semibold lg:w-3/4 lg:mt-14 '>
                <p className='w-full text-center text-gray-600 text-4xl  pr-6'> Your Search Results </p>
                </div>

            }
            
            {fetching ? (
                <div>Fetching...</div>
            ) : (<>
                <div >
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <JobCard job={job} key={job.job_id} emp={emp} />
                        ))
                    ) : (
                        <div>No jobs available</div>
                    )}
                </div>
            </>
            )}
        </>
    );
}

export default JobList;
