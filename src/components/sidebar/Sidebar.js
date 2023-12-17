import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { AppBar, Avatar, Button, CardMedia, Toolbar, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { btn, circularImage, df_jc_ac, df_jfe_ac } from '../../theme/CssMy'
import { useContext } from 'react';
import { codivascontext } from '../../context/MainContext';
import { generateFromString } from 'generate-avatar'
import slogo from '../../images/logo.png'

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(8)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const imgStyle = {
    borderRadius: '50px'
}

const listItemBtn = {
    justifyContent: 'initial',
    px: 2.5,
}

const listItemIco = {
    minWidth: 0,
    justifyContent: 'center',
}

const gridItem = {
    padding: '8px',
    minHeight: '20px',
}

const gridcon = {
    display: 'flex',
    alignItems: 'space-between',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'space-between'
}

export default function SideDrawer(props) {
    const { children } = props
    const url = window.location.href.split('/')[3]
    const { user, setUser, setToken } = useContext(codivascontext)
    const navigate = useNavigate()
    console.log(url)
    console.log(user)
    const isBene = (JSON.parse(localStorage.getItem('codivasUser'))).type === 'beneficiary' ? true : false
console.log(isBene)
    return (
      <Box sx={{ display: 'flex' }}>
        <AppBar
          sx={{
            marginLeft: '50px',
            backgroundColor: 'white',
            color: '#375EC0',
            boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)',
          }}
        >
          <Toolbar sx={df_jfe_ac}>
            <Avatar
              sx={{ marginRight: '2%' }}
              alt={user?.phone}
              src={`data:image/svg+xml;utf8,${generateFromString(user?.phone)}`}
            />
            <Button
              sx={btn}
              onClick={() => {
                localStorage.setItem('codivasUser', null)
                localStorage.setItem('codivasToken', null)
                navigate('/login')
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent">
          <Box sx={gridcon}>
            <Box sx={{ ...df_jc_ac, marginTop: '5%' }}>
              <CardMedia
                component="img"
                image={slogo}
                sx={{ borderRadius: '50px', width: '70%', marginTop: '15%' }}
              />
            </Box>
            <Box>
              {/* {isBene ?  */}
              <List>
                <Tooltip title="Dashboard">
                  <ListItem
                    disablePadding
                    onClick={() => navigate('/')}
                    sx={{ display: 'block', marginTop: '20%' }}
                  >
                    <ListItemButton sx={listItemBtn}>
                      <ListItemIcon sx={listItemIco}>
                        <Icon
                          icon="material-symbols:home-rounded"
                          color={url === '' ? '#375EC0' : '#6A707F'}
                          width="26"
                          height="26"
                        />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
                <Tooltip title="Patients">
                  <ListItem
                    disablePadding
                    onClick={() => navigate('/allpatients')}
                    sx={{ display: 'block', marginTop: '20%' }}
                  >
                    <ListItemButton sx={listItemBtn}>
                      <ListItemIcon sx={listItemIco}>
                        <Icon
                          color={
                            url.includes('allpatients') ? '#375EC0' : '#6A707F'
                          }
                          icon="material-symbols:patient-list"
                          width="30"
                          height="30"
                        />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
                <Tooltip title="Appointments">
                  <ListItem
                    disablePadding
                    onClick={() => navigate('/appointments')}
                    sx={{ display: 'block', marginTop: '20%' }}
                  >
                    <ListItemButton sx={listItemBtn}>
                      <ListItemIcon sx={listItemIco}>
                        <Icon
                          color={
                            url.includes('appointments') ? '#375EC0' : '#6A707F'
                          }
                          icon="teenyicons:appointments-solid"
                          width="24"
                          height="24"
                        />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              </List>
              {/* : <>
                        <List>
                            <Tooltip title="Dashboard">
                                <ListItem disablePadding onClick={() => navigate('/')} sx={{ display: 'block', marginTop: '20%' }}>
                                    <ListItemButton sx={listItemBtn}>
                                        <ListItemIcon sx={listItemIco}>
                                            <Icon icon="material-symbols:home-rounded" color={url === '' ? '#375EC0' : '#6A707F'} width='26' height='26' />
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                            </Tooltip>
                            <Tooltip title="Create e-RUPI">
                                <ListItem disablePadding onClick={() => navigate('/bank/createerupi')} sx={{ display: 'block', marginTop: '20%' }}>
                                    <ListItemButton sx={listItemBtn}>
                                        <ListItemIcon sx={listItemIco}>
                                            <Icon color={url.includes('bank') ? '#375EC0' : '#6A707F'} icon="basil:add-solid" width='24' height='24' />
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                            </Tooltip>
                            <Tooltip title="View Vouchers">
                                <ListItem disablePadding onClick={() => navigate('/viewvouchers')} sx={{ display: 'block', marginTop: '20%' }}>
                                    <ListItemButton sx={listItemBtn}>
                                        <ListItemIcon sx={listItemIco}>
                                            <Icon color={url.includes('viewvouchers') ? '#375EC0' : '#6A707F'} icon="mdi:tag" width='24' height='24' />
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                            </Tooltip>
                            
                            </List>
                        </>} */}
            </Box>
            <Box></Box>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    )
}