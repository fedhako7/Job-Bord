import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/Axios';
import JobCard from './JobCard';

function JobList({emp}) {
    const employee_id = parseInt(localStorage.getItem('user_id'))
    const [dbError, setDbError] = useState('');
    const [jobs, setJobs] = useState([]);
    const [fetching, setFetching] = useState(true);

    const fetchJobs = async () => {
        try {
            setFetching(true);
            const response = await axiosInstance.get(
              !emp ? "/jobs" : "/jobs/myposts",
              emp ? { params: { employee_id } } : {}
            );
            setJobs(response?.data?.user_jobs);

        } catch (error) {
            setDbError(error.response?.data?.msg || error.message);
            console.log(error);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <>
            {fetching ? ( 
                <div>Fetching...</div>
            ) : (<>
                <div >
                    {dbError && <div>Error: {dbError}</div>}

                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <JobCard job={job} key={job.job_id} emp={emp}/>
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
