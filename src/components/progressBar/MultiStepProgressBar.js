import React from "react";
import "./ProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import CheckIcon from "@mui/icons-material/Check";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AssignmentIcon from "@mui/icons-material/Assignment";
const MultiStepProgressBar = ({ page, onPageNumberClick }) => {
  var stepPercentage = 0;
  if (page === "pageone") {
    stepPercentage = 16;
  } else if (page === "pagetwo") {
    stepPercentage = 49.5;
  } else if (page === "pagethree") {
    stepPercentage = 82.5;
  } else if (page === "pagefour") {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <ProgressBar percent={stepPercentage}>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("1")}>
            {accomplished ? <CheckIcon /> : index + 1}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("2")}>
            {accomplished ? (
              <CheckIcon />
            ) : (
              <AccountCircleIcon
                sx={{ bgColor: "#fff", color: "#005739", fontSize: 40 }}
              />
            )}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("3")}>
            {accomplished ? (
              <CheckIcon />
            ) : (
              <InsertDriveFileIcon sx={{ bgColor: "#fff", color: "#005739" }} />
            )}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("4")}>
            {accomplished ? (
              <CheckIcon />
            ) : (
              <AssignmentIcon sx={{ bgColor: "#fff", color: "#005739" }} />
            )}
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
