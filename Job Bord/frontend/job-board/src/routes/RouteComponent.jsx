import React from 'react'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Home from '../components/home/Home'
import Layout from '../components/layout/Layout'
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
import Landing from '../pages/landing/Landing'
import Notifications from '../components/notifications/Notifications'
import SelectRole from '../pages/selectRole/SelectRole'
import roles from '../pages/auth/role'


function RouteComponent() {
  return (
    <>
      <Routes>
        {/* Public pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Layout children={<Landing/>}/>} />
        <Route path="/select-role" element={<SelectRole/>} />

        {/* Mutual pages */}
        <Route
          path="/"
          element={
            <ProtectedRoutes allowedRoles={[roles.EMPLOYER, roles.SEEKER]}>
              <Layout children={<Home />} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoutes allowedRoles={[roles.EMPLOYER, roles.SEEKER]}>
              <Layout children={<Profile />} />
            </ProtectedRoutes>
          }
        />

        {/* <Route
          path="/notification"
          element={
            <ProtectedRoutes allowedRoles={[roles.EMPLOYER, roles.SEEKER]}>
              <Layout children={<Notifications />} />
            </ProtectedRoutes>
          }
        /> */}

        {/* Employer Only pages */}
        <Route
          path="/job/my"
          element={
            <ProtectedRoutes allowedRoles={[roles.EMPLOYER]}>
              <Layout children={<MyJobs />} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/job/detail"
          element={
            <ProtectedRoutes allowedRoles={[roles.EMPLOYER, roles.SEEKER]}>
              <Layout children={<MyJobsDetail />} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/job/post"
          element={
            <ProtectedRoutes allowedRoles={[roles.EMPLOYER]}>
              <Layout children={<Post />} />
            </ProtectedRoutes>
          }
        />

        {/* Job Seeker Only pages */}
        <Route
          path="/apply"
          element={
            <ProtectedRoutes allowedRoles={[roles.SEEKER]}>
              <Layout children={<Apply />} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/apply/my"
          element={
            <ProtectedRoutes allowedRoles={[roles.SEEKER]}>
              <Layout children={<MyApplications />} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/job"
          element={
            <ProtectedRoutes allowedRoles={[roles.SEEKER]}>
              <Layout children={<Jobs />} />
            </ProtectedRoutes>
          }
        />

        {/* Not Found */}
        <Route
          path="*"
          element={
            <ProtectedRoutes allowedRoles={[roles.EMPLOYER, roles.SEEKER]}>
              <Layout children={<NotFound />} />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default RouteComponent;
