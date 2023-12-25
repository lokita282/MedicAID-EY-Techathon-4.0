// import * as React from "react";
// import Box from "@mui/material/Box";
// import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import { useState } from "react";

// export default function SwipeableTemporaryDrawer() {
//   const [state, setState] = useState(false);

//   const toggleDrawer = (open) => (event) => {
//     if (
//       event &&
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setState(open);
//   };

//   const list = () => (
//     <Box
//       sx={{ width: 500 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}>
//       <List>
//         {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {["All mail", "Trash", "Spam"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <div>
//       <Button onClick={toggleDrawer(true)}>Right</Button>
//       <SwipeableDrawer
//         anchor="right"
//         open={state}
//         onClose={toggleDrawer(false)}
//         onOpen={toggleDrawer(true)}>
//         {list()}
//       </SwipeableDrawer>
//     </div>
//   );
// }

import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";

const drawerBleeding = 40;

const Root = styled("div")(({ theme }) => ({
  height: "auto",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  position: "absolute",
  left: 20,
  top: "calc(50% - 15px)",
}));

function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            width: `calc(40% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <Drawer
        container={container}
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        ModalProps={{
          keepMounted: true,
        }}>
        {!open ? (
          <Box
            onClick={toggleDrawer(true)}
            sx={{
              position: "absolute",
              left: "-50px",
              top: "200px",
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              visibility: "visible",
              height: "60px",
              width: "50px",
              backgroundColor: "#005739",
            }}>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="32"
                viewBox="0 0 19 32"
                fill="none">
                <path
                  d="M0.801556 17.894L14.3505 31.2164C14.6032 31.4648 14.9031 31.6619 15.2333 31.7963C15.5634 31.9308 15.9172 32 16.2745 32C16.9961 32 17.6882 31.7181 18.1984 31.2164C18.4511 30.968 18.6515 30.673 18.7883 30.3484C18.925 30.0239 18.9954 29.676 18.9954 29.3246C18.9954 28.6151 18.7087 27.9346 18.1984 27.4329L6.54632 16.0023L18.1984 4.57169C18.4524 4.324 18.654 4.02931 18.7916 3.70462C18.9292 3.37993 19 3.03166 19 2.67992C19 2.32818 18.9292 1.97992 18.7916 1.65523C18.654 1.33054 18.4524 1.03585 18.1984 0.788149C17.9465 0.538414 17.6468 0.340187 17.3166 0.204916C16.9864 0.0696449 16.6322 0 16.2745 0C15.9168 0 15.5626 0.0696449 15.2324 0.204916C14.9022 0.340187 14.6024 0.538414 14.3505 0.788149L0.801556 14.1105C0.547571 14.3582 0.345972 14.6529 0.208399 14.9776C0.0708256 15.3023 0 15.6505 0 16.0023C0 16.354 0.0708256 16.7023 0.208399 17.027C0.345972 17.3517 0.547571 17.6464 0.801556 17.894Z"
                  fill="white"
                />
              </svg>
            </Box>
          </Box>
        ) : (
          <></>
        )}

        <StyledBox
          sx={{
            px: 2,
            pt: 2,
            width: "100%",
            overflow: "auto",
          }}>
          <Typography variant="h6">Hello test</Typography>
        </StyledBox>
      </Drawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;
