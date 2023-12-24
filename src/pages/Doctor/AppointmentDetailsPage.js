import {React, useState, useEffect} from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'

//MUI Imports
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import { deepOrange, deepPurple } from '@mui/material/colors';

//Integration imports
import {getSingleAppointmentDetails} from '../../services/doctorService'

const SinglePatientPage = () => {
  const [loading, setLoading] = useState(false)
  const [appointment, setAppointment] = useState()
  const id = window.location.href.split('/')[4]

    useEffect(() => {
      setLoading(true)
      const func = async () => {
        await getSingleAppointmentDetails(id).then((res) => {
          console.log(res.data.appointment)
          setAppointment(res.data.appointment)
        })
        setLoading(false)
      }
      func()
    }, [])

    const diagnoses = [1, 2, 3, 4]

    return (
      <SideDrawer>
        {appointment ? (
          <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 4, maxWidth: '80%', margin: 'auto' }}>
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
            <Grid container direction={'row'} spacing={3} alignItems="center" justifyContent="center">
              {/* <Grid item xs={4}>
                <Paper
                  sx={{
                    boxShadow: 'none',
                    p: 2,
                    backgroundColor: '#FAFAFA',
                    height: 600,
                    borderRadius: 3,
                  }}
                >
                  <Box sx={{ textAlign: 'center', fontWeight: 550 }}> Date</Box>
                </Paper>
              </Grid> */}

              <Grid item xs={12} sx={{ pr: 6 }}>
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
                      <Box> Age: {appointment.patientId.patientDemographics.age}</Box>
                      <Box> Gender: {appointment.patientId.patientDemographics.gender}</Box>
                    </Stack>
                    <Stack direction="column" spacing={1}>
                      <Box> Height: {appointment.patientId.patientDemographics.height}</Box>
                      <Box> Weight: {appointment.patientId.patientDemographics.weight}</Box>
                    </Stack>
                    <Stack direction="column" spacing={1}>
                      <Box> Address: {appointment.patientId.patientDemographics.address}</Box>
                      <Box> Contact: {appointment.patientId.contact}</Box>
                    </Stack>
                  </Box>
                  <Stack
                    direction="row"
                    spacing={3}
                    sx={{ mt: 4, alignItems: 'center' }}
                  >
                    <Box sx={{ fontSize: 20, fontWeight: 600 }}>Symptoms:</Box>
                    {appointment.symptoms.map((symptom) => {return (
                        <Box> {symptom} </Box>
                    )})}
                    
                  </Stack>
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
                    >
                      <Box sx={{ fontWeight: 20 }}> View Files </Box>
                    </Button>
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    {diagnoses.map((d) => (
                      <Box
                        key={d}
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
                          Flu
                        </Box>
                        <Box
                          sx={{
                            px: 2,
                            py: 1,
                            borderBottomLeftRadius: 14,
                            borderBottomRightRadius: 14,
                          }}
                        >
                          Description
                        </Box>
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{ px: 1, py: 1 }}
                        >
                          <Chip label="Value 1" />
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
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          'Loading...'
        )}
      </SideDrawer>
    )
}

export default SinglePatientPage