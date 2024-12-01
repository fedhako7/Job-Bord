import './App.css'
import Register from './pages/auth/Register'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Register/>}></Route>
      </Routes>
    </Router>
    
      {/* <Register /> */}
    </>
  )
}

export default App
