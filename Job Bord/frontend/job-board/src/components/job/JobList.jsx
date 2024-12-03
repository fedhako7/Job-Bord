import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/Axios';
import JobCard from './JobCard';

function JobList() {
    const [dbError, setDbError] = useState('');
    const [jobs, setJobs] = useState([]);
    const [fetching, setFetching] = useState(true);

    const fetchJobs = async () => {
        try {
            setFetching(true);
            const { data } = await axiosInstance.get('/jobs');
            setJobs(data.jobsData);
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

    useEffect(() => {
        console.log('Updated jobs:', jobs);
    }, [jobs]);

    return (
        <>
            {fetching ? ( 
                <div>Fetching...</div>
            ) : (
                <>
                    <div >
                        {dbError && <div>Error: {dbError}</div>}

                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <JobCard job={job} key={job.job_id} />
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
