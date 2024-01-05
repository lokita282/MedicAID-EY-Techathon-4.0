import { ResponsivePie } from '@nivo/pie'
import { React, useEffect, useState } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { Box, Typography } from '@mui/material'
import { bold_name } from '../../theme/CssMy'
import CssBaseline from '@mui/material/CssBaseline'
import { weeklyCatVsAmt } from '../../services/bankServices'

const NivoLine = () => {

  const data = [
    {
      id: 'Malaria',
      label: 'Malaria',
      value: 112,
      color: 'hsl(140, 70%, 50%)',
    },
    {
      id: 'Flu',
      label: 'Flu',
      value: 494,
      color: 'hsl(144, 70%, 50%)',
    },
    {
      id: 'Other',
      label: 'Other',
      value: 270,
      color: 'hsl(252, 70%, 50%)',
    },
  ]


  const MyResponsivePie = ({ data /* see data tab */ }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'dark2' }}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'ruby',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'c',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'go',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'python',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'scala',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'lisp',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'elixir',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'javascript',
          },
          id: 'lines',
        },
      ]}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
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
            Diagnosis
          </Typography>
          <div style={{ height: '305px', width: 'auto', overflow: 'hidden' }}>
            <MyResponsivePie data={data} />
          </div>
        </Box>
      </Box>
    </>
  )
}

export default NivoLine

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
