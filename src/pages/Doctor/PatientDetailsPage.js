import { React, useState, useEffect } from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'
import Loading from '../../components/loader/Loading'
import { df_jc_ac } from '../../theme/CssMy'

//MUI Imports
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { deepOrange, deepPurple } from '@mui/material/colors'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent'
import ViewReportsGeneral from '../../components/aptDetailsDoc/ViewReports'
//Integration imports
import {
  getAppointmentHistory,
  getPatientUpcomingAppointmentsForDoc,
  getSinglePatient,
} from '../../services/doctorService'
import { Link } from 'react-router-dom'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
  

const SinglePatientPage = () => {
  const [loading, setLoading] = useState(false)
  const [appointment, setAppointment] = useState([])
  const [appointmentHistory, setAppointmentHistory] = useState([])
  const [upcomingAppointments, setUpcomingAppointments] = useState()
  const [patient, setPatient] = useState()
  const [diagnoses, setDiagnoses] = useState([])
  const [tabSwitch, setTabSwitch] = useState('diagnoses')
  const [reports, setReports] = useState()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

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
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    setLoading(true)
    const func = async () => {
      if(id) {
        await getAppointmentHistory(id).then((res) =>{
          setAppointmentHistory(res.data.appointments)
        })
        await getPatientUpcomingAppointmentsForDoc(id).then((res) => {
          setUpcomingAppointments(res.data.appointments)
        })
        await getSinglePatient(id).then((res) => {
          setPatient(res.data.patient)
        })
      }
      setLoading(false)
    }
    func()
  }, [])

  return (
    <SideDrawer>
      {patient ? (
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
                {patient.name[0].toUpperCase()}
              </Avatar>
              <Box sx={{ fontWeight: 'bold', fontSize: 22 }}>
                {patient.name[0].toUpperCase() +
                  patient.name.substring(1)}
              </Box>
            </Stack>
           
          </Box>

          <Divider sx={{ my: 2 }}> </Divider>
          <Grid container direction={'row'} spacing={3}>
            <Grid item xs={4.5}>
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

                <Box sx={{ width: '100%', justifyContent: 'center' }}>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: 'divider',
                      justifyContent: 'center',
                    }}
                  >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      centered
                    >
                      <Tab label="Previous Appointments" {...a11yProps(0)} />
                      <Tab label="Upcoming Appointments" {...a11yProps(1)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
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
                                      {appointment.title[0].toUpperCase() +
                                        appointment.title.substring(1)}{' '}
                                    </Box>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      sx={{ mt: 1, alignItems: 'center' }}
                                    >
                                      <Box sx={{ fontWeight: 600 }}>
                                        Symptoms:
                                      </Box>
                                      {appointment.symptoms.map((symptom) => {
                                        return (
                                          <Box
                                            sx={{ fontWeight: 500 }}
                                            key={symptom}
                                          >
                                            {' '}
                                            {symptom[0].toUpperCase() +
                                              symptom.substring(1)}{' '}
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
                                          alt="prescription"
                                        />
                                      </Box>
                                    </Modal>
                                    <Link
                                      style={{
                                        marginTop: '16px',
                                        textDecoration: 'none',
                                        color: '#000000',
                                      }}
                                    >
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
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    <Box sx={{ mt: 2, display: 'flex' }}>
                      <Timeline
                        sx={{
                          [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.2,
                          },
                        }}
                      >
                        {upcomingAppointments ? (
                          upcomingAppointments.map((appointment) => (
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
                                      {appointment.title[0].toUpperCase() +
                                        appointment.title.substring(1)}{' '}
                                    </Box>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      sx={{ mt: 1, alignItems: 'center' }}
                                    >
                                      <Box sx={{ fontWeight: 600 }}>
                                        Symptoms:
                                      </Box>
                                      {appointment.symptoms.map((symptom) => {
                                        return (
                                          <Box
                                            sx={{ fontWeight: 500 }}
                                            key={symptom}
                                          >
                                            {' '}
                                            {symptom[0].toUpperCase() +
                                              symptom.substring(1)}{' '}
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
                                    
                                    <Link
                                      style={{
                                        marginTop: '16px',
                                        textDecoration: 'none',
                                        color: '#000000',
                                      }}
                                    >
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
                  </CustomTabPanel>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={7.5} sx={{ pr: 6 }}>
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
                ></Box>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Stack direction="column" spacing={0}>
                      <Typography variant="body1" color="#aeaeae">
                        <b>Age</b>
                      </Typography>
                      <Typography variant="h6" color="initial">
                        <b>{patient.patientDemographics.age}</b>
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
                          {patient.patientDemographics.height}
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
                          {patient.patientDemographics.address[0].toUpperCase() +
                            patient.patientDemographics.address.substring(
                              1
                            )}
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
                        <b>
                          {patient.patientDemographics.gender[0].toUpperCase() +
                            patient.patientDemographics.gender.substring(
                              1
                            )}
                        </b>
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack direction="column" spacing={0}>
                      <Typography variant="body1" color="#aeaeae">
                        <b>Weight</b>
                      </Typography>
                      <Typography variant="h6" color="initial">
                        <b>
                          {patient.patientDemographics.weight}
                        </b>
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack direction="column" spacing={0}>
                      <Typography variant="body1" color="#aeaeae">
                        <b>Contact</b>
                      </Typography>
                      <Typography variant="h6" color="initial">
                        <b>{patient.contact}</b>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
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
                    </Box>
                    <ViewReportsGeneral />
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
