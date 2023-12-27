import { React, useState, useEffect } from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'

//MUI imports 
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Link } from 'react-router-dom'
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

import { Scheduler } from '@aldabil/react-scheduler'

import { getAllAppointments } from '../../services/doctorService'

export default function Appointments() {
  const [loading, setLoading] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [calEvents, setCalEvents] = useState()
  var ev = []
  // const events = []
  const arr = [
    {
      event_id: 1,
      title: 'Event 1',
      start: new Date('2023/12/25 09:30'),
      end: new Date('2023/12/25 10:30'),
    },
    {
      event_id: 2,
      title: 'Event 2',
      start: new Date('2021/5/4 10:00'),
      end: new Date('2021/5/4 11:00'),
    },
  ]
  console.log(arr)

  useEffect(() => {
    setLoading(true)
    const func = async () => {
      await getAllAppointments().then((res) => {
        console.log(res)

        setAppointments(res.data.appointments)
        res.data.calendarEvents.map((event) => {
          event.start = new Date(event.start)
          event.end = new Date(event.end)
          console.log(event)
          ev.push(event)
        })
        setCalEvents(ev)
      })
      setLoading(false)
    }
    func()
  }, [])

  return (
    <SideDrawer>
      {calEvents ?
        <Scheduler
          view="week"
          events={calEvents}
          fields={[
            // {
            //   name: "user_id",
            //   type: "select",
            //   // Should provide options with type:"select"
            //   options: [
            //     { id: 1, text: "John", value: 1 },
            //     { id: 2, text: "Mark", value: 2 }
            //   ],
            //   config: { label: "User", required: true, errMsg: "Plz Select User" }
            // },
            {
              name: "meet_link",
              type: "input",
              default: "",
              config: { label: "Meet Link", multiline: false }
            },
            {
              name: "patient_name",
              type: "input",
              default: "",
              config: { label: "Patient name", multiline: false }
            },
            {
              name: "symptoms",
              type: "input",
              default: "",
              config: { label: "Symptoms", multiline: false }
            },
            {
              name: "patient_age",
              type: "input",
              default: "",
              config: { label: "Meet Link", multiline: false }
            },
            {
              name: "patient_gender",
              type: "input",
              default: "",
              config: { label: "Meet Link", multiline: false }
            },
          ]}
          week={{

            weekDays: [0, 1, 2, 3, 4, 5, 6],
            weekStartOn: 6,
            startHour: 9,
            endHour: 23,
            step: 30
          }}


          viewerExtraComponent={(fields, event) => {
            return (
              <Box sx={{ p: 1 }} >
                <Box sx={{ fontWeight: 600, fontSize: 22 }}>
                  {event.patient_name}
                </Box>
                <Box sx={{ color: "#AEAEAE" }}>
                  {event.patient_age}, {event.patient_gender}
                </Box>
                <Stack direction="row" sx={{ fontSize: 17, fontWeight: 500, mt: 1 }}>
                  Symptoms : <Stack direction="row" spacing={1} sx={{ mx: 1 }}>
                    {event.symptoms?.map((s) => (
                      <Box sx={{ fontWeight: 400 }} key={s}> {s} </Box>
                    ))}
                  </Stack>
                </Stack>
                <Stack direction="row" sx={{ justifyContent: "space-between", mt: 1, textAlign: "center" }} >
                  <Link to="#" style={{ marginTop: "8px" }}>Open Video Meet</Link>

                  <Link 
                  to={`/appointment_details/${event?.event_id}`}
                  style={{
                    textDecoration: 'none',
                    borderRadius: "7px",
                    padding: '8px 16px',
                    backgroundColor: 'rgba(25, 118, 210, 0.3)',
                    color: '#1976D2',
                  }}>
                    Details
                  </Link>
                </Stack>
              </Box>
            );
          }}
        />
        : 'loading'}
    </SideDrawer>
  )
}
