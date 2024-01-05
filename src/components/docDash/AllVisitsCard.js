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

const StatCards = () => {
  return (
    <div>
      <Grid container spacing={2} direction="column">
        <Grid item sx={12}>
          <Typography
            variant="h6"
            sx={{
              ...bold_name,
              paddingTop: 2,
              paddingLeft: 3,
            }}
          >
            All visits
          </Typography>
        </Grid>

        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item sx={4} align="center" alignItems="center">
            <Stack sx={{ marginRight: 3, marginLeft: 3 }}>
              <Typography
                variant="h6"
                // sx={bold_name}
                align="center"
                sx={{
                  ...bold_name,
                  paddingTop: 2,
                  margin: 'auto',
                }}
              >
                23
              </Typography>
            </Stack>
            <Stack sx={{ marginRight: 3, marginLeft: 3 }}>
              <p
                style={{
                  ...ptag,
                  fontSize: '11px',
                  // paddingBottom: 20,
                  // paddingLeft: 25,
                }}
              >
                <b>Daily</b>
                {/* {moment(ca.startsAt).format('MMMM DD, YYYY')} */}
              </p>
            </Stack>
          </Grid>
          <Grid item sx={4} justifyContent="center">
            <Stack sx={{ marginRight: 3, marginLeft: 3 }}>
              <Typography
                variant="h6"
                // sx={bold_name}
                sx={{
                  ...bold_name,
                  paddingTop: 2,
                  margin: 'auto',
                }}
              >
                115
              </Typography>
            </Stack>
            <Stack sx={{ marginRight: 3, marginLeft: 3 }}>
              <p
                style={{
                  ...ptag,
                  fontSize: '11px',
                  // paddingBottom: 20,
                  // paddingLeft: 20,
                }}
              >
                <b>Monthly</b>
                {/* {moment(ca.startsAt).format('MMMM DD, YYYY')} */}
              </p>
            </Stack>
          </Grid>
          <Grid item sx={4} justifyContent="center">
            <Stack sx={{ marginRight: 3, marginLeft: 3 }}>
              <Typography
                variant="h6"
                // sx={bold_name}
                sx={{
                  ...bold_name,
                  paddingTop: 2,
                  margin: 'auto',
                }}
              >
                1354
              </Typography>
            </Stack>
            <Stack sx={{ marginRight: 3, marginLeft: 3 }}>
              <p
                style={{
                  ...ptag,
                  fontSize: '11px',
                  // paddingBottom: 20,
                  // paddingLeft: 25,
                }}
              >
                <b>Yearly</b>
                {/* {moment(ca.startsAt).format('MMMM DD, YYYY')} */}
              </p>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default StatCards

