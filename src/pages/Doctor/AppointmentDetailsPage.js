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
import ViewReports from '../../components/aptDetailsDoc/ViewReports'
import ViewDiagnoses from '../../components/aptDetailsDoc/ViewDiagnoses'
//Integration imports
import { getSingleAppointmentDetails, getAppointmentHistory,  } from '../../services/doctorService'
import { Link } from "react-router-dom"





const SinglePatientPage = () => {
  const [loading, setLoading] = useState(false)
  const [appointment, setAppointment] = useState()
  const [appointmentHistory, setAppointmentHistory] = useState([])
  const [diagnoses, setDiagnoses] = useState([])
  const [tabSwitch, setTabSwitch] = useState('diagnoses')
  const [reports, setReports] = useState()

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
    const id = window.location.href.split('/')[4]
    const func = async () => {
     if (id!==undefined) {
       await getSingleAppointmentDetails(id).then(async (res) => {
         console.log(res.data.appointment.symptoms)
         setAppointment(res.data.appointment)
         getAppointmentHistory(res.data.appointment.patientId._id).then(
           (res) => {
             setAppointmentHistory(res.data.appointments)
           }
         )
       })
     }
      setLoading(false)
    }
    func()
  }, [])

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
              <Avatar sx={{ width: 60, height: 60, bgcolor: deepPurple[500] }}>
                {appointment.patientId.name[0].toUpperCase()}
              </Avatar>
              <Box sx={{ fontWeight: 'bold', fontSize: 22 }}>
                {appointment.patientId.name[0].toUpperCase() + appointment.patientId.name.substring(1)}
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
                  height: 'auto',
                  borderRadius: 3,
                }}
              >
                <Box sx={{ textAlign: 'center', fontWeight: 550 }}>
                  {' '}
                  Previous Appointments{' '}
                </Box>
                <Box sx={{ mt: 2, display: 'flex' }}>
                  <Timeline
                    sx={{
                      [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0.2,
                      },
                    }}
                  >
                    {appointmentHistory ? (
                      appointmentHistory.map((appointment) => (
                        <TimelineItem key={appointment._id}>
                          <TimelineOppositeContent>
                            {
                              new Date(appointment.start)
                                .toString()
                                .split(':00')[0]
                            }
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            {/* <TimelineConnector /> */}
                            <TimelineDot />
                            <TimelineConnector sx={{ height: 150 }} />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Paper
                              sx={{
                                p: 2,
                                boxShadow: 1,
                                borderRadius: 3,
                                maxWidth: 250,
                              }}
                            >
                              <Stack direction="column">
                                <Box sx={{ fontWeight: 600 }}>
                                  {' '}
                                  {appointment.title[0].toUpperCase()+appointment.title.substring(1)}{' '}
                                </Box>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{ mt: 1, alignItems: 'center' }}
                                >
                                  <Box sx={{ fontWeight: 600 }}>Symptoms:</Box>
                                  {appointment.symptoms.map((symptom) => {
                                    return (
                                      <Box
                                        sx={{ fontWeight: 500 }}
                                        key={symptom}
                                      >
                                        {' '}
                                        {symptom[0].toUpperCase()+symptom.substring(1)}{' '}
                                      </Box>
                                    )
                                  })}
                                </Stack>
                              </Stack>
                              <Stack
                                spacing={3}
                                direction="row"
                                sx={{
                                  justifyContent: 'space-between',
                                  mt: 1,
                                  pr: 1,
                                }}
                              >
                                <Button
                                  onClick={handleOpen}
                                  variant="contained"
                                  sx={{ backgroundColor: '#005739' }}
                                >
                                  {' '}
                                  Pres.{' '}
                                </Button>
                                <Modal
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box sx={style}>
                                    <Box
                                      id="modal-modal-title"
                                      sx={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        my: 1,
                                      }}
                                    >
                                      Appointment Prescription
                                    </Box>

                                    <img
                                      src={`data:image/jpeg;base64,${appointment?.prescription}`}
                                      height="100%"
                                      width="100%"
                                    />
                                  </Box>
                                </Modal>
                                <Link style={{ marginTop: '16px', textDecoration: 'none', color: '#000000' }}>
                                  {' '}
                                  Details {'>'}{' '}
                                </Link>
                              </Stack>
                            </Paper>
                          </TimelineContent>
                        </TimelineItem>
                      ))
                    ) : (
                      <Box sx={{ ...df_jc_ac, height: '80vh' }}>
                        <Loading />
                      </Box>
                    )}
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
                {/* <Box sx={{ fontSize: 20, fontWeight: 600 }}>
                  Patient Demographics:
                </Box> */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Stack direction="column" spacing={0}>
                      <Typography variant="body1" color="#aeaeae">
                        <b>Age</b>
                      </Typography>
                      <Typography variant="h6" color="initial">
                        <b>{appointment.patientId.patientDemographics.age}</b>
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack direction="column" spacing={0}>
                      <Typography variant="body1" color="#aeaeae">
                        <b>Height</b>
                      </Typography>
                      <Typography variant="h6" color="initial">
                        <b>
                          {appointment.patientId.patientDemographics.height}
                        </b>
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack direction="column" spacing={0}>
                      <Typography variant="body1" color="#aeaeae">
                        <b>Address</b>
                      </Typography>
                      <Typography variant="h6" color="initial">
                        <b>
                          {appointment.patientId.patientDemographics.address[0].toUpperCase() +
                            appointment.patientId.patientDemographics.address.substring(1)}
                        </b>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ paddingTop: '1.5em' }}>
                  <Grid item xs={4}>
                    <Stack direction="column" spacing={0}>
                      <Typography variant="body1" color="#aeaeae">
                        <b>Gender</b>
                      </Typography>
                      <Typography variant="h6" color="initial">
                        <b>{appointment.patientId.patientDemographics.gender[0].toUpperCase() +
                            appointment.patientId.patientDemographics.gender.substring(1)}</b>
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack direction="column" spacing={0}>
                      <Typography variant="body1" color="#aeaeae">
                        <b>Weight</b>
                      </Typography>
                      <Typography variant="h6" color="initial">
                        <b>{appointment.patientId.patientDemographics.weight}</b>
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack direction="column" spacing={0}>
                      <Typography variant="body1" color="#aeaeae">
                        <b>Contact</b>
                      </Typography>
                      <Typography variant="h6" color="initial">
                        <b>{appointment.patientId.contact}</b>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ mt: 4, alignItems: 'center' }}
                >
                  <Box sx={{ fontSize: 20, fontWeight: 600 }}>Symptoms:</Box>
                  {appointment.symptoms.map((symptom) => {
                    return (
                      <Chip
                        key={symptom}
                        label={symptom[0].toUpperCase()+symptom.substring(1)}
                        sx={{ fontSize: 16 }}
                      ></Chip>
                    )
                  })}
                </Stack>
                {tabSwitch === 'files' ? (
                  <>
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
                        onClick={(e) => setTabSwitch('diagnoses')}
                      >
                        <Box sx={{ fontWeight: 20 }}> View Diagnoses </Box>
                      </Button>
                    </Box>
                    <ViewReports />
                  </>
                ) : (
                  <>
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
                        onClick={(e) => setTabSwitch('files')}
                      >
                        <Box sx={{ fontWeight: 20 }}> View Files </Box>
                      </Button>
                    </Box>
                    <ViewDiagnoses />
                  </>
                )}
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