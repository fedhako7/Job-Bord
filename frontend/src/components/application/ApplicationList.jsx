import React, { useEffect, useState } from 'react';
import ApplicationCard from './ApplicationCard';
import axiosInstance from '../../axios/Axios';
import DataNotFound from '../dataNotFound/DataNotFound';

function ApplicationList() {
    const token = localStorage.getItem("token")
    const seeker_id = parseInt(localStorage.getItem("user_id"));
    const [apps, setApplications] = useState([]);
    const [dbError, setDbError] = useState('');
    const [fetching, setFetching] = useState(true);

    const fetchApplications = async () => {
        try {
            setFetching(true);
            const response = await axiosInstance.get("/applications/my", { params: { seeker_id }, headers: { authorization: "Bearer " + token } });
            setApplications(response?.data?.appData || []);
        } catch (error) {
            console.log(error.response?.data?.msg || error.message);
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
            ) : (<>
                    <div>
                        {apps.length > 0 ? (
                            apps.map((app) => (
                                <ApplicationCard app={app} key={app.application_id} />
                            ))
                        ) : (
                            <DataNotFound
                                title={'No applications available'}
                                cto={'Start applying to jobs.'}
                                link={'jobs'}
                                to={'/job'}
                            />
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default ApplicationList;

