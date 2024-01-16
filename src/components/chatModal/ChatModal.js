import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Chatcomponent from "../chatbot/Chatbot";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const style = {
  position: "absolute",
  top: "50%",
  left: "100%",
  transform: "translate(-30vw, -25vh)",
  width: "30vw",
  height: "72vh",
  marginLeft: -2,
  // height: "75vh",
  bgcolor: "background.paper",
  border: "0px solid #fff",
  borderRadius: "15px",
};

const ChatModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box
          sx={{
            // width: "100%",
            bgcolor: "#005739",
            color: "#fff",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            p: 2,
          }}>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              fontFamily: "Poppins",
            }}>
            Conversation with MedicAID Bot
          </Typography>
          <Box
            onClick={handleClose}
            sx={{
              borderRadius: 40,

              width: 32,
              height: 32,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              ":hover": {
                boxShadow: "5",
                bgcolor: "#03402B",
                transition: "0.3s",
              },
            }}>
            <KeyboardArrowDownRoundedIcon sx={{ height: 32, width: 32 }} />
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            overflow: "auto",
          }}>
          <Chatcomponent open={open} />
        </Box>
        {/* <Box
            sx={{
              color: "#fff",
            }}>
            {" "}
            Hello
          </Box> */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            display: "flex",
            my: 1,
            width: "100%",
            justifyContent: "center",
          }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 12,
              fontWeight: 400,
              textDecoration: "underline",
              color: "grey",
              "&:hover": {
                cursor: "pointer",
                transition: "0.3s",
              },
            }}>
            T&C Apply*
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChatModal;
