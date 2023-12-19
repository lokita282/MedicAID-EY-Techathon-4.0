import React, { useContext } from 'react'
import SideDrawer from '../components/sidebar/Sidebar'
import { eycontext } from '../context/MainContext'
import PatientDashboardPage from './PatientDashboardPage'
import OrgDashboard from '../components/dashboard/OrgDashboard'
import DoctorDashboardPage from './DoctorDashboardPage'
import MyComponent from '../services/encryptdecrypt'

export default function DashboardPage() {
  const { user } = useContext(eycontext)
  return (
    <SideDrawer>
      { user?.role === "doctor" ? <DoctorDashboardPage />: <PatientDashboardPage /> }
      <MyComponent />
    </SideDrawer>
  )
}
