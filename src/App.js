import { useState } from 'react'
import './App.css'
import { eycontext } from './context/MainContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainRouter from './router/MainRouter'
import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react'

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const context = {
    user,
    setUser,
    token,
    setToken,
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('eyUser')))
    setToken(localStorage.getItem('eyToken'))
  }, [])

  return (
    <eycontext.Provider value={context}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        {/* <SideDrawer> */}
        <MainRouter />
        {/* </SideDrawer> */}
      </Router>
    </eycontext.Provider>
  )
}

export default App
