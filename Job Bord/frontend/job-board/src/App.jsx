import './App.css'
import Register from './pages/auth/Register'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/auth/Login'
import Home from './components/home/Home'
import Landing from './pages/landing/Landing'
import JobCard from './components/job/JobCard'
import JobList from './components/job/JobList'
import Jobs from './pages/jobs/Jobs'
import Applications from './pages/applications/Applications'

function App() {

  return (
    <>
    <Router>
      <Routes>
        {/* <Route path='/' element={<Home/>} /> */}
        <Route path="/" element={<Landing children={<Home/>}/>}></Route>
        <Route path="/application/apply" element={<Landing children={<Applications/>}/>}></Route>
        <Route path="/job" element={<Landing children={<Jobs/>}/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        {/* <Route path="/application/apply" element={<Applications/>}></Route> */}
      </Routes>
    </Router>
    </>
  )
}

export default App
