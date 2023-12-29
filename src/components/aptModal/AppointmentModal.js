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
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

import { format, formatDistance, formatRelative, subDays } from "date-fns";
import de from "date-fns/locale/de";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

import { getAllDoctors, postAppointment } from "../../services/patientService";
import { set } from "date-fns";
import { DatePicker } from "@material-ui/pickers";

const AppointmentModal = ({ open, handleClose, style }) => {
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

  const handleDelete = (chipToDelete) => () => {
    setSymptomChip((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

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

  const handlePost = () => {
    console.log("sending post request");
    setLoading(true);

    let data = JSON.stringify({
      doctorId: docid,
      startArr: [start1, start2, start3],
      endArr: [end1, end2, end3],
      title: myname,
      status: "followup",
      symptoms: symptomChip.map((symptom) => symptom.label),
    });
    const func = async () => {
      await postAppointment(data).then(async (res) => {
        console.log(res.data);
      });
      setLoading(false);
    };
    func();
  };

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const AddMore = () => {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}>
        <Button variant="contained" sx={{ width: "auto", marginTop: 2 }}>
          Add more
        </Button>
      </Box>
    );
  };

  const DatePick = ({ start, end, setEnd, setStart, fsetStart, fsetEnd }) => {
    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
          <DemoContainer
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginTop: -1,
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
            components={["DateTimePicker", "DateTimePicker"]}>
            <DateTimePicker
              sx={{ width: "48%" }}
              label="Start time"
              value={start}
              onChange={(newValue) => {
                setStart(newValue);
                // const formattedDate =
                //   dayjs(newValue).format("YYYY/MM/DD/ HH:mm");
                // setStart(newValue.toString());
                const result = format(newValue, "yyyy/MM/dd HH:mm");
                // setStart(result.toString());
                console.log(result.toString());
                fsetStart(result.toString());
              }}
            />
            <DateTimePicker
              sx={{ width: "48%" }}
              label="End time"
              value={end}
              onChange={(newValue) => {
                setEnd(newValue);
                // const formattedDate =
                //   dayjs(newValue).format("YYYY/MM/DD/ HH:mm");
                const result = format(newValue, "yyyy/MM/dd HH:mm");
                // setEnd(result.toString());
                console.log(result.toString());
                fsetEnd(result.toString());
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </>
    );
  };

  return (
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
              <Button sx={{ marginRight: 1 }} onClick={handlePost}>
                Submit
              </Button>
            </Box>
          </Box>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default AppointmentModal;
