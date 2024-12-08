import React from 'react'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Home from '../components/home/Home'
import Landing from '../pages/landing/Landing'
import Jobs from '../pages/jobs/Jobs'
import MyJobs from '../pages/myJobs/MyJobs'
import MyJobsDetail from '../pages/myJobsDetail/MyJobsDetail'
import Post from '../components/post/Post'
import Apply from '../components/apply/Apply'
import MyApplications from '../pages/myApplications/MyApplications'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoutes from '../protectedRoutes/ProtectedRoutes'
import NotFound from '../pages/notFound/NotFound'
import Profile from '../components/profile/Profile'


function RouteComponent() {
  return (
    <>
      <Routes>
        {/* Public pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Mutual pages */}
        <Route
          path="/"
          element={
            <ProtectedRoutes allowedRoles={["Employer", "Job Seeker"]}>
              <Landing children={<Home />} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoutes allowedRoles={["Employer", "Job Seeker"]}>
              <Landing children={<Profile />} />
            </ProtectedRoutes>
          }
        />

        {/* Employer Only pages */}
        <Route
          path="/job/my"
          element={
            <ProtectedRoutes allowedRoles={["Employer"]}>
              <Landing children={<MyJobs />} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/job/detail"
          element={
            <ProtectedRoutes allowedRoles={["Employer"]}>
              <Landing children={<MyJobsDetail />} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/job/post"
          element={
            <ProtectedRoutes allowedRoles={["Employer"]}>
              <Landing children={<Post />} />
            </ProtectedRoutes>
          }
        />

        {/* Job Seeker Only pages */}
        <Route
          path="/apply"
          element={
            <ProtectedRoutes allowedRoles={["Job Seeker"]}>
              <Landing children={<Apply />} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/apply/my"
          element={
            <ProtectedRoutes allowedRoles={["Job Seeker"]}>
              <Landing children={<MyApplications />} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/job"
          element={
            <ProtectedRoutes allowedRoles={["Job Seeker"]}>
              <Landing children={<Jobs />} />
            </ProtectedRoutes>
          }
        />

        {/* Not Found */}
        <Route
          path="*"
          element={
            <ProtectedRoutes allowedRoles={["Employer", "Job Seeker"]}>
              <Landing children={<NotFound />} />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default RouteComponent;
