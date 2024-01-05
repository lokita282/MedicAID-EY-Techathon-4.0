import React from 'react'
import { bold_name, card, df_jc_ac, df_jfs_ac, ptag } from '../../theme/CssMy'
import {
  Avatar,
  AvatarGroup,
  Box,
  Paper,
  CardContent,
  Stack,
  Grid,
  Typography,
} from '@mui/material'

const cardsArr = [
  {
    id: 1,
    title: 'Appointments',
    num: 7,
    subtitle: 'Today',
    icon: 'https://iili.io/J5ZLu2t.png',
  },
  {
    id: 2,
    title: 'Prescriptions',
    num: 5,
    subtitle: 'Today',
    icon: 'https://iili.io/J5txqQf.png',
  },
  {
    id: 3,
    title: 'Total Patients',
    num: 150,
    subtitle: 'Overall',
    icon: 'https://iili.io/J5txs6l.png',
  },
]

const StatCards = () => {
  return (
    <div>
      <Grid container spacing={2} >
        
         {cardsArr.map((card) => {
            return (
              <Grid item xs={4}>
                <Paper
                  sx={{ padding: '1.5em', borderRadius: '10px' }}
                  elevation={3}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Stack>
                        <Typography
                          variant="body1"
                          // sx={bold_name}
                          sx={{ ...bold_name, paddingBottom: 1 }}
                        >
                          {card.title}
                        </Typography>
                        <p
                          style={{
                            ...ptag,
                            fontSize: '11px',
                            paddingBottom: 20,
                          }}
                        >
                          <b>{card.subtitle}</b>
                          {/* {moment(ca.startsAt).format('MMMM DD, YYYY')} */}
                        </p>
                        <Typography variant="h5" sx={bold_name}>
                          {card.num}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
                        {/* <Paper sx={{ backgroundColor: '#6E6E6E' }}>icon</Paper> */}
                        <img src={card.icon} width="100%" />
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )
          })}

      </Grid>
      
    </div>
  )
}

export default StatCards

// <Box
//         // onClick={async () => {
//         //   await getSoloCoupon(ca?._id)
//         //     .then((res) => {
//         //       console.log(res.data.data)
//         //       setQRString(res.data.data.qrString)
//         //     })
//         //     .catch((e) => console.log(e))
//         //   setSolo(ca)
//         //   setOpen(true)
//         // }}
//         // key={i}
//         sx={{
//           marginTop: '5%',
//           cursor: 'pointer',
//           // ...card,
//           height: 'auto',
//           display: 'flex',
//           justifyContent: 'flex-start',
//           flexDirection: 'column',
//         }}
//       >
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'flex-start',
//           }}
//         >
//           <AvatarGroup sx={{ marginRight: '5%' }}>
//             {/* <Avatar src={ca.issuedByLogo} />
//             <Avatar src={ca.orgLogo} /> */}
//           </AvatarGroup>
//           <div>
//             <Typography variant="p" sx={bold_name}>
//               title
//             </Typography>
//             <p style={{ ...ptag, fontSize: '11px' }}>
//               <b>Received On -</b>
//               {/* {moment(ca.startsAt).format('MMMM DD, YYYY')} */}
//             </p>
//             <p style={{ ...ptag, fontSize: '11px' }}>
//               <b>Expiring On - </b>
//               {/* {moment(ca.endsAt).format('MMMM DD, YYYY')} */}
//             </p>
//           </div>
//         </div>
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//           }}
//         >
//           <p
//             style={{
//               ...ptag,
//               fontSize: '11px',
//               padding: '5% 2%',
//             }}
//           >
//             <b>Amount - </b>₹ ca.amount
//           </p>
//           {/* {ca.balanceAmount && ( */}
//           <p style={{ ...ptag, fontSize: '11px', padding: '5%' }}>
//             <b>Balance - </b>₹ ca.balanceAmount
//           </p>
//           {/* )} */}
//         </div>
//       </Box>