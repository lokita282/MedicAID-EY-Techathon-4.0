import { React, useState, useEffect } from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'
import Loading from '../../components/loader/Loading'
import { df_jc_ac } from '../../theme/CssMy'

//MUI Imports
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"
import { deepOrange, deepPurple } from '@mui/material/colors';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Modal from '@mui/material/Modal';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
//Integration imports
import { getSingleAppointmentDetails, getAppointmentHistory, getDifferentialDiagnoses, getAppointmentReport } from '../../services/doctorService'
import { Link } from "react-router-dom"



const SinglePatientPage = () => {
  const [loading, setLoading] = useState(false)
  const [appointment, setAppointment] = useState()
  const [appointmentHistory, setAppointmentHistory] = useState([])
  const [diagnoses, setDiagnoses] = useState([])
  const [tabSwitch, setTabSwitch] = useState(false)
  const [reports, setReports] = useState()

  const id = window.location.href.split('/')[4]

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FAFAFA',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setLoading(true)
    const func = async () => {
      await getSingleAppointmentDetails(id).then(async (res) => {
        console.log(res.data.appointment.symptoms)
        var x = {
          "demographics": [
            res.data.appointment.patientId.patientDemographics.age.toString(),
            res.data.appointment.patientId.patientDemographics.gender,
            res.data.appointment.patientId.patientDemographics.height,
            res.data.appointment.patientId.patientDemographics.weight,
          ],
          "symptoms": res.data.appointment.symptoms
        }
        setAppointment(res.data.appointment)
        getAppointmentHistory(res.data.appointment.patientId._id).then((res) => {
          setAppointmentHistory(res.data.appointments)
        })
        getDifferentialDiagnoses(x).then((res) => {
          console.log(res)
          setDiagnoses(res.data)
        })
        getAppointmentReport(id).then((res) => {
          console.log("rp", res);
          setReports(res.data)
        })
      })
      setLoading(false)
    }
    func()
  }, [])

  // const diagnoses = [1, 2, 3, 4]



  return (
    <SideDrawer>
      {appointment ? (
        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row ',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Stack direction="row" spacing={6} sx={{ alignItems: 'center' }}>
              <Avatar
                sx={{ width: 60, height: 60, bgcolor: deepPurple[500] }}
              >
                P
              </Avatar>
              <Box sx={{ fontWeight: 'bold', fontSize: 22 }}>
                {appointment.patientId.name}
              </Box>
            </Stack>
            <Box sx={{ color: '#989898', fontWeight: 600, fontSize: 17 }}>
              Scheduled Visit : {appointment.start}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }}> </Divider>
          <Grid container direction={'row'} spacing={3}>
            <Grid item xs={4}>
              <Paper
                sx={{
                  // boxShadow: 'none',
                  px: 1,
                  py: 2,
                  backgroundColor: '#FAFAFA',
                  height: "auto",
                  borderRadius: 3,
                }}
              >
                <Box sx={{ textAlign: 'center', fontWeight: 550 }}>  Previous Appointments </Box>
                <Box sx={{ mt: 2, display: "flex", }}>
                  <Timeline
                    sx={{
                      [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0.2,

                      },
                    }}
                  >
                    {appointmentHistory ? (appointmentHistory.map((appointment) => (
                      <TimelineItem key={appointment._id} >
                        <TimelineOppositeContent
                        >
                          {appointment.start}  -  {appointment.end}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          {/* <TimelineConnector /> */}
                          <TimelineDot />
                          <TimelineConnector sx={{ height: 150 }} />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Paper sx={{ p: 2, boxShadow: 1, borderRadius: 3, }}>
                            <Stack direction="column" >
                              <Box sx={{ fontWeight: 600 }}> {appointment.title} </Box>
                              <Stack
                                direction="row"
                                spacing={1}
                                sx={{ mt: 1, alignItems: 'center' }}
                              >
                                <Box sx={{ fontWeight: 600, }}>Symptoms:</Box>
                                {appointment.symptoms.map((symptom) => {
                                  return <Box sx={{ fontWeight: 500 }} key={symptom} > {symptom} </Box>
                                })}
                              </Stack>
                            </Stack>
                            <Stack spacing={3} direction="row" sx={{ justifyContent: 'space-between', mt: 1, pr: 1 }}>
                              <Button onClick={handleOpen} variant="contained" color="error"> Pres. </Button>
                              <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box sx={style}>
                                  <Box id="modal-modal-title" sx={{ fontSize: 20, fontWeight: 'bold', my: 1 }}>
                                    Appointment Prescription
                                  </Box>

                                  <img src={`data:image/jpeg;base64,${appointment?.prescription}`} height="100%" width="100%" />

                                </Box>
                              </Modal>
                              <Link style={{ marginTop: "16px" }} >    Details {">"} </Link>

                            </Stack>
                          </Paper>
                        </TimelineContent>
                      </TimelineItem>
                    ))) : (<Box sx={{ ...df_jc_ac, height: '80vh' }}>
                      <Loading />
                    </Box>)}
                  </Timeline>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={8} sx={{ pr: 6 }}>
              <Paper
                sx={{
                  boxShadow: 'none',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ fontSize: 20, fontWeight: 600 }}>
                  Patient Demographics:
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Stack direction="column" spacing={1}>
                    <Box>
                      Age: {appointment.patientId.patientDemographics.age}
                    </Box>
                    <Box>
                      Gender:
                      {appointment.patientId.patientDemographics.gender}
                    </Box>
                  </Stack>
                  <Stack direction="column" spacing={1}>
                    <Box>
                      Height:
                      {appointment.patientId.patientDemographics.height}
                    </Box>
                    <Box>
                      Weight:
                      {appointment.patientId.patientDemographics.weight}
                    </Box>
                  </Stack>
                  <Stack direction="column" spacing={1}>
                    <Box>
                      Address:
                      {appointment.patientId.patientDemographics.address}
                    </Box>
                    <Box> Contact: {appointment.patientId.contact}</Box>
                  </Stack>
                </Box>
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ mt: 4, alignItems: 'center' }}
                >
                  <Box sx={{ fontSize: 20, fontWeight: 600 }}>Symptoms:</Box>
                  {appointment.symptoms.map((symptom) => {
                    return <Chip key={symptom} label={symptom} sx={{ fontSize: 16 }}></Chip>
                  })}
                </Stack>

                {tabSwitch ?
                  (<>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 3,
                      }}
                    >
                      <Box sx={{ fontSize: 20, fontWeight: 600 }}>
                        Uploaded Files:
                      </Box>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: 'rgb(0,87,57)',
                          color: 'rgb(0,87,57)',
                          boxShadow: 'none',
                        }}
                        onClick={(e) => setTabSwitch(false)

                        }
                      >
                        <Box sx={{ fontWeight: 20 }}> View Diagnoses </Box>
                      </Button>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      {reports?.map((image) => (
                        <img src={`data:image/jpeg;base64,${image.reports}`} height="50%" width="50%" />
                      ))}
                    </Box>
                  </>)
                  :
                  (<>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 3,
                      }}
                    >
                      <Box sx={{ fontSize: 20, fontWeight: 600 }}>
                        Possible Differential Diagnoses:
                      </Box>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: 'rgb(0,87,57)',
                          color: 'rgb(0,87,57)',
                          boxShadow: 'none',
                        }}
                        onClick={(e) => setTabSwitch(true)}
                      >
                        <Box sx={{ fontWeight: 20 }}> View Files </Box>
                      </Button>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      {/* {diagnoses ? diagnoses : "no"} */}
                      {diagnoses?.map((disease) => (
                        <Box
                          key={disease}
                          direction="column"
                          sx={{ boxShadow: 1, borderRadius: 4, mt: 2 }}
                        >
                          <Box
                            sx={{
                              backgroundColor: '#EAEAEA',
                              px: 2,
                              py: 1,
                              borderTopLeftRadius: 14,
                              borderTopRightRadius: 14,
                              fontWeight: 'bold',
                            }}
                          >
                            {disease.name}
                          </Box>
                          <Box
                            sx={{
                              px: 2,
                              py: 1,
                              borderBottomLeftRadius: 14,
                              borderBottomRightRadius: 14,
                            }}
                          >
                            {disease.description}
                          </Box>
                          <Stack
                            direction="row"
                            spacing={2}
                            sx={{ px: 1, py: 1 }}
                          >
                            <Chip label={`${disease.probability}`} />
                            <Chip
                              label="Most Probable"
                              sx={{
                                color: 'rgb(74,177,102)',
                                backgroundColor: 'rgba(74,177,102,0.2)',
                              }}
                            />
                          </Stack>
                        </Box>
                      ))}
                    </Box>
                  </>)}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Box sx={{ ...df_jc_ac, height: '80vh' }}>
          <Loading />
        </Box>
      )}
    </SideDrawer>
  )
}

export default SinglePatientPage