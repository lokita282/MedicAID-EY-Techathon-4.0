import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import {
  getAppointmentReport, getReportDetection, getMRIDetection
} from '../../services/doctorService.js'
import Loading from '../loader/Loading'
import { df_jc_ac } from '../../theme/CssMy'

const id = window.location.href.split('/')[4]


const ViewReports = () => {
  const [loading, setLoading] = useState(false)
  const [reports, setReports] = useState()
  const [detection1, setDetection1] = useState()
  const [detection2, setDetection2] = useState()

  useEffect(() => {
    setLoading(true)
    if (id) {
      getAppointmentReport(id).then((res) => {
        console.log('rp', res)
        setReports(res.data.report)
        getReportDetection({ "image": res.data.report.reports }).then((res1) => {

          console.log(res1);
          setDetection1(res1.data)
        })
        getMRIDetection({ "image": res.data.report.reports }).then((res2) => {
          setDetection2(res2.data)
        })
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
        <Box sx={{ mt: 2, display: "flex" }}>
          {/* {reports?.map((image) => (
            image.reports ? ( <img
              src={`data:image/jpeg;base64,${image.reports}`}
              height="50%"
              width="50%"
              alt="report"
              borderRadius="10px"
            />): ('')
           
          ))} */}
          <img
            src={`data:image/jpeg;base64,${reports?.reports}`}
            height="50%"
            width="50%"
            alt="report"
            // borderRadius="30px"
            style={{ "border-radius": "15px" }}
          />
          <Box sx={{width : "100%"}}>

            <Paper sx={{ width: "100%", ml: 3, backgroundColor: "#FAFAFA", borderRadius: 3, p: 2, height: "4em" }}>
              <Stack direction="column">
                <Box sx={{ fontWeight: 500, fontSize: 20 }}>CT Scan Detection</Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box> Predicted : {detection1?.predicted_class} </Box>
                  <Box> {detection1?.probability} </Box>

                </Box>
              </Stack>

            </Paper>
            <Paper sx={{ width: "100%", ml: 3, backgroundColor: "#FAFAFA", borderRadius: 3, p: 2, height: "4em", mt : 2 }}>
              <Stack direction="column">
                <Box sx={{ fontWeight: 500, fontSize: 20 }}>MRI Detection</Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box> Predicted : {detection2?.predicted_class} </Box>
                  <Box> {detection2?.probability} </Box>

                </Box>
              </Stack>

            </Paper>
          </Box>
        </Box>
      )}
    </>
  )
}

export default ViewReports

