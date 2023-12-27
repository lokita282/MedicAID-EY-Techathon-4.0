import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { UIKitSettingsBuilder } from '@cometchat/uikit-shared'
// import { CometChatUIKit } from '@cometchat/chat-uikit-react'

// const COMETCHAT_CONSTANTS = {
//   APP_ID: '250387ba5c23481b', //Replace with your App ID
//   REGION: 'in', //Replace with your App Region
//   AUTH_KEY: '4e0ccc5ecaa1e0dee8ecbb780dd1c0a5bad225a0', //Replace with your Auth Key
// }

// (async () => {
//   //create the builder
//   const UIKitSettings = new UIKitSettingsBuilder()
//     .setAppId(COMETCHAT_CONSTANTS.APP_ID)
//     .setRegion(COMETCHAT_CONSTANTS.REGION)
//     .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
//     .subscribePresenceForFriends()
//     .build()
//     try {
//       //Initialize CometChat UIKit
//       await CometChatUIKit.init(UIKitSettings)
//         .then(() => {
//           console.log('Initialization completed successfully')
//           // You can now call login function.
//         })
//         .catch(console.log('error while init'))
//         const root = ReactDOM.createRoot(document.getElementById('root'))
      
//     } catch (error) {
//       console.log(error)
//     }
// })()

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

reportWebVitals();
