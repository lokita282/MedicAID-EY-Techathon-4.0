import React from "react";
import Dropzone from "../dropzone/Dropzone";
import Box from "@mui/material/Box";
import { df_jfs_ac, link } from "../../theme/CssMy";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router";

const PageTwo = ({ onButtonClick }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "80%", marginTop: "2rem" }}>
      <Dropzone
        text="Upload your medical prescriptions "
        onButtonClick={onButtonClick}
        page={3}
        type="signup"
      />
      <Grid container spacing={2}>
        <Grid md={12} item sx={df_jfs_ac}>
          <Button
            onClick={() => onButtonClick("pagethree")}
            variant="contained"
            color="success"
            sx={{
              marginTop: "1rem",
              marginLeft: "40%",
              marginBottom: -2,
              borderRadius: 2,
              background: "var(--Activ, #005739)",
              boxShadow: "0px 2px 5px 2px rgba(2, 92, 92, 0.15)",
            }}
            endIcon={<ArrowForwardIosIcon />}>
            Next
          </Button>
        </Grid>
        <Grid md={12} item sx={df_jfs_ac}>
          Already have an account? &nbsp;{" "}
          <p style={link} onClick={() => navigate("/login")}>
            Login
          </p>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageTwo;
