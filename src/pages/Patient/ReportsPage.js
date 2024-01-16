import React from "react";
import SideDrawer from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";

import SwipeableEdgeDrawer from "../../components/drawer/Drawer";

import { ButtonBase } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import calLogo from "../../images/calendar.png";
import { parse } from "date-fns";
import { df_jc_ac, textField } from "../../theme/CssMy";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Icon } from "@iconify/react";

import {
  getDoctorsInteractedWith,
  getPastAppointments,
  getPatientProfile,
  getUpcomingAppointments,
  uploadGeneralReport,
} from "../../services/patientService";
import AppointmentModal from "../../components/aptModal/AppointmentModal";
import Dropzone from "../../components/dropzone/Dropzone";
import PatientProfile from "../../components/patientProfile/PatientProfile";
import Loading from "../../components/loader/Loading";

export default function Reports() {
  let subtitle;
  const [aptLoading, setAptLoading] = useState(false);
  const [patLoading, setPatLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [intdoctors, setIntdoctors] = useState([{}]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [meetingLink, setMeetingLink] = useState("");
  const [patientDetails, setPatientDetails] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const docs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  const [presOpen, setPresOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePresOpen = () => setPresOpen(true);
  const handlePresClose = () => setPresOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    // height: "75vh",
    bgcolor: "background.paper",
    border: "0px solid #fff",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const presStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#FAFAFA",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };

  const handleFileUpload = (fileObj) => {
    console.log("Upload");
    console.log(fileObj);
    let formdata = new FormData();
    for (let i = 0; i < fileObj.length; i++) {
      formdata.append("generalReports", fileObj[i], fileObj[i].name);
    }
    console.log("Data:", formdata);
    const func = async () => {
      await uploadGeneralReport(formdata).then((res) => {
        console.log(res);
      });
    };
    func();
  };

  useEffect(() => {
    setAptLoading(true);
    setPatLoading(true);
    const func = async () => {
      await getDoctorsInteractedWith().then((res) => {
        setIntdoctors(res.data.doctors);
      });
      setAptLoading(false);
    };
    const profile = async () => {
      await getPatientProfile().then((res) => {
        if (res.data.success) {
          console.log(res.data.data.patientDemographics);
          setPatientDetails(res.data.data);
        }
      });
      setPatLoading(false);
    };
    const appointment = async () => {
      await getUpcomingAppointments().then((res) => {
        console.log(res.data);
        setAppointments(res.data.appointments);
      });
    };
    const pastAppointment = async () => {
      await getPastAppointments().then((res) => {
        console.log(res.data);
        setPastAppointments(res.data.appointments);
      });
    };
    func();
    profile();
    appointment();
    pastAppointment();
  }, []);

  var prevEnable = 0;
  if (page !== 1) {
    prevEnable = 2;
  } else {
    prevEnable = 0;
  }

  var nextEnable = 0;
  if (page + 5 > intdoctors?.length) {
    nextEnable = 0;
  } else {
    nextEnable = 2;
  }

  const handleNext = (value) => {
    if (value < intdoctors?.length) {
      setPage(value + 5);
    }
  };
  const handlePrev = (value) => {
    if (value > 5) {
      setPage(value - 5);
    }
  };

  const TypoDetails = ({ icon, item, value }) => {
    return (
      <Box
        sx={{
          my: 0.5,
          display: "flex",
          flexDirection: "row",
          width: "100%",
          paddingLeft: 1,
        }}>
        <Icon
          icon={icon}
          // icon="material-symbols:home-rounded"
          color="#005739"
          width="40"
          height="40"
          sx={{ marginRight: 30, paddingTop: 1 }}
        />
        {/* {console.log(value[0])} */}
        <TextField
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          label={item}
          sx={{ ...textField, marginLeft: 2 }}
          // defaultValue={value ? value[0]?.toUpperCase() + value?.substring(1): ''}
          defaultValue={value}
          fullWidth
          name="medicine"
          // onChange={handleChange}
          placeholder=""
          multiline
          maxRows={3}
        />
        {/* <Typography
          sx={{
            display: 'flex',
            flexDirection: 'row',
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontWeight: 600,
            paddingRight: 1
          }}
        >
         <b> {item}: </b>
          <Typography
            sx={{
              // fontWeight: "bold",
              fontWeight: 400,
              color: '#005739',
              fontFamily: 'Poppins',
              marginLeft: 1,
            }}
          >
            {value}
          </Typography>
        </Typography> */}
      </Box>
    );
  };

  return (
    <>
      {/* <SideDrawer> */}
      <SwipeableEdgeDrawer />

      <Grid container spacing={2} direction={"row"}>
        <Grid item xs={12} md={7}>
          {/* <Box
            sx={{
              height: "auto",
              width: "50vw",
              marginTop: "2rem",
            }}> */}
          <Grid container spacing={1} direction={"column"}>
            <Grid item xs={4}>
              <Paper sx={{ px: 3, py: 2, borderRadius: 3 }}>
                {aptLoading ? (
                  <Box sx={{ ...df_jc_ac, height: "80vh" }}>
                    <Loading />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "space-between",
                      // marginBottom: 2,
                    }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontVariantNumeric: "lining-nums tabular-nums",
                        fontFamily: "Poppins",
                        fontSize: 18,
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "normal",
                      }}>
                      Past Appointments
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "65px",
                        height: "40px",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      <Box
                        onClick={() => {
                          prevEnable !== 0
                            ? handlePrev(page)
                            : console.log("already on first page");
                        }}
                        sx={{
                          borderRadius: 5,
                          width: 30,
                          height: 30,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          transition: "0.3s",
                          ":hover": {
                            boxShadow: prevEnable,
                          },
                        }}>
                        <Box sx={{ width: "auto" }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="16"
                            viewBox="2 -2 13 14"
                            fill="none">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M8.40436 1.54604C8.732 1.2031 9.27963 1.2031 9.60727 1.54604C9.91443 1.86755 9.91443 2.37377 9.60727 2.69528L5.44384 7.05313L9.60727 11.411C9.91443 11.7325 9.91443 12.2387 9.60727 12.5602C9.27963 12.9032 8.732 12.9032 8.40436 12.5602L3.14297 7.05313L8.40436 1.54604Z"
                              fill={prevEnable === 0 ? "#AFAFAF" : "black"}
                            />
                          </svg>
                        </Box>
                      </Box>
                      <Box
                        onClick={() => {
                          nextEnable !== 0
                            ? handleNext(page)
                            : console.log("already on last page");
                        }}
                        sx={{
                          borderRadius: 5,
                          width: 30,
                          height: 30,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          transition: "0.3s",
                          ":hover": {
                            boxShadow: nextEnable,
                          },
                        }}>
                        <Box sx={{ width: "auto" }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="16"
                            viewBox="2 -2 13 14"
                            fill="none">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5.23431 1.54604C4.90667 1.2031 4.35905 1.2031 4.03141 1.54604C3.72424 1.86755 3.72424 2.37377 4.03141 2.69528L8.19483 7.05313L4.03141 11.411C3.72424 11.7325 3.72424 12.2387 4.03141 12.5602C4.35905 12.9032 4.90667 12.9032 5.23431 12.5602L10.4957 7.05313L5.23431 1.54604Z"
                              fill={nextEnable === 0 ? "#AFAFAF" : "black"}
                            />
                          </svg>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
                <Grid container spacing={1} wrap="nowrap" direction={"row"}>
                  {pastAppointments?.slice(page - 1, page + 4).map((apt) => {
                    let dateString = apt?.start.slice(0, 10);
                    console.log(dateString);
                    return (
                      <>
                        <Modal
                          open={presOpen}
                          onClose={handlePresClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description">
                          <Box sx={presStyle}>
                            <Box
                              id="modal-modal-title"
                              sx={{
                                fontSize: 20,
                                fontWeight: "bold",
                                my: 1,
                              }}>
                              Appointment Prescription
                            </Box>

                            <img
                              src={`data:image/jpeg;base64,${apt?.prescription}`}
                              height="100%"
                              width="100%"
                              alt="prescription"
                            />
                          </Box>
                        </Modal>
                        <Grid item key={apt} xs={3}>
                          <Paper
                            sx={{
                              borderRadius: 2,
                              m: 1,
                              height: 120,
                              width: 200,
                              display: "flex",
                              p: 1,
                              flexDirection: "column",
                              // justifyContent: "space-around",
                            }}>
                            <Typography
                              sx={{
                                p: 0.5,
                                fontFamily: "Poppins",
                                fontSize: 16,
                                fontStyle: "semi-bold",
                                fontWeight: 600,
                                lineHeight: "normal",
                                textAlign: "left",
                              }}>
                              {apt?.title}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                              }}>
                              {/* <img
                                  src={calLogo}
                                  alt="cal"
                                  style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 40,
                                  }}
                                /> */}
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-around",
                                  alignItems: "flex-start",
                                  marginLeft: 1,
                                  marginTop: 0.5,
                                }}>
                                <Typography
                                  sx={{
                                    color: "rgba(100, 100, 100, 0.8)",
                                    fontFamily: "Poppins",
                                    fontSize: 14,
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "normal",
                                    textAlign: "left",
                                  }}>
                                  Date: {apt?.start.slice(5, 11)}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontFamily: "Poppins",
                                    fontSize: 12,
                                    fontStyle: "light",
                                    fontWeight: 500,
                                    lineHeight: "normal",
                                  }}>
                                  Symptoms:
                                </Typography>
                                <Typography
                                  sx={{
                                    fontFamily: "Poppins",
                                    fontSize: 12,
                                    fontStyle: "light",
                                    fontWeight: 500,
                                    lineHeight: "normal",
                                  }}>
                                  {" "}
                                  {apt?.symptoms.map((symptom, idx) => {
                                    return symptom + " ";
                                  })}
                                </Typography>
                              </Box>
                              {/* <Typography>
                                    {apt?.start.slice(11, 16)} -{" "}
                                    {apt?.end.slice(11, 16)}
                                  </Typography> */}
                              <Box
                                onClick={(e) => {
                                  e.preventDefault();
                                  // console.log(apt);
                                  handlePresOpen();
                                }}
                                sx={{
                                  borderRadius: 40,
                                  bgcolor: "#D0E0D9",
                                  width: 40,
                                  height: 40,
                                  marginRight: 1,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  display: "flex",
                                  ":hover": {
                                    boxShadow: "1",
                                    transition: "0.3s",
                                  },
                                }}>
                                <InsertDriveFileIcon
                                  style={{
                                    width: 25,
                                    height: 25,
                                    color: "#005739",
                                  }}
                                />
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{ px: 3, py: 2, borderRadius: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "space-between",
                    // marginBottom: 2,
                  }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontVariantNumeric: "lining-nums tabular-nums",
                      fontFamily: "Poppins",
                      fontSize: 18,
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}>
                    Upcoming Appointments
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "65px",
                      height: "40px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <Box
                      onClick={() => {
                        prevEnable !== 0
                          ? handlePrev(page)
                          : console.log("already on first page");
                      }}
                      sx={{
                        borderRadius: 5,
                        width: 30,
                        height: 30,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "0.3s",
                        ":hover": {
                          boxShadow: prevEnable,
                        },
                      }}>
                      <Box sx={{ width: "auto" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="16"
                          viewBox="2 -2 13 14"
                          fill="none">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.40436 1.54604C8.732 1.2031 9.27963 1.2031 9.60727 1.54604C9.91443 1.86755 9.91443 2.37377 9.60727 2.69528L5.44384 7.05313L9.60727 11.411C9.91443 11.7325 9.91443 12.2387 9.60727 12.5602C9.27963 12.9032 8.732 12.9032 8.40436 12.5602L3.14297 7.05313L8.40436 1.54604Z"
                            fill={prevEnable === 0 ? "#AFAFAF" : "black"}
                          />
                        </svg>
                      </Box>
                    </Box>
                    <Box
                      onClick={() => {
                        nextEnable !== 0
                          ? handleNext(page)
                          : console.log("already on last page");
                      }}
                      sx={{
                        borderRadius: 5,
                        width: 30,
                        height: 30,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "0.3s",
                        ":hover": {
                          boxShadow: nextEnable,
                        },
                      }}>
                      <Box sx={{ width: "auto" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="16"
                          viewBox="2 -2 13 14"
                          fill="none">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.23431 1.54604C4.90667 1.2031 4.35905 1.2031 4.03141 1.54604C3.72424 1.86755 3.72424 2.37377 4.03141 2.69528L8.19483 7.05313L4.03141 11.411C3.72424 11.7325 3.72424 12.2387 4.03141 12.5602C4.35905 12.9032 4.90667 12.9032 5.23431 12.5602L10.4957 7.05313L5.23431 1.54604Z"
                            fill={nextEnable === 0 ? "#AFAFAF" : "black"}
                          />
                        </svg>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    height: "auto",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marignTop: 1,
                  }}>
                  {appointments == null ? (
                    <Typography
                      sx={{
                        color: "#A7A7A7",
                        fontFamily: "Poppins",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                        marginTop: 1,
                      }}>
                      You have no upcoming appointments, make a new appointment
                      to view it here
                    </Typography>
                  ) : (
                    <Box sx={{ display: "flex", height: "auto" }}>
                      {appointments.map((apt) => {
                        let dateString = apt?.start.slice(0, 10);
                        console.log(dateString);
                        // console.log("Parsed date", parsedDate);
                        return (
                          <ButtonBase
                            sx={{
                              borderRadius: 2,
                              backgroundColor: "#fff",
                              transition:
                                "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                              boxShadow:
                                "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                              color: "rgba(0, 0, 0, 0.87)",
                              m: 1,
                              height: 120,
                              width: 200,
                              display: "flex",
                              p: 1,
                              flexDirection: "column",
                              justifyContent: "space-around",
                              alignItems: "flex-start",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              // console.log(apt);
                              window.location.href = `${apt?.meetingId}`;
                            }}>
                            <Typography
                              sx={{
                                p: 0.5,
                                fontFamily: "Poppins",
                                fontSize: 16,
                                fontStyle: "semi-bold",
                                fontWeight: 600,
                                lineHeight: "normal",
                                marginLeft: 0.5,
                              }}>
                              {apt?.title}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                paddingRight: 0.5,
                              }}>
                              <img
                                src={calLogo}
                                alt="cal"
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 40,
                                }}
                              />
                              <Box
                                sx={{
                                  marginLeft: 1,
                                  textAlign: "left",
                                  justifyContent: "flex-start",
                                  alignItems: "flex-start",
                                }}>
                                <Typography
                                  sx={{
                                    p: 0.5,
                                    color: "rgba(100, 100, 100, 0.8)",
                                    fontFamily: "Poppins",
                                    fontSize: 12,
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "normal",
                                  }}>
                                  Date: {apt?.start.slice(5, 11)}
                                </Typography>
                                <Typography>
                                  {apt?.start.slice(11, 16)} -{" "}
                                  {apt?.end.slice(11, 16)}
                                </Typography>
                              </Box>
                            </Box>
                          </ButtonBase>
                        );
                      })}
                    </Box>
                  )}
                  <AppointmentModal
                    open={open}
                    handleClose={handleClose}
                    style={style}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                    setMeetingLink={setMeetingLink}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      height: 100,
                      marignTop: 1,
                      justifyContent: "flex-end",
                      alignItems: "end",
                    }}>
                    <Box
                      sx={{
                        padding: 1,
                        marginRight: -1,
                        borderRadius: 50,
                        height: 48,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 48,
                        ":hover": {
                          boxShadow: "1",
                          transition: "0.3s",
                        },
                      }}
                      onClick={handleOpen}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 44 45"
                        fill="none">
                        <path
                          d="M38.5 11.7686V18.9186C35.6532 17.4643 32.4187 16.9494 29.261 17.4478C26.1033 17.9462 23.1848 19.4324 20.9243 21.6928C18.6638 23.9533 17.1777 26.8719 16.6792 30.0296C16.1808 33.1873 16.6957 36.4217 18.15 39.2686H6.875C5.05164 39.2686 3.30295 38.5442 2.01364 37.2549C0.724328 35.9656 0 34.2169 0 32.3936V11.7686H38.5ZM31.625 0.768555C33.4484 0.768555 35.197 1.49288 36.4864 2.7822C37.7757 4.07151 38.5 5.82019 38.5 7.64355V9.01855H0V7.64355C0 5.82019 0.724328 4.07151 2.01364 2.7822C3.30295 1.49288 5.05164 0.768555 6.875 0.768555H31.625ZM44 32.3936C44 35.6756 42.6962 38.8232 40.3754 41.144C38.0547 43.4648 34.9071 44.7686 31.625 44.7686C28.3429 44.7686 25.1953 43.4648 22.8746 41.144C20.5538 38.8232 19.25 35.6756 19.25 32.3936C19.25 29.1115 20.5538 25.9639 22.8746 23.6431C25.1953 21.3223 28.3429 20.0186 31.625 20.0186C34.9071 20.0186 38.0547 21.3223 40.3754 23.6431C42.6962 25.9639 44 29.1115 44 32.3936ZM33 26.8936C33 26.5289 32.8551 26.1791 32.5973 25.9213C32.3394 25.6634 31.9897 25.5186 31.625 25.5186C31.2603 25.5186 30.9106 25.6634 30.6527 25.9213C30.3949 26.1791 30.25 26.5289 30.25 26.8936V31.0186H26.125C25.7603 31.0186 25.4106 31.1634 25.1527 31.4213C24.8949 31.6791 24.75 32.0289 24.75 32.3936C24.75 32.7582 24.8949 33.108 25.1527 33.3658C25.4106 33.6237 25.7603 33.7686 26.125 33.7686H30.25V37.8936C30.25 38.2582 30.3949 38.608 30.6527 38.8658C30.9106 39.1237 31.2603 39.2686 31.625 39.2686C31.9897 39.2686 32.3394 39.1237 32.5973 38.8658C32.8551 38.608 33 38.2582 33 37.8936V33.7686H37.125C37.4897 33.7686 37.8394 33.6237 38.0973 33.3658C38.3551 33.108 38.5 32.7582 38.5 32.3936C38.5 32.0289 38.3551 31.6791 38.0973 31.4213C37.8394 31.1634 37.4897 31.0186 37.125 31.0186H33V26.8936Z"
                          fill="#005739"
                        />
                      </svg>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{ px: 3, py: 2, borderRadius: 3 }}>
                {/* <Typography
                  sx={{
                    color: "#000",
                    fontVariantNumeric: "lining-nums tabular-nums",
                    fontFamily: "Poppins",
                    fontSize: 19.287,
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}>
                  Upload Documents
                </Typography> */}
                <Dropzone
                  text="Upload your documents"
                  onButtonClick={handleFileUpload}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          {/* <Box sx={{ ...df_jc_ac, height: '80vh' }}> */}
          <Paper sx={{ px: 3, py: 2, borderRadius: 3 }}>
            {/* <PatientProfile patientName={patientDetails} /> */}
            {patLoading ? (
              <Box sx={{ ...df_jc_ac, height: "80vh" }}>
                <Loading />
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100% !important",
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "space-around",
                  alignItems: "center",
                  height: "80vh",
                }}>
                <Box
                  sx={{
                    width: "100% !important",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // height: '80vh',
                  }}>
                  <Typography
                    sx={{
                      color: "#005739",
                      fontWeight: "bold",
                      fontSize: 22,
                      fontFamily: "Poppins",
                      marginBottom: 1,
                    }}>
                    Profile
                  </Typography>
                  <Box sx={{ paddingTop: 1, marginLeft: "auto" }}>
                    <Icon
                      icon="ri:edit-fill"
                      color="#005739"
                      width="35"
                      height="35"
                    />
                  </Box>
                </Box>
                <Avatar
                  sx={{
                    width: 150,
                    height: 150,
                    marginBottom: 5,
                  }}
                  alt={patientDetails?.name}
                  src="../../images/Avatar.png"
                />
                <TypoDetails
                  item="Name"
                  value={patientDetails?.name}
                  icon="wpf:name"
                />
                <TypoDetails
                  item="Gender"
                  value={patientDetails?.patientDemographics?.gender}
                  icon="ph:gender-intersex-fill"
                />
                <TypoDetails
                  item="Age"
                  value={patientDetails?.patientDemographics?.age}
                  icon="game-icons:ages"
                />
                <TypoDetails
                  item="Height"
                  value={patientDetails?.patientDemographics?.height}
                  icon="game-icons:body-height"
                />
                <TypoDetails
                  item="Weight"
                  value={patientDetails?.patientDemographics?.weight}
                  icon="game-icons:weight"
                />
                <TypoDetails
                  item="Address"
                  value={patientDetails?.patientDemographics?.address}
                  icon="mdi:address-marker"
                />
              </Box>
            )}
          </Paper>
          {/* </Box> */}
        </Grid>
      </Grid>
      {/* </SideDrawer> */}
    </>
  );
}
