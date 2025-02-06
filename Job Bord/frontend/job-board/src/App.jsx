import './App.css'
import { BrowserRouter as Router } from "react-router-dom"
import ContextProvider from './contextProvider/ContextProvider'
import RouteComponent from './routes/RouteComponent'

function App() {

  return (
    <>
      <Router>
        <ContextProvider>
          <RouteComponent />
        </ContextProvider>
      </Router>
    </>
  )
}

export default App
