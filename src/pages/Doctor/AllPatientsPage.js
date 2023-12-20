import React from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'

// MUI imports 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { deepOrange, deepPurple } from '@mui/material/colors';

// Images
import image_1 from "../../images/medicAID/patient_details.png"

export default function AllPatients() {

  const appointmentDetails = [1, 2, 3, 4]
  const patientDetails = [1, 2, 3, 4, 5, 6, 7]

  return (
    <SideDrawer>
      <Box>
        <Grid
          container
          spacing={3}
        >
          <Grid item xs={8} >
            <Grid container spacing={2} direction={"column"} >
              <Grid item xs={2}>
                <Paper sx={{ px: 3, py: 2, borderRadius: 3 }}>
                  <Grid container>

                    <Grid item xs={9}>
                      <Typography variant='h4' sx={{ fontWeight: "bold" }} >
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
                  <Grid container direction="column">
                    {patientDetails?.map((pd) => (
                      <Grid item key={pd} sx={{ mt: 2 }} >
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Box>
                            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                              <Avatar sx={{ width: 36, height: 36, bgcolor: deepPurple[500] }} >P</Avatar>
                              <Typography sx={{ fontWeight: "bold" }} > Patient's Name </Typography>
                            </Stack>
                          </Box>
                          <Typography>
                            Age, Sex
                          </Typography>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Button sx={{ backgroundColor: "rgba(0, 87, 57, 0.1)", color: "rgba(0,87,57,1)", mr: 10 }} >
                              CONSULTATION
                            </Button>
                            <Typography> Details {">"}</Typography>
                          </Box>
                        </Box>
                        <Divider sx={{ mt: 1 }} />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Paper sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 3,
              // boxShadow: 4
            }}>
              <Typography variant="h5" fontWeight="bold">
                Appointment Requests
              </Typography>
              <Divider sx={{ mt: 3 }} />

              <Grid container spacing={3} direction={"column"} >

                {appointmentDetails.map((ad) => (
                  <Grid item key={ad}>
                    <Box sx={{ mt: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={3} >
                          <Stack direction="row" spacing={2}>
                            <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }} >PR</Avatar>
                          </Stack>
                        </Grid>
                        <Grid item xs={9} sx={{ textAlign: "start", }}>
                          <Box sx={{ textAlign: "start", display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                            <Typography sx={{ fontWeight: "bold" }} >Name</Typography>
                            <Typography>Appointment Time</Typography>
                          </Box>
                          <Typography>Sex, Age</Typography>
                          <Typography>Treatment Type</Typography>
                          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mt: 1 }}>
                            <Button sx={{ boxShadow: "none", width: "45%", backgroundColor: "rgba(74, 177, 102, 0.4)", color: "rgb(74,177,102)", fontWeight: "bold" }} variant="contained" >Accept</Button>
                            <Button sx={{ boxShadow: "none", width: "45%", backgroundColor: "rgb(255,225,224)", color: "rgb(254,110,111)", fontWeight: "bold" }} variant="contained" >Reject</Button>

                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>

                ))}

              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </SideDrawer>
  )
}
