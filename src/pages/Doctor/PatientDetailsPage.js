import { React, useState, useEffect } from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'
import Loading from '../../components/loader/Loading'
import { df_jc_ac } from '../../theme/CssMy'
import { useNavigate } from 'react-router'
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
import ViewReportsGeneral from '../../components/patientDetailsDoc/ViewReportsGeneral'
//Integration imports
import {
  getAppointmentHistory,
  getPatientUpcomingAppointmentsForDoc,
  getSinglePatient,
} from '../../services/doctorService'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import PlayCircleFilledSharpIcon from '@mui/icons-material/PlayCircleFilledSharp';
import Medications from './../../components/medications/Medications';


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
          <Typography sx={{ fontFamily: "Poppins" }}>{children}</Typography>
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

  const navigate = useNavigate();

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
      if (id) {
        await getAppointmentHistory(id).then((res) => {
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
                {patient.name[0].toUpperCase() + patient.name.substring(1)}
              </Box>
            </Stack>
            <Stack direction={"row"} spacing={2} >
              <Chip icon={<Icon
                color="#005739"
                icon="ph:gender-intersex-fill"
                width="25"
                height="25"
              />} label={`${patient.patientDemographics.gender[0].toUpperCase() +
                patient.patientDemographics.gender.substring(1)} `}
                sx={{ px: 1, fontWeight: 600, color: '#005739', backgroundColor: "rgba(0,87,57,0.1)", }}
              />
              <Chip icon={<Icon
                color="#005739"
                icon="game-icons:ages"
                width="25"
                height="25"
              />} label={`${patient?.patientDemographics.age} years`}
                sx={{ px: 1, fontWeight: 600, color: '#005739', backgroundColor: "rgba(0,87,57,0.1)", }}

              />
              <Chip icon={<Icon
                color="#005739"
                icon="game-icons:weight"
                width="25"
                height="25"
              />} label={`${patient?.patientDemographics.weight}`}
                sx={{ px: 1, fontWeight: 600, color: '#005739', backgroundColor: "rgba(0,87,57,0.1)", }}

              />
              <Chip icon={<Icon
                color="#005739"
                icon="game-icons:body-height"
                width="25"
                height="25"
              />} label={`${patient?.patientDemographics.height}`}
                sx={{ px: 1, fontWeight: 600, color: '#005739', backgroundColor: "rgba(0,87,57,0.1)", }}

              />
              <Chip icon={<Icon
                color="#005739"
                icon="mingcute:phone-fill"
                width="25"
                height="25"
              />} label={`${patient?.contact} `}
                sx={{ px: 1, fontWeight: 600, color: '#005739', backgroundColor: "rgba(0,87,57,0.1)", }}

              />
              <Chip icon={<Icon
                color="#005739"
                icon="mdi:address-marker"
                width="25"
                height="25"
              />} label={`${patient.patientDemographics.address[0].toUpperCase() +
                patient.patientDemographics.address.substring(1)}`}
                sx={{ px: 1, fontWeight: 600, color: '#005739', backgroundColor: "rgba(0,87,57,0.1)", }}

              />
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
                  height: '50vh',
                  borderRadius: 3,
                  overflow: 'auto',
                  '&::-webkit-scrollbar': {
                    // display: 'none'
                    width: "12px",
                    borderRadius: "10px",
                  },
                  '&::-webkit-scrollbar-track': {
                    // '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
                    borderRadius: "10px",

                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.1)',
                    borderRadius: "10px",
                    // outline: '1px solid slategrey'
                  }
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
                                    // maxWidth: 250,
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
                                  <Box
                                    // spacing={3}
                                    // direction="row"
                                    sx={{
                                      display: "flex",
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      mt: 2,
                                      pr: 1,
                                    }}
                                  >
                                    <Button
                                      onClick={handleOpen}
                                      variant="contained"
                                      sx={{ backgroundColor: '#005739' }}
                                    >
                                      Pres.
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
                                    // style={{
                                    //   marginTop: '16px',
                                    //   textDecoration: 'none',
                                    //   color: '#000000',
                                    // }}
                                    >

                                      <Button variant="outlined" sx={{ border: "none", borderRadius: 2, color: 'rgba(0,87,57,1)', "&:hover": { border: "none" }, backgroundColor: "rgba(0,87,57,0.1)", }} endIcon={<PlayCircleFilledSharpIcon />}>
                                        Details
                                      </Button>
                                    </Link>
                                  </Box>
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
                                    // maxWidth: 250,
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
                                      <Button variant="outlined" sx={{ border: "none", borderRadius: 2, color: 'rgba(0,87,57,1)', "&:hover": { border: "none" }, backgroundColor: "rgba(0,87,57,0.1)", }} endIcon={<PlayCircleFilledSharpIcon />}>
                                        Details
                                      </Button>
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
              {/* <Paper>hello</Paper> */}
              <Medications />
            </Grid>

            <Grid item xs={7.5} sx={{ pr: 6 }}>
              <Paper
                sx={{
                  boxShadow: 'none',
                  px: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* <Box sx={{ fontSize: 20, fontWeight: 600 }}>
                  Patient Demographics:
                </Box> */}
                {/* <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                ></Box> */}
                {/* <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <Icon
                      color="#005739"
                      icon="game-icons:ages"
                      width="40"
                      height="40"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Stack direction="column" spacing={0}>
                      <Typography sx={{ fontFamily: "Poppins" }} variant="body1" color="#aeaeae">
                        <b>Age</b>
                      </Typography>
                      <Typography sx={{ fontFamily: "Poppins" }} variant="h6" color="initial">
                        <b>{patient.patientDemographics.age}</b>
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={1}>
                    <Icon
                      color="#005739"
                      icon="game-icons:body-height"
                      width="40"
                      height="40"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Stack direction="column" spacing={0}>
                      <Typography sx={{ fontFamily: "Poppins" }} variant="body1" color="#aeaeae">
                        <b>Height</b>
                      </Typography>
                      <Typography sx={{ fontFamily: "Poppins" }} variant="h6" color="initial">
                        <b>{patient.patientDemographics.height}</b>
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={1}>
                    <Icon
                      color="#005739"
                      icon="mdi:address-marker"
                      width="40"
                      height="40"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Stack direction="column" spacing={0}>
                      <Typography sx={{ fontFamily: "Poppins" }} variant="body1" color="#aeaeae">
                        <b>Address</b>
                      </Typography>
                      <Typography sx={{ fontFamily: "Poppins" }} variant="h6" color="initial">
                        <b>
                          {patient.patientDemographics.address[0].toUpperCase() +
                            patient.patientDemographics.address.substring(1)}
                        </b>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid> */}
                {/* <Grid container spacing={2} sx={{ paddingTop: '1.5em' }}>
                  <Grid item xs={1}>
                    <Icon
                      color="#005739"
                      icon="ph:gender-intersex-fill"
                      width="40"
                      height="40"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Stack direction="column" spacing={0}>
                      <Typography sx={{ fontFamily: "Poppins" }} variant="body1" color="#aeaeae">
                        <b>Gender</b>
                      </Typography>
                      <Typography sx={{ fontFamily: "Poppins" }} variant="h6" color="initial">
                        <b>
                          {patient.patientDemographics.gender[0].toUpperCase() +
                            patient.patientDemographics.gender.substring(1)}
                        </b>
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={1}>
                    <Icon
                      color="#005739"
                      icon="game-icons:weight"
                      width="40"
                      height="40"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Stack direction="column" spacing={0}>
                      <Typography sx={{ fontFamily: "Poppins" }} variant="body1" color="#aeaeae">
                        <b>Weight</b>
                      </Typography>
                      <Typography sx={{ fontFamily: "Poppins" }} variant="h6" color="initial">
                        <b>{patient.patientDemographics.weight}</b>
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={1}>
                    <Icon
                      color="#005739"
                      icon="mingcute:phone-fill"
                      width="40"
                      height="40"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Stack direction="column" spacing={0}>
                      <Typography sx={{ fontFamily: "Poppins" }} variant="body1" color="#aeaeae">
                        <b>Contact</b>
                      </Typography>
                      <Typography sx={{ fontFamily: "Poppins" }} variant="h6" color="initial">
                        <b>{patient.contact}</b>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid> */}
                <Paper sx={{ p: 2, borderRadius: 3, boxShadow: "none", pr: 3 }} >
                  <Box sx={{ fontSize: 20, fontWeight: 700 }}>
                    Medical History
                  </Box>
                  <Grid container spacing={2} direction="column" sx={{ mt: 1 }}>
                    <Grid item xs={6} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                        <Box>
                          <img src="https://i.ibb.co/mcsjV4T/image.png" alt="hello there" height="70px" width="70px" />

                        </Box>
                        <Stack direction="column" >
                          <Typography sx={{ fontWeight: 600, fontSize: 20, fontFamily: "poppins" }} > Chronic Disease </Typography>
                          <Typography sx={{ color: "#6A707F", fontFamily: "poppins" }} > Obesity, Diabetes </Typography>
                        </Stack>
                      </Stack>
                      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                        <Box>
                          <img src="https://i.ibb.co/D4r5WBr/image.png" alt="hello there" height="70px" width="70px" />
                        </Box>
                        <Stack direction="column" >
                          <Typography sx={{ fontWeight: 600, fontSize: 20, fontFamily: "poppins" }} > Family History </Typography>
                          <Typography sx={{ color: "#6A707F", fontFamily: "poppins" }} > Obesity(Father) </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={6} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "stretch" }}>
                      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                        <Box>
                          <img src="https://i.ibb.co/x8zDWHT/image.png" alt="hello there" height="70px" width="70px" />

                        </Box>
                        <Stack direction="column" >
                          <Typography sx={{ fontWeight: 600, fontSize: 20, fontFamily: "poppins" }} > Surgeries </Typography>
                          <Typography sx={{ color: "#6A707F", fontFamily: "poppins" }} > Liposuction </Typography>
                        </Stack>
                      </Stack>
                      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                        <Box>
                          <img src="https://i.ibb.co/nQVbCkf/image.png" alt="hello there" height="70px" width="70px" />
                        </Box>
                        <Stack direction="column" sx={{}} >
                          <Typography sx={{ fontWeight: 600, fontSize: 20, fontFamily: "poppins" }} > Adverse Habit </Typography>
                          <Typography sx={{ color: "#6A707F", fontFamily: "poppins" }} > Chainsmoker </Typography>
                        </Stack>
                      </Stack>
                    </Grid>

                  </Grid>
                </Paper>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 3,
                  }}
                >
                  <Box sx={{ fontSize: 20, fontWeight: 700, p: 1, display: "flex", width: "100%", justifyContent: 'space-between' }}>
                    Uploaded Files :
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: 'rgb(0,87,57)',
                        backgroundColor: '#005739',
                        color: 'white',
                        boxShadow: 'none',
                        width: "30%",
                        borderRadius: 3,
                        ml: 4,
                        py: 1
                      }}
                      onClick={() => navigate('mri')}
                    >
                      MRI VIEWER
                    </Button>
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
