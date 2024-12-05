import './App.css'
import Register from './pages/auth/Register'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/auth/Login'
import Home from './components/home/Home'
import Landing from './pages/landing/Landing'
import Jobs from './pages/jobs/Jobs'
import Apply from './pages/applyJob/ApplyJob'
import ApplicationList from './components/application/ApplicationList'
import Post from './pages/postJob/PostJob'

function App() {

  return (
    <>
    <Router>
      <Routes>
        {/* <Route path='/' element={<Home/>} /> */}
        <Route path="/" element={<Landing children={<Home/>}/>}></Route>
        <Route path="/apply/my" element={<Landing children={<ApplicationList/>}/>}></Route>
        <Route path="/apply" element={<Landing children={<Apply/>}/>}></Route>
        <Route path="/job" element={<Landing children={<Jobs/>}/>}></Route>
        <Route path="/job/post" element={<Landing children={<Post/>}/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
