import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/Axios';
import { useLocation } from 'react-router-dom';
import ApplicantsCard from './ApplicantsCard';

function ApplicantsList() {
    const token = localStorage.getItem("token")
    const location = useLocation()
    const job_id = location?.state?.job_id
    const [applicants, setApplicants] = useState([]);
    const [dbError, setDbError] = useState('');
    const [refresh, setRefresh] = useState(false)
    const [fetching, setFetching] = useState(true);

    const fetchApplications = async () => {
        try {
            setFetching(true);
            const response = await axiosInstance.get("/applications/myapplicants", { params: { job_id }, headers: { authorization: "Bearer " + token } })
            setApplicants(response?.data?.app_data || []);
        } catch (error) {
            console.error(error);
            setDbError(error.response?.data?.msg || error.message);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [refresh]);
    return (
        <>
            {fetching ? (
                <div>Fetching...</div>
            ) : (
                <>
                    <div className=' mb-8'>
                        {dbError && <div>Error: {dbError}</div>}

                        {applicants.length > 0 ? (
                            applicants.map((app) => (
                                <ApplicantsCard applicant={app} key={app.application_id} setRefresh={setRefresh} />
                            ))
                        ) : (
                            <div>No applications available</div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default ApplicantsList;
