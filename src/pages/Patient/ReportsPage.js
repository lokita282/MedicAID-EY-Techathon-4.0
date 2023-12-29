import React from "react";
import SideDrawer from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";

import SwipeableEdgeDrawer from "../../components/drawer/Drawer";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Pagination from "@mui/material/Pagination";
export default function Reports() {
  const [page, setPage] = useState(1);
  var pageEnable = 0;
  if (page !== 1) {
    pageEnable = 2;
  } else {
    pageEnable = 0;
  }
  const handleNext = (value) => {
    setPage(value + 1);
  };
  const handlePrev = (value) => {
    setPage(value - 1);
  };
  const doctors = [1, 2, 3, 4, 5];

  return (
    <SideDrawer>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "#005739", fontFamily: "Poppins" }}>
        Hi, Patient Name
      </Typography>
      <SwipeableEdgeDrawer />
      <Box
        sx={{
          height: "auto",
          width: "50vw",
          marginTop: "2rem",
        }}>
        <Grid container spacing={2} direction={"column"}>
          <Grid item xs={4}>
            <Paper sx={{ px: 3, py: 2, borderRadius: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "space-between",
                  marginBottom: 2,
                }}>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "Poppins", marginBottom: "1rem" }}>
                  Doctors you interacted with
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
                      pageEnable !== 0
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
                        boxShadow: pageEnable,
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
                          fill={pageEnable === 0 ? "#AFAFAF" : "black"}
                        />
                      </svg>
                    </Box>
                  </Box>
                  <Box
                    onClick={() => {
                      handleNext(page);
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
                        boxShadow: 2,
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
                          fill="black"
                        />
                      </svg>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Grid container spacing={2} wrap="nowrap" direction={"row"}>
                {doctors?.map((dc) => (
                  <Grid item key={dc} xs={3}>
                    <Box>
                      <Stack
                        direction="column"
                        // spacing={1}
                        sx={{ alignItems: "center" }}>
                        <Avatar
                          sx={{
                            width: 75,
                            height: 75,
                            marginBottom: "1rem",
                          }}
                          alt="Remy Sharp"
                          src="../../images/Avatar.png"
                        />
                        <Typography
                          sx={{
                            color: "#000",
                            fontFamily: "Poppins",
                            fontSize: 15.78,
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "normal",
                          }}>
                          Doctor's Name
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                          <Box
                            sx={{
                              px: "2px",
                              height: "100%",
                              width: "100%",
                            }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none">
                              <path
                                d="M10.6053 8.72413C10.6053 10.0208 9.61176 11.0686 8.38224 11.0686C7.15273 11.0686 6.15918 10.0208 6.15918 8.72413C6.15918 7.42746 7.15273 6.37964 8.38224 6.37964C9.61176 6.37964 10.6053 7.42746 10.6053 8.72413Z"
                                stroke="#666666"
                                stroke-width="1.31499"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M8.38281 14.1401C10.5748 14.1401 12.6178 12.778 14.0398 10.4204C14.5987 9.49698 14.5987 7.9449 14.0398 7.02151C12.6178 4.66392 10.5748 3.30176 8.38281 3.30176C6.19079 3.30176 4.14781 4.66392 2.72579 7.02151C2.16692 7.9449 2.16692 9.49698 2.72579 10.4204C4.14781 12.778 6.19079 14.1401 8.38281 14.1401Z"
                                stroke="#666666"
                                stroke-width="1.31499"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </Box>
                          <Typography
                            sx={{
                              color: "#666",
                              fontFamily: "Poppins",
                              fontSize: 11.397,
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "normal",
                            }}>
                            Prescription
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </SideDrawer>
  );
}
