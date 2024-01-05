import React, { useState } from "react";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import MultiStepProgressBar from "../progressBar/MultiStepProgressBar";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import PageFour from "./PageFour";

const SignupPatient = () => {
  const [page, setPage] = useState("pageone");
  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      case "3":
        setPage("pagethree");
        break;
      case "4":
        break;
      default:
        setPage("1");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Paper
        sx={{
          display: "flex",
          width: "70%",
          flexDirection: "column",
          alignItems: "center",
          p: 5,
        }}>
        {/* <Typography>Hello</Typography> */}
        <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
        {
          {
            pageone: <PageOne onButtonClick={nextPage} />,
            pagetwo: <PageTwo onButtonClick={nextPage} />,
            pagethree: <PageThree onButtonClick={nextPage} />,
            pagefour: <PageFour />,
          }[page]
        }
      </Paper>
    </Box>
  );
};

export default SignupPatient;
