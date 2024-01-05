import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DropzoneArea, DropzoneAreaBase } from "material-ui-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./dropzone.css";
import { SvgIcon } from "@mui/material";

const Dropzone = ({ text, onButtonClick, page }) => {
  const [fileObjects, setFileObjects] = useState([]);

  const handleClose = () => {
    console.log("File Dropped!");
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <DropzoneAreaBase
        fileObjects={fileObjects}
        dropzoneText={text}
        dropzoneParagraphClass="dropzoneParagraph"
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        filesLimit={1}
        acceptedFiles={["image/*"]}
        // Icon={require("./AttachFile.png")}
        dropzoneClass="drop-zone-area"
        disableRejectionFeedback={true}
        showPreviews={false}
        maxFileSize={5000000}
        onSave={handleClose}
        showPreviewsInDropzone={true}
        showFileNamesInPreview={true}
        showAlerts={true}
        alertSnackbarProps={{
          anchorOrigin: { vertical: "top", horizontal: "right" },
        }}
        onAdd={(fileObjs) => {
          console.log("Added Files:", fileObjs);
          setFileObjects([].concat(fileObjects, fileObjs));
        }}
        onDelete={(fileObj) => {
          console.log("Removed File:", fileObj);
          const newData = fileObjects.filter((item) => item !== fileObj);
          setFileObjects(newData);
        }}
        onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
      />
      {/* {fileObjects?.length != 0 ? (
        
      ) : (
        <></>
      )} */}
      <Button
        variant="contained"
        endIcon={<CloudUploadIcon />}
        color="success"
        onClick={() => {
          if (page == 2) {
            onButtonClick("pagethree");
          } else if (page == 3) {
            onButtonClick("pagefour");
          }
          console.log("Post general file");
        }}
        sx={{
          // display: "flex",
          marginTop: "1rem",
          borderRadius: 2,
          background: "var(--Activ, #005739)",
          boxShadow: "0px 2px 5px 2px rgba(2, 92, 92, 0.15)",
          display: fileObjects.length === 0 ? "none" : null,
        }}>
        Upload
      </Button>
    </Box>
  );
};

export default Dropzone;
