import React, { useEffect, useState } from 'react';
import ApplicationCard from './ApplicationCard';
import axiosInstance from '../../axios/Axios';

function ApplicationList() {
    const token = localStorage.getItem("token")
    const seeker_id = parseInt(localStorage.getItem("user_id"));
    const [apps, setApplications] = useState([]);
    const [dbError, setDbError] = useState('');
    const [fetching, setFetching] = useState(true);

    const fetchApplications = async () => {
        try {
            setFetching(true);
            const response = await axiosInstance.get("/applications/my", { params: { seeker_id }, headers: { authorization: "Bearer " + token }});
            setApplications(response?.data?.appData || []);
        } catch (error) {
            console.error(error);
            setDbError(error.response?.data?.msg || error.message);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <>
            {fetching ? (
                <div>Fetching...</div>
            ) : (
                <>
                    <div>
                        {dbError && <div>Error: {dbError}</div>}

                        {apps.length > 0 ? (
                            apps.map((app) => (
                                <ApplicationCard app={app} key={app.application_id} />
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

export default ApplicationList;

