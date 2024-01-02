import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import {
  getAppointmentReport,
} from '../../services/doctorService.js'
import Loading from '../loader/Loading'
import { df_jc_ac } from '../../theme/CssMy'

const id = window.location.href.split('/')[4]


const ViewReports = () => {
  const [loading, setLoading] = useState(false)
  const [reports, setReports] = useState()

  useEffect(() => {
    setLoading(true)
    if(id) {
      getAppointmentReport(id).then((res) => {
        console.log('rp', res)
        setReports(res.data)
      })
      setLoading(false)
    }
   
  }, [])
  

  return (
    <>
      {loading ? (
        <Box sx={{ ...df_jc_ac, height: '80vh' }}>
          <Loading />
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          {reports?.map((image) => (
            image.reports ? ( <img
              src={`data:image/jpeg;base64,${image.reports}`}
              height="50%"
              width="50%"
              alt="report"
              borderRadius="10px"
            />): ('')
           
          ))}
        </Box>
      )}
    </>
  )
}

export default ViewReports

