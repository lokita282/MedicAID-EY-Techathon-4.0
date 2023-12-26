import { React, useState, useEffect } from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'

import { Scheduler } from '@aldabil/react-scheduler'

import { getAllAppointments } from '../../services/doctorService'

export default function Appointments() {
  const [loading, setLoading] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [calEvents, setCalEvents] = useState()
  var ev =  []
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
      {calEvents ? <Scheduler view="week" events={calEvents} /> : 'loading'}
    </SideDrawer>
  )
}
