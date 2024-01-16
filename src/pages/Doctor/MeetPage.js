import { React, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { eycontext } from '../../context/MainContext'
import SideDrawer from '../../components/sidebar/Sidebar'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder'
import Box from '@mui/material/Box'

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

const addAudioElement = (blob) => {
  const url = URL.createObjectURL(blob)
  const audio = document.createElement('audio')
  audio.src = url
  audio.controls = true
  document.body.appendChild(audio)
}

export default function Meet() {
  const navigate = useNavigate()
  const { user } = useContext(eycontext)
  const recorderControls = useAudioRecorder()
  const [flag, setFlag] = useState(false)
  console.log(recorderControls.isRecording)

  function onLeave() {
   
    // recorderControls.stopRecording()
    // console.log(recorderControls.isRecording)
    // addAudioElement()
    // setFlag(true)
    // recorderControls.onRecordingComplete()
    // var x = document.getElementById('recorderr')
    if(user.role==='doctor') {
      var x = document.querySelector('[title="Discard Recording"]')
      console.log('--------------------------------------------')
      console.log(x)
      x.click()
      console.log(x.trigger('click'))
      console.log('--------------------------------------------')
      navigate('/prescription')
    } else {
      navigate('/view-prescription')
    }
    
    // $('#button1').click(function () {
    //   $('#button2').click()
    // })
    // var att = x.createAttribute('onClick')
    // att.value = () => {

    // }

    
  }
  function onJoin() {
    // navigate('/prescription')
    recorderControls.startRecording()    
  }

  const roomId = window.location.href.split('/')[3]
  console.log(roomId)
  // const roomId = '12345'

  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 1385587235
    const serverSecret = 'ffc90864505a3b83ad119c1c381b79c5'
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      randomID(5),
      user.name
    )

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken)
    // console.log(zp)
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname 
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
      onLeaveRoom: () => onLeave(),
      onJoinRoom: () => onJoin(),
    })
  }
  return (
    <SideDrawer>
      <div ref={myMeeting} style={{ width: '80vw', height: '80vh', margin: 'auto' }} />
      {user.role === 'doctor' ? (
        <Box id="recorderr" sx={{ float: 'inline-end' }}>
          <AudioRecorder
            // onRecordingComplete={addAudioElement}
            // audioTrackConstraints={{
            //   noiseSuppression: true,
            //   echoCancellation: true,
            // }}
            downloadOnSavePress={true}
            downloadFileExtension="mp3"
            onRecordingComplete={(blob) => addAudioElement(blob)}
            recorderControls={recorderControls}
          />
        </Box>
      ) : (
        ''
      )}
    </SideDrawer>
  )
}
