//import * as React from 'react';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './App.css';
import { CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

const drawerWidth = 240;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function PermanentDrawerLeft() {
  const [currentAccount, setCurrentAccount] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #ddd',
    boxShadow: 24,
    p: 4,
    borderradius: 25,
  };

  const hasaccount = false;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const apiendpoint = ""

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  //gettotalusers
  /*const getTotalusers = async () => {
    const {
      data: countries,
      error,
      isValidating,
    } = useSWR('http://localhost:3000/get/totalusers', fetcher);

    console.log(countries, 'countries')
	};*/
  //gettotalwallets
  //gettotalwalletbalance
  //gettotalusers

  const {
    data: totalusers,
    error,
    isValidating,
  } = useSWR('https://novapay.live/asi/get/totalusers', fetcher, { refreshInterval: 36000000 });

  console.log(totalusers, 'countries')
  const chit = totalusers?.data

  const {
    data: user22,
    error22,
    isValidating22,
  } = useSWR('https://novapay.live/api/adminwallets', fetcher, { refreshInterval: 36000000 });
  console.log(user22, 'countries22')
  const used = user22?.data

  const {
    data: totalusers1,
    error1,
    isValidating1,
  } = useSWR('https://novapay.live/asi/get/invoicecount', fetcher, { refreshInterval: 36000000 });

  console.log(totalusers1, 'countries')
  const chit1 = totalusers1?.data

  const {
    data: totalusers2,
    error2,
    isValidating2,
  } = useSWR('https://novapay.live/asi/get/ispaid', fetcher, { refreshInterval: 36000000 });

  console.log(totalusers2, 'countries')
  const chit2 = totalusers2?.data

  const {
    data: totalusers3,
    error3,
    isValidating3,
  } = useSWR('https://novapay.live/asi/get/requestcount', fetcher, { refreshInterval: 36000000 });

  console.log(totalusers3, 'countries')
  const chit3 = totalusers3?.data


  const connectWallet = async () => {
	};

  const checkaccount = async () => {} 
  useEffect(() => {
    connectWallet();
    //getTotalusers();
}, [currentAccount]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/*<AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>*/}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
            <ListItem key="Dashboard" disablePadding>
              <Link to= "/home" className='ti'>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon /> 
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              </Link>
            </ListItem>
        </List>
        <List>
            <ListItem key="Users" disablePadding>
              <Link to= "/users" className='ti'>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon /> 
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
              </Link>
            </ListItem>
        </List>
        <List>
            <ListItem key="Admins" disablePadding>
              <Link to= "/admin" className='ti'>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon /> 
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItemButton>
              </Link>
            </ListItem>
        </List>
        <List>
            <ListItem key="Deposits" disablePadding>
              <Link to= "/deposit" className='ti'>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon /> 
                </ListItemIcon>
                <ListItemText primary="Deposits" />
              </ListItemButton>
              </Link>
            </ListItem>
        </List>
        <List>
            <ListItem key="Payouts" disablePadding>
              <Link to= "/payout" className='ti'>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon /> 
                </ListItemIcon>
                <ListItemText primary="Payouts" />
              </ListItemButton>
              </Link>
            </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
<Toolbar />

          <div class="">
            <Typography className='mb2' variant='h4'>Analytics</Typography>
            <div className='flex spacebetween width mb2'>
              <Card className='lit1 justcenter flex'>
                <CardContent className='flex aligncenter column'>
                <Typography>User Count</Typography>
                <Typography>{chit}</Typography>
                </CardContent>
              </Card>
              <Card className='lit1 justcenter aligncenter flex'>
                <CardContent className='flex aligncenter column'>
                <Typography>Total wallets</Typography>
                <Typography>{chit}</Typography>
                </CardContent>
              </Card>
              <Card className='lit1 justcenter flex'>
                <CardContent className='flex aligncenter column'>
                <Typography>Total Invoice</Typography>
                <Typography>{chit1}</Typography>
                </CardContent>
              </Card>
            </div>
            <div className='flex spacebetween width row'>
              <Card className='lit1 justcenter flex'>
                <CardContent className='flex aligncenter column'>
                <Typography>Total Invoice Paid</Typography>
              <Typography>{chit2}</Typography>
                </CardContent>
              </Card>
              <Card className='lit1 justcenter aligncenter flex'>
                <CardContent className='flex aligncenter column'>
                <Typography>Total fees in USD</Typography>
                <Typography>{used?.balanceinusd}</Typography>
                </CardContent>
              </Card>
            </div>
            <Card className='width mb2'>
                  <CardContent className='spacebetween flex'>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>Ethereum</Typography>
                    </div>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>{used?.ethbalance ? used?.ethbalance / 1000000000000000000 : 0}</Typography>
                    </div>
                  </CardContent>
                </Card>
                <Card className='width mb2'>
                  <CardContent className='spacebetween flex'>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>Solana</Typography>
                    </div>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>{used?.solbalance ? used?.solbalance / 1000000000 : 0}</Typography>
                    </div>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>{used?.soladdress ? used?.soladdress : 'none'}</Typography>
                    </div>
                  </CardContent>
                </Card>
                <Card className='width mb2'>
                  <CardContent className='spacebetween flex'>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>Tron</Typography>
                    </div>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>{used?.trxbalance ? used?.trxbalance / 1000000 : 0}</Typography>
                    </div>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>{used?.trxaddress ? used?.trxaddress : 'none'}</Typography>
                    </div>
                  </CardContent>
                </Card>
                <Card className='width mb2'>
                  <CardContent className='spacebetween flex'>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>Bitcoin</Typography>
                    </div>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>{used?.btcbalance ? used?.btcbalance / 100000000 : 0}</Typography>
                    </div>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>{used?.btcaddress ? used?.btcaddress  : 'none'}</Typography>
                    </div>
                  </CardContent>
                </Card>
                <Card className='width mb2'>
                  <CardContent className='spacebetween flex'>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>USDT</Typography>
                    </div>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>{used?.usdtbalance ? used?.usdtbalance : 0}</Typography>
                    </div>
                  </CardContent>
                </Card>
          </div>
        </Box>
    </Box>
  );
}
