import React, { useState } from "react";
import SideDrawer from "../../components/sidebar/Sidebar";
import dayjs from "dayjs";
//MUI Imports
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router";

import load from "../../images/presLoading.gif";
import Typography from "@mui/material/Typography";

const ViewPrescription = () => {
  const navigate = useNavigate();
  const [startValue, setStartValue] = useState(dayjs("2024-1-24T15:30"));
  const [endValue, setEndValue] = useState(dayjs("2024-1-24T16:30"));
  return (
    <SideDrawer>
      <Grid container spacing={2} direction="row">
        <Grid item xs={5}>
          <Paper
            sx={{
              height: "100%",
              width: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
            }}>
            <img
              src={load}
              alt="load"
              style={{ height: "20vh", width: "10vw" }}
            />
            <Box>
              Please wait till your prescription is generated. Thank you!
            </Box>
            <Box>You can view it on the dashbord when its ready </Box>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              widht: "100%",
            }}>
            <Typography
              color="initial"
              sx={{
                fontFamily: "Poppins",
                fontSize: 24,
                fontWeight: "600",
                ml: 5,
                mt: 5,
              }}>
              Schedule Followup Appointment
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 16,
                  fontWeight: "400",
                  mt: 1,
                  mb: 2,
                }}>
                Based on the video consultation, the next appointment suggested
                by the doctor is a week from now.
              </Typography>
            </Typography>
            <Box
              sx={{
                display: "flex",
                height: "70%",
                width: "auto",
                flexDirection: "row",
                justifyContent: "space-between",
                pr: 5,
                ml: 5,
              }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDateTimePicker
                  orientation="potrait"
                  label="Start Time"
                  value={startValue}
                  onChange={(newValue) => setStartValue(newValue)}
                />
                <StaticDateTimePicker
                  orientation="potrait"
                  label="End Time"
                  value={endValue}
                  onChange={(newValue) => setEndValue(newValue)}
                />
              </LocalizationProvider>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
              }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  navigate("/");
                }}
                sx={{
                  width: 100,
                  borderRadius: 2,
                  background: "var(--Activ, #005739)",
                  boxShadow: "0px 2px 5px 2px rgba(2, 92, 92, 0.15)",
                }}
                endIcon={<ArrowForwardIosIcon />}>
                Next
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </SideDrawer>
  );
};

export default ViewPrescription;
