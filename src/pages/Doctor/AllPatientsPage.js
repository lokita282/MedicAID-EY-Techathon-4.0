import React from 'react'
import { useState, useEffect } from 'react';
import SideDrawer from '../../components/sidebar/Sidebar'
import Loading from '../../components/loader/Loading'
import { df_jc_ac } from '../../theme/CssMy'
import { Link } from 'react-router-dom'
// MUI imports 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { deepOrange, deepPurple } from '@mui/material/colors';
import PlayCircleFilledSharpIcon from '@mui/icons-material/PlayCircleFilledSharp';

import FuzzySearch from 'fuzzy-search';

// INTEGRATION IMPORTS
import { getUpcomingAppointments, getAllPatients } from '../../services/doctorService';
import { eycontext } from '../../context/MainContext'
import moment from "moment/moment"

// Images
import image_1 from "../../images/medicAID/patient_details.png"



export default function AllPatients() {



  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const [patientList, setPatientList] = useState(patients)

  useEffect(() => {
    setLoading(true)
    const func = async () => {
      await getAllPatients().then((res) => {
        setPatients(res.data.patients)
        setPatientList(res.data.patients)
      })
      setLoading(false)
    }
    func()
  }, [])

  useEffect(() => {
    setLoading(true)
    const func = async () => {
      await getUpcomingAppointments().then((res) => {
        // console.log(res.data.appointments)
        setAppointments(res.data.appointments)
      })
      setLoading(false)
    }
    func()
  }, [])

  const searcher = new FuzzySearch(patients, ['name'], {
    caseSensitive: false,
  });

  var date = '';
  // console.log(result);
  return (
    <SideDrawer>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <Grid container spacing={2} direction={'column'}>
              <Grid item xs={2}>
                <Paper sx={{ px: 3, py: 2, borderRadius: 3 }}>
                  <Grid container>
                    <Grid item xs={9}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 'bold',
                          paddingTop: '0.2em',
                          paddingLeft: '0.2em',
                        }}
                      >
                        View all patient details
                        <br />
                        below
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <CardMedia
                        component="img"
                        height="163"
                        image={image_1}
                        alt="Paella dish"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={10}>
                <Paper sx={{ px: 3, py: 2, borderRadius: 3 }}>
                  {/* <Autocomplete></Autocomplete>
                  
              */}
                  {/* <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={patients?.map((option) => option.name)}
                    renderInput={(params) => <TextField {...params} label="Search" />}
                  /> */}
                  <TextField
                    fullWidth
                    variant='outlined'
                    label='Search'
                    InputProps={{ sx: { borderRadius: 3, "&:focused": { border: "1px solid rgba(0,87,57,1)" } } }}
                    onChange={(e) => {
                      if (e.target.value.length > 0)
                        setPatientList(searcher.search(e.target.value))
                      else
                        setPatientList(patients)
                    }}
                  />
                  <Grid container direction="column">
                    {loading ? (
                      <Box sx={{ ...df_jc_ac }}>
                        <Loading />
                      </Box>
                    ) : (
                      patientList.map((patient) => (

                        <Grid item key={patient?._id} sx={{ mt: 2 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Box>
                              <Stack
                                direction="row"
                                spacing={2}
                                sx={{ alignItems: 'center' }}
                              >
                                <Avatar
                                  sx={{
                                    width: 36,
                                    height: 36,
                                    bgcolor: deepPurple[500],
                                  }}
                                >
                                  {patient?.name[0].toUpperCase()}
                                </Avatar>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                  {patient?.name[0].toUpperCase() +
                                    patient?.name.substring(1)}
                                </Typography>
                              </Stack>
                            </Box>
                            <Typography>
                              {patient.patientDemographics?.age},{' '}
                              {patient.patientDemographics?.gender[0].toUpperCase() +
                                patient.patientDemographics?.gender.substring(
                                  1
                                )}
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              {/* <Button
                                sx={{
                                  backgroundColor: 'rgba(0, 87, 57, 0.1)',
                                  color: 'rgba(0,87,57,1)',
                                  mr: 10,
                                }}
                              >
                                CONSULTATION
                              </Button> */}
                              <Link
                                style={{
                                  textDecoration: 'none',
                                  color: '#000000',
                                }}
                                to={`/patient_details/${patient?._id}`}
                              >
                                <Button variant="outlined" sx={{ border: "none", borderRadius: 2, color: 'rgba(0,87,57,1)', "&:hover": { border: "none" }, backgroundColor: "rgba(0,87,57,0.1)", }} endIcon={<PlayCircleFilledSharpIcon />}>
                                  Details
                                </Button>
                              </Link>
                            </Box>
                          </Box>
                          <Divider sx={{ mt: 1 }} />
                        </Grid>
                      ))
                    )}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                // boxShadow: 4
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Upcoming Appointments
              </Typography>
              <Divider sx={{ mt: 3 }} />

              <Grid container spacing={3} direction={'column'}>
                {loading ? (
                  <Box sx={{ ...df_jc_ac, height: '80vh' }}>
                    <Loading />
                  </Box>
                ) : (
                  appointments.map((patient) => (
                    <Grid item key={patient?._id}>
                      <Box sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={3}>
                            <Stack direction="row" spacing={2}>
                              <Avatar
                                sx={{
                                  width: 56,
                                  height: 56,
                                  bgcolor: deepOrange[500],
                                }}
                              >
                                {patient?.patientId.name[0].toUpperCase() +
                                  patient?.patientId.name[1].toUpperCase()}
                              </Avatar>
                            </Stack>
                          </Grid>
                          <Grid item xs={9} sx={{ textAlign: 'start' }}>
                            <Box
                              sx={{
                                textAlign: 'start',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Typography sx={{ fontWeight: 'bold' }}>
                                {patient?.patientId.name[0].toUpperCase() +
                                  patient?.patientId.name.substring(1)}
                              </Typography>
                              {/* {date !== "" ? new Date(patient?.start) : ""} */}
                              <Typography>{moment(patient?.start).format('lll')}</Typography>
                            </Box>
                            <Typography>
                              {patient.patientId.patientDemographics?.gender[0].toUpperCase() +
                                patient.patientId.patientDemographics?.gender.substring(
                                  1
                                )}
                              , {patient.patientId.patientDemographics?.age}
                            </Typography>
                            <Typography>
                              {' '}
                              {patient?.status[0].toUpperCase() +
                                patient?.status.substring(1)}{' '}
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                mt: 1,
                              }}
                            >
                              {/* <Button sx={{ boxShadow: "none", width: "45%", backgroundColor: "rgba(74, 177, 102, 0.4)", color: "rgb(74,177,102)", fontWeight: "bold" }} variant="contained" >Accept</Button>
                            <Button sx={{ boxShadow: "none", width: "45%", backgroundColor: "rgb(255,225,224)", color: "rgb(254,110,111)", fontWeight: "bold" }} variant="contained" >Reject</Button> */}
                              {patient._id ? (
                                <Link
                                  style={{
                                    textDecoration: 'none',
                                    color: '#000000',
                                  }}
                                  to={`/appointment_details/${patient?._id}`}
                                >
                                  <Button variant="outlined" sx={{ border: "none", borderRadius: 2, color: 'rgba(0,87,57,1)', "&:hover": { border: "none" }, backgroundColor: "rgba(0,87,57,0.1)", }} endIcon={<PlayCircleFilledSharpIcon />}>
                                    Details
                                  </Button>
                                </Link>
                              ) : (
                                ''
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  ))
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </SideDrawer>
  )
}
