import React from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

function randomID(len) {
  let result = ''
  if (result) return result
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i
  len = len || 5
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return result
}

export default function Meet() {
  const roomId = window.location.href.split('/')[3]

  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 1385587235
    const serverSecret = 'ffc90864505a3b83ad119c1c381b79c5'
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      randomID(5),
      randomID(5)
    )

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken)
    console.log(zp)
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
           window.location.protocol + '//' +
           window.location.host+ "/"+
            roomId,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    })
  }
  return (
    <SideDrawer>
      Meet {roomId}
      {console.log(
        window.location.protocol +
          '//' +
          window.location.host +
          window.location.pathname +
          '?roomID=' +
          roomId
      )}
      <div ref={myMeeting} style={{ width: '90vw', height: '90vh' }} />
    </SideDrawer>
  )
}
