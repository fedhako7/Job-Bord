import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/Axios';
import { useLocation } from 'react-router-dom';
import ApplicantsCard from './ApplicantsCard';
import DataNotFound from '../dataNotFound/DataNotFound';

function ApplicantsList() {
    const token = localStorage.getItem("token")
    const location = useLocation()
    const job_id = location?.state?.job_id
    const [applicants, setApplicants] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [fetching, setFetching] = useState(true);

    const fetchApplications = async () => {
        try {
            setFetching(true);
            const response = await axiosInstance.get("/applications/myapplicants", { params: { job_id }, headers: { authorization: "Bearer " + token } })
            setApplicants(response?.data?.app_data || []);
        } catch (error) {
            console.error(error);
            console.log(error.response?.data?.msg || error.message);
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
                        {applicants.length > 0 ? (
                            applicants.map((app) => (
                                <ApplicantsCard applicant={app} key={app.application_id} setRefresh={setRefresh} />
                            ))
                        ) : (
                            <DataNotFound title={'No applicants available.'} />
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default ApplicantsList;
