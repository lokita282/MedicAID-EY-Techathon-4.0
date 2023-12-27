import { useState } from 'react'
import './App.css'
import { eycontext } from './context/MainContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainRouter from './router/MainRouter'
import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react'
// import { UIKitSettingsBuilder } from '@cometchat/uikit-shared'
// import { CometChatUIKit } from '@cometchat/chat-uikit-react'

// const COMETCHAT_CONSTANTS = {
//   APP_ID: '250387ba5c23481b', //Replace with your App ID
//   REGION: 'in', //Replace with your App Region
//   AUTH_KEY: '4e0ccc5ecaa1e0dee8ecbb780dd1c0a5bad225a0', //Replace with your Auth Key
// }

// //create the builder
// const UIKitSettings = new UIKitSettingsBuilder()
//   .setAppId(COMETCHAT_CONSTANTS.APP_ID)
//   .setRegion(COMETCHAT_CONSTANTS.REGION)
//   .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
//   .subscribePresenceForFriends()
//   .build()

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
    //Initialize CometChat UIKit
    // CometChatUIKit.init(UIKitSettings)
    //   .then(() => {
    //     console.log('Initialization completed successfully')
    //     // You can now call login function.
    //   })
    //   .catch(console.log)
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
