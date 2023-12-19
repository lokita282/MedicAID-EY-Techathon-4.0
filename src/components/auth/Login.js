import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import React, { useContext, useState } from 'react'
import {
  bold_name,
  btn_connect,
  circularprog,
  df_jc_ac,
  df_jfs_ac,
  df_jfs_ac_fdc,
  link,
  ptag,
  textField,
} from '../../theme/CssMy'
import { useNavigate } from 'react-router'
import { login } from '../../services/userServices'
import { eycontext } from '../../context/MainContext'
import successHandler from '../toasts/successHandler'
import errorHandler from '../toasts/errorHandler'

export default function Login() {
  const navigate = useNavigate()
  const { user, setUser, token, setToken } = useContext(eycontext)
  const [load, setLoad] = useState(false)
  const [json, setJson] = useState({
    phone: '',
    password: '',
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setJson({ ...json, [name]: value })
  }

  const clickSubmit = async () => {
    setLoad(true)
    if (json.email && json.password) {
      await login(json)
        .then((res) => {
          console.log(res.data)
          localStorage.setItem('eyToken', res.data.token)
          localStorage.setItem('eyUser', JSON.stringify(res.data.user))
          setUser(res.data.user)
          setToken(res.data.token)
          successHandler(res.data.message)
          navigate('/')
          setLoad(false)
        })
        .catch((e) => {
          errorHandler('Login failed')
          setLoad(false)
        })
    } else {
      !json.email && errorHandler('Email cannot be empty')
      !json.password && errorHandler('Password cannot be empty')
      setLoad(false)
    }
  }

  return (
    <>
      <Box sx={{ ...df_jfs_ac, height: '100%', padding: '0 15%' }}>
        <Box sx={{ ...df_jfs_ac_fdc, width: '100%' }}>
          <Grid container rowSpacing={3}>
            <Grid item md={12}>
              <Typography variant="h5" sx={{ ...bold_name }}>
                Welcome back!
              </Typography>
            </Grid>
            <Grid item md={12}>
              <p style={ptag}>Email</p>
              <TextField
                sx={textField}
                value={json.email}
                name="email"
                onChange={handleChange}
                placeholder="Email"
              />
            </Grid>
            <Grid item md={12}>
              <p style={ptag}>Password</p>
              <TextField
                sx={textField}
                type="password"
                value={json.password}
                name="password"
                onChange={handleChange}
                placeholder="Password"
              />
            </Grid>
            <Grid md={12} item sx={df_jfs_ac}>
              Don't have an account? &nbsp;{' '}
              <p style={link} onClick={() => navigate('/signup/beneficiary')}>
                {' '}
                Signup{' '}
              </p>
            </Grid>
            <Grid item md={12}>
              {load ? (
                <Box sx={df_jc_ac}>
                  <CircularProgress size={30} sx={circularprog} />
                </Box>
              ) : (
                <Button sx={btn_connect} onClick={clickSubmit}>
                  Login
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}
