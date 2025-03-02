import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../axios/Axios";
import JList from "./JList";
import SearchComponent from "../smallComponents/SearchComponent";

function JobList({ emp }) {
  const token = localStorage.getItem("token");
  const user_id = parseInt(localStorage.getItem("user_id"));
  const [dbError, setDbError] = useState("");
  const [jobs, setJobs] = useState([]);
  const [fromSearch, setFromSearch] = useState(false);
  const [fetching, setFetching] = useState(true);
  const searchRef = useRef("");
  const [appliedList, setAppliedList] = useState(new Set());

  const fetchJobs = async () => {
    try {
      setFetching(true);
      const response = await axiosInstance.get(
        !emp ? "/jobs" : "/jobs/myposts",
        {
          params: !emp ? {} : { employee_id: user_id },
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
    const search = searchRef.current.value;
    if (search.trim() === "") {
      return;
    }
    try {
      const response = await axiosInstance.get(
        !emp ? "jobs/search" : "jobs/myposts/search",
        {
          params: !emp
            ? { title: search }
            : { title: search, employer_id: user_id },
          headers: { authorization: "Bearer " + token },
        }
      );
      setJobs(response.data.search_jobs);
      setFromSearch(response?.data?.search_jobs ? true : false);
    } catch (error) {
      console.log(error);
      setJobs([]);
      setDbError(error?.response?.data?.msg || error.message);
    }
  };

  const fetchAppliedJobsId = async () => {
    try {
      const res = await axiosInstance.get("/applications/isapplied", {
        params: { seeker_id: user_id },
        headers: { authorization: "Bearer " + token },
      });
      const appliedIds = new Set(res?.data?.applied_ids || []);
      setAppliedList(appliedIds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!emp) fetchAppliedJobsId();
  }, []);

  return (
    <>
      <div className=" flex justify-center">
        {/* Search  component */}
        <div>
          <SearchComponent
            handleSearch={handleSearch}
            searchRef={searchRef}
            filterHidden={true}
          />
        </div>

        {/* Search Results */}
        {dbError && (
          <p className=" text-center text-xl font-semibold font-mono  ">
            {dbError}
          </p>
        )}
      </div>
      {fromSearch && (
        <div className="flex w-5/6 ml-auto mr-auto mt-8 justify-between font-semibold lg:w-3/4 lg:mt-14 ">
          <p className="w-full text-center text-gray-600 text-4xl  pr-6">
            {" "}
            Your Search Results{" "}
          </p>
        </div>
      )}

      {fetching ? (
        <div>Fetching...</div>
      ) : (
        <>
          {jobs.length > 0 ? (
            <JList jobs={jobs} emp={emp} appliedList={appliedList} />
          ) : (
            <div>No jobs available</div>
          )}
        </>
      )}
    </>
  );
}

export default JobList;
