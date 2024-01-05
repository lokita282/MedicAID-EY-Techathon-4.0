import { ResponsiveTimeRange } from '@nivo/calendar'
import { React, useEffect, useState } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { Box, Typography } from '@mui/material'
import { bold_name } from '../../theme/CssMy'
import CssBaseline from '@mui/material/CssBaseline'
import { weeklyCatVsAmt } from '../../services/bankServices'

const NivoLine = () => {
  const data = [
    {
    "value": 105,
    "day": "2023-09-01"
  },
  {
    "value": 62,
    "day": "2023-09-02"
  },
  {
    "value": 89,
    "day": "2023-09-03"
  },
  {
    "value": 0,
    "day": "2023-09-04"
  },
  {
    "value": 74,
    "day": "2023-09-05"
  },
  {
    "value": 56,
    "day": "2023-09-07"
  },
  {
    "value": 0,
    "day": "2023-09-08"
  },
  {
    "value": 98,
    "day": "2023-09-09"
  },
  {
    "value": 67,
    "day": "2023-09-10"
  },
  {
    "value": 0,
    "day": "2023-09-12"
  },
  {
    "value": 79,
    "day": "2023-09-13"
  },
  {
    "value": 53,
    "day": "2023-09-14"
  },
  {
    "value": 0,
    "day": "2023-09-15"
  },
  {
    "value": 68,
    "day": "2023-09-16"
  },
  {
    "value": 110,
    "day": "2023-09-17"
  },
  {
    "value": 0,
    "day": "2023-09-18"
  },
  {
    "value": 92,
    "day": "2023-09-19"
  },
  {
    "value": 61,
    "day": "2023-09-20"
  },
  {
    "value": 0,
    "day": "2023-09-21"
  },
  {
    "value": 87,
    "day": "2023-09-22"
  },
  {
    "value": 45,
    "day": "2023-09-23"
  },
  {
    "value": 0,
    "day": "2023-09-24"
  },
  {
    "value": 70,
    "day": "2023-09-25"
  },
  {
    "value": 104,
    "day": "2023-09-26"
  },

  {
    "value": 82,
    "day": "2023-09-28"
  },
  {
    "value": 58,
    "day": "2023-09-29"
  },

    {
    "value": 83,
    "day": "2023-10-01"
  },
  {
    "value": 22,
    "day": "2023-10-02"
  },
  {
    "value": 105,
    "day": "2023-10-03"
  },
  {
    "value": 42,
    "day": "2023-10-04"
  },
  {
    "value": 91,
    "day": "2023-10-06"
  },
  {
    "value": 75,
    "day": "2023-10-07"
  },

  {
    "value": 13,
    "day": "2023-10-09"
  },
  {
    "value": 67,
    "day": "2023-10-10"
  },
  {
    "value": 94,
    "day": "2023-10-11"
  },
  {
    "value": 35,
    "day": "2023-10-12"
  },
  {
    "value": 79,
    "day": "2023-10-13"
  },

  {
    "value": 87,
    "day": "2023-10-15"
  },
  {
    "value": 61,
    "day": "2023-10-16"
  },
  {
    "value": 45,
    "day": "2023-10-18"
  },
  {
    "value": 96,
    "day": "2023-10-20"
  },
  {
    "value": 62,
    "day": "2023-10-21"
  },
  {
    "value": 55,
    "day": "2023-10-23"
  },
  {
    "value": 78,
    "day": "2023-10-24"
  },
  {
    "value": 22,
    "day": "2023-10-25"
  },
  {
    "value": 39,
    "day": "2023-10-26"
  },
  {
    "value": 71,
    "day": "2023-10-27"
  },

  {
    "value": 59,
    "day": "2023-10-29"
  },
  {
    "value": 81,
    "day": "2023-10-30"
  },
  {
    "value": 48,
    "day": "2023-10-31"
  },
{
    "value": 105,
    "day": "2023-11-01"
  },
  {
    "value": 43,
    "day": "2023-11-04"
  },
  {
    "value": 23,
    "day": "2023-11-05"
  },
  {
    "value": 98,
    "day": "2023-11-06"
  },
  {
    "value": 80,
    "day": "2023-11-08"
  },
  {
    "value": 68,
    "day": "2023-11-09"
  },
  {
    "value": 50,
    "day": "2023-11-11"
  },
  {
    "value": 93,
    "day": "2023-11-12"
  },
  {
    "value": 64,
    "day": "2023-11-13"
  },
  {
    "value": 38,
    "day": "2023-11-15"
  },
  {
    "value": 79,
    "day": "2023-11-16"
  },
  {
    "value": 55,
    "day": "2023-11-17"
  },
  {
    "value": 23,
    "day": "2023-11-19"
  },
  {
    "value": 47,
    "day": "2023-11-20"
  },
  {
    "value": 63,
    "day": "2023-11-22"
  },
  {
    "value": 54,
    "day": "2023-11-24"
  },
  {
    "value": 81,
    "day": "2023-11-25"
  },
  {
    "value": 45,
    "day": "2023-11-26"
  },
  {
    "value": 68,
    "day": "2023-11-27"
  },
  {
    "value": 117,
    "day": "2023-11-28"
  },
  {
    "value": 59,
    "day": "2023-11-29"
  },
  {
    "value": 74,
    "day": "2023-11-30"
  },
    {
      value: 23,
      day: '2023-12-02',
    },
    {
      value: 23,
      day: '2023-12-04',
    },
    {
      value: 81,
      day: '2023-12-05',
    },
    {
      value: 22,
      day: '2023-12-06',
    },
    {
      value: 68,
      day: '2023-12-09',
    },
    {
      value: 76,
      day: '2023-12-10',
    },
    {
      value: 112,
      day: '2023-12-11',
    },
    {
      value: 55,
      day: '2023-12-12',
    },
    {
      value: 94,
      day: '2023-12-13',
    },
    {
      value: 62,
      day: '2023-12-15',
    },
    {
      value: 78,
      day: '2023-12-16',
    },
    {
      value: 103,
      day: '2023-12-17',
    },
    {
      value: 45,
      day: '2023-12-18',
    },
    {
      value: 88,
      day: '2023-12-20',
    },
    {
      value: 23,
      day: '2023-12-21',
    },
    {
      value: 84,
      day: '2023-12-22',
    },
    {
      value: 59,
      day: '2023-12-23',
    },
    {
      value: 110,
      day: '2023-12-25',
    },
    {
      value: 66,
      day: '2023-12-26',
    },
    {
      value: 91,
      day: '2023-12-27',
    },
    {
      value: 73,
      day: '2023-12-28',
    },
    {
      value: 82,
      day: '2023-12-29',
    },
    {
      value: 79,
      day: '2023-12-31',
    },
    {
      value: 95,
      day: '2024-01-01',
    },
    {
      value: 42,
      day: '2024-01-02',
    },
    {
      value: 105,
      day: '2024-01-04',
    },
    {
      value: 63,
      day: '2024-01-05',
    },
    {
      value: 2,
      day: '2024-01-06',
    },
    {
      value: 26,
      day: '2024-01-07',
    },
    {
      value: 92,
      day: '2024-01-08',
    },
  ]


  const MyResponsiveTimeRange = ({ data /* see data tab */ }) => (
    <ResponsiveTimeRange
      data={data}
      from="2023-10-1"
      to="2024-01-08"
      emptyColor="#eeeeee"
      colors={['#EE4266', '#2A1E5C', '#3CBBB1']}
      margin={{ top: 20, right: 10, bottom: 15, left: 40 }}
      dayRadius={7}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      // legends={[
      //   {
      //     anchor: 'bottom-right',
      //     direction: 'row',
      //     justify: false,
      //     itemCount: 4,
      //     itemWidth: 42,
      //     itemHeight: 36,
      //     itemsSpacing: 14,
      //     itemDirection: 'right-to-left',
      //     translateX: -60,
      //     translateY: -60,
      //     symbolSize: 20,
      //   },
      // ]}
    />
  )

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Typography
            variant="h6"
            // sx={bold_name}
            sx={{
              ...bold_name,
              paddingTop: 2,
              paddingLeft: 3,
              paddingBottom: -20,
            }}
          >
            Appointment Timeline
          </Typography>
          <div style={{ height: '170px', width: 'auto', overflow: 'hidden' }}>
            <MyResponsiveTimeRange data={data} />
          </div>
        </Box>
      </Box>
    </>
  )
}

export default NivoLine
