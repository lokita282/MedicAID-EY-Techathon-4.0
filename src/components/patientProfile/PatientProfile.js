import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
const PatientProfile = (patientDetails) => {
  console.log("patientDetails", patientDetails.json);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Avatar
        sx={{
          width: 75,
          height: 75,
          marginBottom: "1rem",
        }}
        alt={patientDetails?.name}
        src="../../images/Avatar.png"
      />
    </Box>
  );
};

export default PatientProfile;
