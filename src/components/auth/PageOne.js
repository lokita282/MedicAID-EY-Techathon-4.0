import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";

const genders = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const PageOne = ({ onButtonClick }) => {
  return (
    <>
      <Box
        component="form"
        sx={{
          marginTop: "2rem",
          marginBottom: "1rem",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        noValidate
        autoComplete="off">
        <TextField
          sx={{ width: "15%", m: 0.5 }}
          id="outlined-age"
          label="Age"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="outlined-select-gender"
          select
          sx={{ m: 0.5 }}
          label="Gender"
          defaultValue=""
          helperText="Please select your gender">
          {genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{ m: 0.5, width: "20%" }}
          id="outlined-wieght"
          label="Weight"
          defaultValue=""
          helperText="kg"
          variant="outlined"
        />
        <TextField
          sx={{ width: "20%", m: 0.5 }}
          id="outlined-height"
          label="Height"
          defaultValue=""
          helperText="cm"
          variant="outlined"
        />
      </Box>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <TextField
          sx={{ width: "80%" }}
          id="outlined-multiline-address"
          label="Address"
          multiline
          rows={4}
        />
      </Box>
      <Button
        onClick={() => onButtonClick("pagetwo")}
        variant="contained"
        color="success"
        sx={{
          marginTop: "1rem",
          marginBottom: -2,
          borderRadius: 2,
          background: "var(--Activ, #005739)",
          boxShadow: "0px 2px 5px 2px rgba(2, 92, 92, 0.15)",
        }}
        endIcon={<ArrowForwardIosIcon />}>
        Next
      </Button>
    </>
  );
};

export default PageOne;
