import './App.css'
import Register from './pages/auth/Register'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/auth/Login'
import Home from './components/home/Home'
import Landing from './pages/landing/Landing'
import Jobs from './pages/jobs/Jobs'
import Applications from './pages/applications/Applications'
import ApplicationList from './components/application/ApplicationList'

function App() {

  return (
    <>
    <Router>
      <Routes>
        {/* <Route path='/' element={<Home/>} /> */}
        <Route path="/" element={<Landing children={<Home/>}/>}></Route>
        <Route path="/apply/my" element={<Landing children={<ApplicationList/>}/>}></Route>
        <Route path="/apply" element={<Landing children={<Applications/>}/>}></Route>
        <Route path="/job" element={<Landing children={<Jobs/>}/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
