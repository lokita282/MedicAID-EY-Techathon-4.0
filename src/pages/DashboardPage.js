import React, { useContext, useState } from 'react'
import SideDrawer from '../components/sidebar/Sidebar'
import { eycontext } from '../context/MainContext'
import PatientDashboardPage from './PatientDashboardPage'
import OrgDashboard from '../components/dashboard/OrgDashboard'
import DoctorDashboardPage from './DoctorDashboardPage'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'
import ReportsPage from './Patient/ReportsPage'
// import MyComponent from '../services/encryptdecrypt'

export default function DashboardPage() {
  const navigate = useNavigate()

  const { user } = useContext(eycontext)
  const [value, setValue] = useState()
  // const handleJoinRoom = () => { 
  //   navigate(`/${value}`)
  // }

  return (
    <SideDrawer>
      {/* <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      /> */}
      {/* <Button variant="text" color="primary" onClick={handleJoinRoom}>
        join
      </Button> */}
      {user?.role === 'doctor' ? <DoctorDashboardPage /> : <ReportsPage />}
      {/* <MyComponent /> */}
    </SideDrawer>
  )
}
