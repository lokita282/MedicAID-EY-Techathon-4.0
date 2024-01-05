import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DropzoneArea, DropzoneAreaBase } from "material-ui-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./dropzone.css";
import attach from "../../images/AttachFile.png";

const Dropzone = () => {
  const [fileObjects, setFileObjects] = useState([]);

  const handleClose = () => {
    console.log("File Dropped!");
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <DropzoneAreaBase
        fileObjects={fileObjects}
        dropzoneText="Upload your documents"
        dropzoneParagraphClass="dropzoneParagraph"
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        filesLimit={1}
        acceptedFiles={["image/*"]}
        // Icon={attach}
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
      {fileObjects?.length != 0 ? (
        <Button
          variant="outlined"
          endIcon={<CloudUploadIcon />}
          color="success"
          onClick={() => {
            console.log("Post general file");
          }}
          sx={{ marginTop: 2, display: "flex", color: "#005739" }}>
          Upload
        </Button>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Dropzone;
