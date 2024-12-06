import React, { useEffect, useState } from "react";
import ApplicationCard from "./ApplicationCard";
import axiosInstance from "../../axios/Axios";

function ApplicationList({ applicants }) {
  const seeker_id = parseInt(localStorage.getItem("user_id"));
  const [apps, setApplications] = useState([]);
  const [dbError, setDbError] = useState("");
  const [fetching, setFetching] = useState(false);

  const fetchApplications = async () => {
    try {
      setFetching(true);
      const response = await axiosInstance.get("/applications/my", { params: { seeker_id } });
      setApplications(response?.data?.appData || []);
    } catch (error) {
      console.error(error);
      setDbError(error.response?.data?.msg || "An error occurred while fetching data.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!applicants) fetchApplications();
  }, [applicants]);

  if (fetching) return <div>Fetching...</div>;

  if (dbError) return <div>Error: {dbError}</div>;

  const dataToRender = applicants || apps;

  return (
    <div>
      {dataToRender && dataToRender.length > 0 ? (
        dataToRender.map((app) => (
          <ApplicationCard app={app} key={app.application_id} />
        ))
      ) : (
        <div>No applications available</div>
      )}
    </div>
  );
}

export default ApplicationList;
