import { React, useState, useEffect } from 'react'
import { Grid, Paper, Typography, Chip, Avatar } from '@mui/material'
import { weeklyTrending } from '../../services/bankServices'

const styles = {
  gradientText: {
    background: 'radial-gradient( #069B67, #005739)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    margin: '20px',
    display: 'flex',
    justifyContent: 'start',
  },
}

const TrendingAssets = () => {
  const [trendingAssets, setTrendingAssets] = useState([])

  useEffect(() => {
    const func = async () => {
      await weeklyTrending().then((res) => {
        console.log('trending')
        console.log(res.data.data.trendingAssets)
        setTrendingAssets(res.data.data.trendingAssets.slice(0, 4))
      })
    }
    func()
  }, [])

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 3 }}>
        {trendingAssets.map((asset) => {
          return (
            <Grid item xs={6}>
              <Paper>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid item xs={8}>
                    <Typography variant="h6" style={styles.gradientText}>
                      <b>
                        {asset.category[0].toUpperCase() +
                          asset.category.substring(1)}
                      </b>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    {asset.change === 'inc' ? (
                      <Chip
                        label={
                          asset.change === 'inc'
                            ? '+' + asset.percent + '%'
                            : '-' + asset.percent + '%'
                        }
                        // color={asset.change === 'inc' ? 'success' : 'error'}

                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mt: 2.5,
                          mr: 1,
                          backgroundColor: '#009946',
                          color: '#fff',
                        }}
                      />
                    ) : (
                      <Chip
                        label={
                          asset.change === 'inc'
                            ? '+' + asset.percent + '%'
                            : '-' + asset.percent + '%'
                        }
                        // color={asset.change === 'inc' ? 'success' : 'error'}

                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mt: 2.5,
                          mr: 1,
                          backgroundColor: '#EA323E',
                          color: '#fff',
                        }}
                      />
                    )}
                  </Grid>
                </div>
                <Avatar
                  alt="Remy Sharp"
                  src={asset.icon}
                  sx={{ width: 80, height: 80, m: 'auto' }}
                />{' '}
                {/*icon for the resp category*/}
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ fontFamily: 'Poppins', padding: 2 }}
                >
                  Revenue Generated:
                  <br />
                  <b> ₹{asset.revenue}</b>
                </Typography>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default TrendingAssets
