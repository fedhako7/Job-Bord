import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Home from './components/home/Home'
import Landing from './pages/landing/Landing'
import Jobs from './pages/jobs/Jobs'
import Post from './components/post/Post'
import MyJobs from './pages/myJobs/MyJobs'
import MyJobsDetail from './pages/myJobsDetail/MyJobsDetail'
import MyApplications from './pages/myApplications/MyApplications'
import Apply from './components/apply/Apply'
import ContextProvider from './contextProvider/ContextProvider'
import RouteComponent from './routes/RouteComponent'

function App() {

  return (
    <>
      <Router>

        <ContextProvider>
          <RouteComponent />
        </ContextProvider>


        {/* <Routes>
          <Route path="/" element={<Landing children={<Home />} />}></Route>
          <Route path="/apply/my" element={<Landing children={<MyApplications />} />}></Route>
          <Route path="/apply" element={<Landing children={<Apply />} />}></Route>
          <Route path="/job" element={<Landing children={<Jobs />} />}></Route>
          <Route path="/job/detail" element={<Landing children={<MyJobsDetail />} />}></Route>
          <Route path="/job/my" element={<Landing children={<MyJobs />} />}></Route>
          <Route path="/job/post" element={<Landing children={<Post />} />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes> */}
      </Router>
    </>
  )
}

export default App
