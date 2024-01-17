import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import CardMedia from "@mui/material/CardMedia";
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import med1 from "../../images/medicine1.png";
import med2 from "../../images/medicine2.png";
import med3 from "../../images/medicine3.png";
import med4 from "../../images/medicine4.png";
import Typography from "@mui/material/Typography";

function createData(path, name, presDate, Freq, Dur) {
  return { path, name, presDate, Freq, Dur };
}
const rows = [
  createData(med1, "Crocin 650", "12/01/23", "1-0-1", "2w"),
  createData(med2, "Allergy Relief", "12/01/23", "0-1-0", "1w"),
  createData(med3, "Tylenol", "12/01/23", "0-0-1", "1w"),
  createData(med4, "Dexamethosane", "15/01/23", "1-0-1", "6w"),
  // createData(

  //   "Crocin 650",
  //   "12/01/23",
  //   "1-0-1",
  //   "3w"
  // ),
  // createData(
  //   "../../images/medicine3.png",
  //   "Crocin 650",
  //   "12/01/23",
  //   "1-0-1",
  //   "3w"
  // ),
  // createData(
  //   "../../images/medicine4.png",
  //   "Crocin 650",
  //   "12/01/23",
  //   "1-0-1",
  //   "3w"
  // ),
];

const Medications = () => {
  return (
    <Paper sx={{ width: "50%" }}>
      <Typography
        sx={{ flex: "1 1 100%", pt: 1, pl: 2 }}
        variant="h6"
        id="tableTitle"
        component="div">
        Medication
      </Typography>
      <TableContainer>
        <Table sx={{}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>
                <div style={{ width: "25px", height: "25px" }}></div>
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: 600, fontFamily: "Poppins" }}>
                Name
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: 600, fontFamily: "Poppins" }}>
                Presribed Date
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: 600, fontFamily: "Poppins" }}>
                Frequency
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: 600, fontFamily: "Poppins" }}>
                Duration
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <CardMedia
                    component="img"
                    image={row.path}
                    height="25"
                    width="25"
                    alt="medicine"
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.presDate}</TableCell>
                <TableCell align="left">
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                      marginLeft: -2,
                      justifyContent: "space-around",

                      alignItems: "center",
                    }}>
                    <Icon icon="fe:sunrise" />
                    {row.Freq.slice("-")[0]}
                    <Icon icon="charm:sun" />
                    {row.Freq.slice("-")[2]}
                    <Icon icon="ph:moon-fill" />
                    {row.Freq.slice("-")[4]}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Chip label={row.Dur} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Medications;
