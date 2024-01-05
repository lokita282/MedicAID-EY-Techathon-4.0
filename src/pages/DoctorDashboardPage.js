import {React, useContext, useState} from 'react'
import { eycontext } from '../context/MainContext'
import SideDrawer from '../components/sidebar/Sidebar'
import { Link } from 'react-router-dom'
import {Grid, Stack} from '@mui/material'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Lottie from 'react-lottie'
import userscan from '../assets/userscan.json'
import WeeklyActivity from '../components/userTransactionOverview/WeeklyActivity'
import WeeklySpend from '../components/userTransactionOverview/WeeklySpend'
import MonthlySpend from '../components/userTransactionOverview/MonthlySpend'
import CategoryVsTime from '../components/userTransactionOverview/CategoryVsTime'
import CategoryPie from '../components/userTransactionOverview/CategoryPie'
import { CardMedia } from '@mui/material'
import gipphy from '../images/dangerGif.svg'
import giphy from '../images/giphy.gif'
import { df_jfs_ac_fdc, bold_name, ptag } from '../theme/CssMy'
import StatCards from '../components/docDash/StatCards'
import LineChart from '../components/docDash/LineChart'
import RadialChart from '../components/docDash/RadialChart'
import Timeline from '../components/docDash/Timeline'
import AllVisitsCard from '../components/docDash/AllVisitsCard'
// import { Augnito, AugnitoConfig, AugnitoAPIServer } from 'augnitosdk'

// const augnitoConfig = {
//   server: 'india',
//   accountCode: 'a67f3023-387f-4e82-9e6f-c1dcf79202aa',
//   accessKey: 'ab51e160e42e453f87e003566a683239',
//   userTag: 'Prateek Ranka',
//   sourceApp: 'medicaid',
//   lmId: '111801200',
// }

// const augnito = new Augnito(augnitoConfig);


const styles = {
  paperContainer: {
    height: '525px',
    borderRadius: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
    verticalAlign: 'middle',
    backgroundColor: '#f5f5f5',
  },
  paperContainerAnalysis: {
    height: '500px',
    borderRadius: '10px',
    boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  gradientText: {
    background: 'radial-gradient( #069B67, #005739)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    paddingTop: '0.2em',
  },
  gradientTextH2: {
    background: 'radial-gradient( #069B67, #005739)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    paddingLeft: 20,
    fontFamily: 'Poppins',
  },
  paperContainerCharts: {
    height: '500px',
    borderRadius: '10px',
    // display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    verticalAlign: 'middle',
    boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)',
  },
  payBtn: {
    background: 'radial-gradient( #069B67, #005739)',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    marginTop: 20,
    borderRadius: '20px',
    width: '30%',
    height: '10.5%',
    fontFamily: 'Poppins',
  },
}

const UserDashboardPage = () => {

    const { user } = useContext(eycontext)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: userscan,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <Grid
      container
      spacing={2}
      // sx={{ height: '80vh', padding: '0', margin: '0' }}
    >
      <Grid item xs={12}>
        <Typography variant="h3" style={styles.gradientText}>
          <b>Hello Dr. {user.name}</b>
        </Typography>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{ paddingLeft: '1em', paddingTop: '2em' }}
      >
        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StatCards />
            </Grid>
            <Grid item xs={6}>
              <Stack sx={{ marginBottom: 2 }}>
                <Paper
                  sx={{ borderRadius: '10px', minHeight: '120px' }}
                  elevation={3}
                >
                  <AllVisitsCard />
                </Paper>
              </Stack>
              <Stack>
                <Grid item xs={12}>
                  <Paper sx={{ borderRadius: '10px' }} elevation={3}>
                    <Timeline />
                  </Paper>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ borderRadius: '10px' }} elevation={3}>
                <RadialChart />{' '}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ borderRadius: '10px' }} elevation={3}>
                <LineChart />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UserDashboardPage
