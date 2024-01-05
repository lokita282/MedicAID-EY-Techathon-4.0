import React, { useState, useEffect } from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField";
import Dropzone from "../../components/dropzone/Dropzone"
import {
  textField,
} from '../../theme/CssMy'

import { getPrescriptionData, getPrescriptionImage } from '../../services/doctorService'
import Loading from '../../components/loader/Loading'
import { Buffer } from 'buffer';
// import { getPrescriptionImage } from './../../services/doctorService';

const PrescriptionPage = () => {

  const patientData = JSON.parse(localStorage.getItem('eyPatient'))
  // console.log(patientData);

  const doctorData = JSON.parse(localStorage.getItem('eyUser'))
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const [prescriptionData, setPrescriptionData] = useState()
  const [json, setJson] = useState({
    "name": patientData.name,
    "age": patientData.patientDemographics.age.toString(),
    "gender": patientData.patientDemographics.gender,
    "weight": patientData.patientDemographics.weight,
    "demographics": [patientData.patientDemographics.gender, patientData.patientDemographics.height,
    patientData.patientDemographics.age.toString(), patientData.patientDemographics.weight],
    "disease": ["Breast Cancer"]
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setJson({ ...json, [name]: value })
  }

  useEffect(() => {
    setLoading(true)
    const func = () => {
      getPrescriptionData(json).then((res) => {
        // console.log(res)
        setPrescriptionData(res.data)
      })
      setLoading(false)
    }
    func()
  }, [])

  return (
    <SideDrawer>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper sx={{ height: "100%", borderRadius: 3 }}>
            <img src={"data:image/png;base64," + image} height="100%" width="100%" alt="" />

          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2} direction="column">
            <Grid item xs={6}>
              <Dropzone></Dropzone>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Box sx={{ fontWeight: 500, fontSize: 25, mb: 2, }}>
                  Proposed Plan
                </Box>

                <TextField
                  variant='outlined'
                  label="Diet Plan"
                  sx={textField}
                  value={`Food to Eat : ${prescriptionData?.diet_plan.food_to_eat.map((item) => (item))} 
Food to Avoid : ${prescriptionData?.diet_plan.food_to_avoid.map((item) => (item))} 
                  `}
                  name="diet_plan"
                  // onChange={handleChange}
                  placeholder=""
                  multiline
                  maxRows={4}
                />
                <TextField
                  variant='outlined'
                  label="Exercise Plan"
                  sx={textField}
                  value={`${prescriptionData?.exercise_plan.map((item) => (item))}`}
                  name="exercise_plan"
                  // onChange={handleChange}
                  placeholder=""
                  multiline
                  maxRows={2}
                />
                <TextField
                  variant='outlined'
                  label="Precautions"
                  sx={textField}
                  value={`${prescriptionData?.precautions.map((item) => (item))}`}
                  name="precautions"
                  // onChange={handleChange}
                  placeholder=""
                  multiline
                  maxRows={4}
                />
                <TextField
                  variant='outlined'
                  label="Remarks (Optional)"
                  sx={textField}
                  // value={json.email}
                  name="remarks"
                // onChange={handleChange}
                // placeholder="Remarks (optional)"
                />
                <Box sx={{ display: "flex", flexDirection: "row-reverse", mt: 1 }}>
                  <Button
                    onClick={() => {
                      getPrescriptionImage(
                        {
                          "name": patientData.name,
                          "age": patientData.patientDemographics.age.toString(),
                          "gender": patientData.patientDemographics.gender,
                          "weight": patientData.patientDemographics.weight,
                          "doctor_name": doctorData.name,
                          "diet_plan": prescriptionData.diet_plan,
                          "exercise_plan": prescriptionData.exercise_plan,
                          "precautions": prescriptionData.precautions,
                          "medicine": ""
                        }
                      ).then((res) => {
                        console.log(res)
                        let base64ImageString = Buffer.from(res.data, 'binary').toString('base64')
                        setImage(base64ImageString)
                      })
                    }}
                    variant='contained'
                    sx={{ py: 1, px: 2, borderRadius: 2, boxShadow: "none", backgroundColor: "rgb(0,87,57)" }}> Signature </Button>

                </Box>


              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SideDrawer>
  )
}

export default PrescriptionPage