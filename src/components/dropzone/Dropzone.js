import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DropzoneArea, DropzoneAreaBase } from "material-ui-dropzone";
import "./dropzone.css";

const Dropzone = () => {
  const [fileObjects, setFileObjects] = useState([]);

  return (
    // <Box sx={{ height: "25vh" }}>
    <DropzoneAreaBase
      fileObjects={fileObjects}
      dropzoneText="Drag and drop to upload your files"
      dropzoneParagraphClass="dropzoneParagraph"
      dropzoneClass="drop-zone-area"
      disableRejectionFeedback={true}
      showPreviews={false}
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
    // </Box>
  );
};

export default Dropzone;
