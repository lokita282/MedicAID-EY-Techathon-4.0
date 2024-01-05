import React,{useState} from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField";
import Dropzone from "../../components/dropzone/Dropzone"
import {
  textField,
} from '../../theme/CssMy'

const PrescriptionPage = () => {
  const [json, setJson] = useState({
      "name": "Sarthak",
      "age": 21,
      "gender": "male",
      "weight": "56kg",
      "demographics": ["male", "21", "186cm", "56kg"],
      "disease": ["COVID-19"]
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setJson({ ...json, [name]: value })
  }

  return (
    <SideDrawer>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper sx={{ height: "100%", borderRadius : 3 }}>Hello</Paper>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={3} direction="column">
            <Grid item xs={6}>
              <Dropzone></Dropzone>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Box sx={{ fontWeight: 500, fontSize: 25, mb: 2, }}>
                  Diet Plan
                </Box>
                <TextField
                  sx={textField}
                  // value={json.email}
                  name="diet_plan"
                  // onChange={handleChange}
                  placeholder="Diet Plan"
                />
                <TextField
                  sx={textField}
                  // value={json.email}
                  name="exercise_plan"
                  // onChange={handleChange}
                  placeholder="Exercise Plan"
                />
                <TextField
                  sx={textField}
                  // value={json.email}
                  name="precautions"
                  // onChange={handleChange}
                  placeholder="Precautions"
                />
                <TextField
                  sx={textField}
                  // value={json.email}
                  name="remarks"
                  // onChange={handleChange}
                  placeholder="Remarks (optional)"
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SideDrawer>
  )
}

export default PrescriptionPage