import './App.css'
import Register from './pages/auth/Register'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/auth/Login'
import Home from './components/home/Home'
import Landing from './pages/landing/Landing'
import JobCard from './components/job/JobCard'
import JobList from './components/job/JobList'

function App() {

  return (
    <>
    <Router>
      <Routes>
        {/* <Route path='/' element={<Home/>} /> */}
        <Route path="/" element={<Landing children={<Home/>}/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
