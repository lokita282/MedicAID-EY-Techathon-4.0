import React from 'react'
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

const SinglePatientPage = () => {

    const diagnoses = [1, 2, 3, 4]

    return (
        <SideDrawer>
            <Paper sx={{ p: 2, borderRadius: 3, boxShadow : 4 }} >
                <Box sx={{ display: "flex", flexDirection: "row ", justifyContent: "space-between", alignItems: "center" }} >
                    <Stack direction="row" spacing={6} sx={{ alignItems: "center" }}>
                        <Avatar sx={{ width: 60, height: 60, bgcolor: deepPurple[500] }} >P</Avatar>
                        <Box sx={{ fontWeight: "bold", fontSize: 22 }}  > Patient's Name </Box>
                    </Stack>
                    <Box sx={{ color: "#989898", fontWeight: 600, fontSize: 17 }}>
                        Scheduled Visit :
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} > </Divider>
                <Grid container direction={'row'} spacing={3} >

                    <Grid item xs={4}>
                        <Paper sx={{ boxShadow : "none", p: 2, backgroundColor: "#FAFAFA", height : 600, borderRadius : 3 }} >
                            <Box sx={{textAlign : "center", fontWeight: 550}}> Date</Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={8} sx={{ pr: 6 }} >
                        <Paper sx={{ boxShadow: "none", p: 2, display: "flex", flexDirection: "column" }} >
                            <Box sx={{ fontSize: 20, fontWeight: 600 }} >
                                Patient Demographics:
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <Stack direction="column" spacing={1}>
                                    <Box > Age: </Box>
                                    <Box > Gender: </Box>
                                </Stack>
                                <Stack direction="column" spacing={1}>
                                    <Box > Height: </Box>
                                    <Box > Weight: </Box>
                                </Stack><Stack direction="column" spacing={1}>
                                    <Box > Address: </Box>
                                    <Box > Contact: </Box>
                                </Stack>
                            </Box>
                            <Stack direction="row" spacing={3} sx={{ mt: 4, alignItems: 'center' }}>
                                <Box sx={{ fontSize: 20, fontWeight: 600 }} >
                                    Symptoms:
                                </Box>
                                <Box> List of Symptoms </Box>
                            </Stack>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }} >
                                <Box sx={{ fontSize: 20, fontWeight: 600 }} >
                                    Possible Differential Diagnoses:
                                </Box>
                                <Button variant="outlined" sx={{ borderColor: "rgb(0,87,57)", color: "rgb(0,87,57)", boxShadow: "none" }}>
                                    <Box sx={{ fontWeight: 20 }} > View Files </Box>
                                </Button>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                {diagnoses.map((d) => (
                                    <Box key={d} direction="column" sx={{ boxShadow: 1, borderRadius: 4, mt : 2 }}>
                                        <Box sx={{ backgroundColor: "#EAEAEA", px: 2, py: 1, borderTopLeftRadius: 14, borderTopRightRadius: 14, fontWeight: "bold" }} > Flu </Box>
                                        <Box sx={{ px: 2, py: 1, borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }} > Description</Box>
                                        <Stack direction="row" spacing={2} sx={{ px: 1, py: 1 }} >
                                            <Chip label="Value 1" />
                                            <Chip label="Most Probable" sx={{ color: "rgb(74,177,102)", backgroundColor: "rgba(74,177,102,0.2)" }} />
                                        </Stack>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </SideDrawer>
    )
}

export default SinglePatientPage