import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SideDrawer from "../../components/sidebar/Sidebar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Type } from "@aws-sdk/client-transcribe";
const ReportSummaryPage = () => {
  const data = localStorage.getItem("report");
  const report = JSON.parse(data);
  const image = report["base64"];

  const summary = report["summary"];

  const style = {
    py: 0,
    width: "100%",
    maxWidth: 360,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  };
  var two = false;

  //format
  // let summary = [
  //   {
  //     name: "CHEM-SCREEN PANEL",
  //     result: "87 mg/dl",
  //     interpretation: "Within normal reference range.",
  //   },
  //   {
  //     name: "SODIUM",
  //     result: "140 mmol/L",
  //     interpretation: "Within normal reference range.",
  //   },
  //   {
  //     name: "URIC ACID",
  //     result: "10.0 mg/dL",
  //     interpretation: "High. May indicate gout or kidney disease.",
  //   },
  //   {
  //     name: "CHOLESTEROL",
  //     result: "41 mg/dL",
  //     interpretation: "Desirable. HDL cholesterol is low.",
  //   },
  //   {
  //     name: "TRIGLYCERIDES",
  //     result: "231 mg/dL",
  //     interpretation:
  //       "High. Consider lifestyle modifications or cholesterol-lowering medication.",
  //   },
  // ];
  summary?.length > 8 ? (two = true) : (two = false);
  var summary1 = [];
  var summary2 = [];
  if (two) {
    let n = Math.ceil(summary?.length / 2);
    summary1 = summary?.slice(0, n);
    summary2 = summary?.slice(n, summary?.length);
  }
  return (
    <SideDrawer>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Paper
            sx={{
              height: "80vh",
              width: "auto",
              display: "flex",
              justifyContent: "center",
              padding: 2,
              borderRadius: 3,
            }}>
            <img
              src={"data:image/png;base64," + image}
              height="100%"
              width="100%"
              alt=""
            />
          </Paper>
        </Grid>
        {two ? (
          <>
            <Grid item xs={3}>
              {summary1.map((sum) => (
                // <Paper>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{sum?.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ fontFamily: "Poppins", fontSize: 12 }}>
                      {sum?.result}
                    </Typography>
                    <Typography sx={{ fontFamily: "Poppins", fontSize: 12 }}>
                      {sum?.interpretation}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
            <Grid item xs={3}>
              {summary2.map((sum) => (
                // <Paper>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{sum?.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ fontFamily: "Poppins", fontSize: 12 }}>
                      {sum?.result}
                    </Typography>
                    <Typography sx={{ fontFamily: "Poppins", fontSize: 12 }}>
                      {sum?.interpretation}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </>
        ) : (
          <Grid item xs={7}>
            {summary.map((sum) => (
              // <Paper>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{sum?.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontFamily: "Poppins", fontSize: 12 }}>
                    {sum?.result}
                  </Typography>
                  <Typography sx={{ fontFamily: "Poppins", fontSize: 12 }}>
                    {sum?.interpretation}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        )}
      </Grid>
    </SideDrawer>
  );
};

export default ReportSummaryPage;
