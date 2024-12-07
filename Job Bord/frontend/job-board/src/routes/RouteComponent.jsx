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

function RouteComponent() {
  return (
  <>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>

      <Route path="/" element={
        <ProtectedRoutes>
          <Landing children={<Home />} />
        </ProtectedRoutes>
      }></Route>

      <Route path="/job" element={
        <ProtectedRoutes>
          <Landing children={<Jobs />} />
        </ProtectedRoutes>
      }></Route>


      <Route path="/job/my" element={
        <ProtectedRoutes>
          <Landing children={<MyJobs />} />
        </ProtectedRoutes>
      }></Route>

      <Route path="/job/detail" element={
        <ProtectedRoutes>
          <Landing children={<MyJobsDetail />} />
        </ProtectedRoutes>
      }></Route>

      <Route path="/job/post" element={
        <ProtectedRoutes>
          <Landing children={<Post />} />
        </ProtectedRoutes>
      }></Route>

      <Route path="/apply" element={
        <ProtectedRoutes>
          <Landing children={<Apply />} />
        </ProtectedRoutes>
      }></Route>

      <Route path="/apply/my" element={
        <ProtectedRoutes>
          <Landing children={<MyApplications />} />
        </ProtectedRoutes>
      }></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
  )
}

export default RouteComponent