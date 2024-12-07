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

function Routes() {
  return (
  <>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>

      <Route path="/" element={<Landing children={<Home />} />}></Route>

      <Route path="/job" element={<Landing children={<Jobs />} />}></Route>
      <Route path="/job/my" element={<Landing children={<MyJobs />} />}></Route>
      <Route path="/job/detail" element={<Landing children={<MyJobsDetail />} />}></Route>
      <Route path="/job/post" element={<Landing children={<Post />} />}></Route>

      <Route path="/apply" element={<Landing children={<Apply />} />}></Route>
      <Route path="/apply/my" element={<Landing children={<MyApplications />} />}></Route>
    </Routes>
  </>
  )
}

export default Routes