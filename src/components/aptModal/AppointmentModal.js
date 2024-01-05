import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { DropzoneDialog } from "material-ui-dropzone";

import DatePick from "../../components/datepick/DatePick";

import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

import {
  getAllDoctors,
  postAppointment,
  uploadReport,
} from "../../services/patientService";

const AppointmentModal = ({
  open,
  handleClose,
  style,
  setStartTime,
  setEndTime,
  setMeetingLink,
}) => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [aptId, setAptId] = useState("");

  const [start1, setStart1] = useState();
  const [start2, setStart2] = useState();
  const [start3, setStart3] = useState();

  const [end1, setEnd1] = useState();
  const [end2, setEnd2] = useState();
  const [end3, setEnd3] = useState();

  const [fstart1, fsetStart1] = useState();
  const [fstart2, fsetStart2] = useState();
  const [fstart3, fsetStart3] = useState();

  const [fend1, fsetEnd1] = useState();
  const [fend2, fsetEnd2] = useState();
  const [fend3, fsetEnd3] = useState();

  const [symptoms, setSymptoms] = useState("");
  const [symptomChip, setSymptomChip] = useState([]);

  const [loading, setLoading] = useState(false);
  const [docList, setDocList] = useState([]);

  const [docid, setDocid] = useState("");

  let myname = JSON.parse(localStorage.getItem("eyUser")).name;

  useEffect(() => {
    setLoading(true);
    const func = async () => {
      await getAllDoctors().then((res) => {
        setDocList(res.data);
      });
      setLoading(false);
    };
    func();
  }, []);

  const handleSelect = (event) => {
    event.preventDefault();
    setDocid(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let k = symptomChip.length;
    setSymptomChip((chips) => [...chips, { key: k, label: symptoms }]);
    setSymptoms("");
  };

  const handleFilePost = (files) => {
    console.log("sending post request");
    setLoading(true);
    let formdata = new FormData();
    formdata.append("appointment", aptId);
    formdata.append("reports", files[0], files[0].name);
    console.log("Data:", formdata);
    const func = async () => {
      await uploadReport(formdata).then((res) => {
        console.log("Respone:", res.data.success);
      });
      setLoading(false);
    };
    func();
    setUploadOpen(false);
  };

  const handleAptPost = () => {
    console.log("sending post request");
    setLoading(true);
    let roomId = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    let data = JSON.stringify({
      doctorId: docid,
      startArr: [fstart1, fstart2, fstart3],
      endArr: [fend1, fend2, fend3],
      title: myname,
      status: "followup",
      symptoms: symptomChip.map((symptom) => symptom.label),
      meetingId: `http://localhost:3000?roomID=${roomId}`,
    });
    // console.log("Data:", data);
    const func = async () => {
      await postAppointment(data).then(async (res) => {
        console.log("Respone:", res.data);
        setAptId(res.data.appointment._id);
        setStartTime(res.data.appointment.start);
        setEndTime(res.data.appointment.end);
        setMeetingLink(`http://localhost:3000?roomID=${roomId}`);
      });
      setLoading(false);
    };
    func();
    handleClose();
    setUploadOpen(true);
  };

  const handleDelete = (chipToDelete) => () => {
    setSymptomChip((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  // const AddMore = () => {
  //   return (
  //     <Box
  //       sx={{
  //         width: "100%",
  //         display: "flex",
  //         justifyContent: "center",
  //       }}>
  //       <Button variant="contained" sx={{ width: "auto", marginTop: 2 }}>
  //         Add more
  //       </Button>
  //     </Box>
  //   );
  // };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ marginBottom: 1 }}>
            Make an appointment
          </Typography>
          <FormControl
            fullWidth
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
            <InputLabel id="demo-simple-select-label">Doctor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={docid}
              label="Doctors"
              onChange={handleSelect}>
              {docList.map((doc) => (
                <MenuItem value={doc._id}>{doc.name}</MenuItem>
              ))}
            </Select>
            {/* </FormControl> */}
            <Typography sx={{ marginBottom: -1, marginTop: 2 }}>
              Select 3 time slot preferences for booking your appointment{" "}
            </Typography>
            <DatePick
              start={start1}
              end={end1}
              setEnd={setEnd1}
              setStart={setStart1}
              fsetStart={fsetStart1}
              fsetEnd={fsetEnd1}
            />
            <DatePick
              start={start2}
              end={end2}
              setEnd={setEnd2}
              setStart={setStart2}
              fsetStart={fsetStart2}
              fsetEnd={fsetEnd2}
            />
            <DatePick
              start={start3}
              end={end3}
              setEnd={setEnd3}
              setStart={setStart3}
              fsetStart={fsetStart3}
              fsetEnd={fsetEnd3}
            />

            <Box
              sx={{
                flexWrap: "wrap",
                listStyle: "none",
                marginTop: 3,
              }}>
              <Typography sx={{ marginTop: -1, marginBottom: 1 }}>
                Enter your symptoms
              </Typography>
              <Box
                component="form"
                sx={{
                  width: "100%",
                }}
                noValidate
                autoComplete="off">
                {/* <FormControl
              fullWidth
              onSubmit={(e) => {
                e.preventDefault();
              }}> */}
                <TextField
                  fullWidth
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log(symptoms);
                  }}
                  sx={{ width: "100%", marginBottom: 1 }}
                  id="outlined-basic"
                  variant="outlined"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    listStyle: "none",
                    width: "80%",
                    p: 0.5,
                    m: 0,
                  }}
                  component="ul">
                  {symptomChip.map((data) => {
                    let icon;

                    return (
                      <ListItem key={data.key}>
                        <Chip
                          icon={icon}
                          label={data.label}
                          onDelete={handleDelete(data)}
                        />
                      </ListItem>
                    );
                  })}
                </Box>
                <Button sx={{ marginRight: 1 }} onClick={handleAptPost}>
                  Create
                </Button>
              </Box>
            </Box>
          </FormControl>
        </Box>
      </Modal>
      <DropzoneDialog
        acceptedFiles={["image/*"]}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSave={(files) => {
          // console.log("Files:", files);
          handleFilePost(files);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </>
  );
};

export default AppointmentModal;
