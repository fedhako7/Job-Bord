import './App.css'
import Register from './pages/auth/Register'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/auth/Login'

function App() {

  return (
    <>
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login/>}></Route> */}
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
