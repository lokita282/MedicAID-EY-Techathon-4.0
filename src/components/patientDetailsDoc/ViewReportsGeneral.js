import { React, useState, useEffect } from 'react'
import { Box, CardMedia } from '@mui/material'
import { getReportsOfPatient } from '../../services/doctorService.js'
import Loading from '../loader/Loading'
import { df_jc_ac } from '../../theme/CssMy'
import Carousel from 'react-material-ui-carousel'




const ViewReports = () => {
  const [loading, setLoading] = useState(false)
  const [reports, setReports] = useState()
  var items = []

  useEffect(() => {
    const id = window.location.href.split('/')[4]
    setLoading(true)
    if (id) {
      getReportsOfPatient(id).then((res) => {
        console.log('rp', res.data.reports[0].generalReports)
        setReports(res.data.reports[0].generalReports)
        for (let i = 0; i < res.data.reports[0].generalReports.length; i++) {
          // var items = [
          //   {
          //     img: img0,
          //   }, 
          //   {
          //     img: img1,
          //   },
          //   {
          //     img: img2,
          //   },
          //   {
          //     img: img3,
          //   },
          // ]

          items.push({ img: res.data.reports[0].generalReports[i] })
          console.log(items)
        }
      })

      setLoading(false)
    }
  }, [])

  return (
    <>
      {loading ? (
        <Box sx={{ ...df_jc_ac, height: '80vh' }}>
          <Loading />
        </Box>
      ) : (
        <Box sx={{ mt: 2,  display : "flex", justifyContent : "space-between" }}>
          {reports?.map((img) =>

            <img
              src={`data:image/jpeg;base64,${img}`}
              height="50%"
              width="45%"
              alt="report"
              // borderRadius="10px"
              style={{ 'border-radius': '10px', "margin": '10px' }}
            />

          )}
          {/* <Carousel
            autoPlay={true}
            swipe={true}
            indicators={false}
            cycleNavigation={true}
            interval={2000}
            animation="fade" 
          >
            {console.log(items)}
            {items === [] ? ('huh') : (items.map((item, i) => (
              <Item key={i} item={item} i={i === 0 ? true : false} />
            )))}
          </Carousel> */}
          {/* {reports?.map((image) =>
            image.generalReports ? (
              <img
                src={`data:image/jpeg;base64,${image.generalReports[1]}`}
                height="50%"
                width="50%"
                alt="report"
                // borderRadius="10px"
                style={{ 'border-radius': '10px' }}
              />
            ) : (
              ''
            )
          )} */}
        </Box>
      )}
    </>
  )
}

function Item(props) {
  return (
    <>
      <Box sx={{ margin: 0, padding: 0, display : "flex", justiifyContent : "space-between" }}>
        {/*
         */}
        <img
          src={`data:image/jpeg;base64,${props.item.img}`}
          height="50%"
          width="50%"
          alt="report"
          borderRadius="10px"
        />
      </Box>
    </>
  )
}

export default ViewReports
