import React from "react";
import Dropzone from "../dropzone/Dropzone";
import Box from "@mui/material/Box";
const PageTwo = ({ onButtonClick }) => {
  return (
    <Box sx={{ width: "80%", marginTop: "2rem" }}>
      <Dropzone
        text="Upload your medical imaging scans"
        onButtonClick={onButtonClick}
        page={2}
      />
    </Box>
  );
};

export default PageTwo;
