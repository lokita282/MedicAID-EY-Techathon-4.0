import React from "react";
import Successgif from "../../images/Success.gif";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
const PageFour = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: "2rem" }}>
        You have successfully signed up!
      </Typography>
      <Button
        onClick={() => navigate("/login")}
        variant="contained"
        color="success"
        sx={{
          marginTop: "1rem",
          marginBottom: -2,
          borderRadius: 2,
          width: "40%",
          background: "var(--Activ, #005739)",
          boxShadow: "0px 2px 5px 2px rgba(2, 92, 92, 0.15)",
        }}>
        Finish
      </Button>
    </Box>
  );
};

export default PageFour;
