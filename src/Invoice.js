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
  const [id, setId] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const [value, setValue] = React.useState(0);
  const [shopname, setShopname] = useState();
  const [email, setEmail] = useState();
  const [connectedaddress, setConnectedaddress] = useState();
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

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  //createuser
  async function createuser(shop, email, connectedaddress) {
    const urlencoded = new URLSearchParams()
    urlencoded.append("shop", shop)
    urlencoded.append("email", email)
    urlencoded.append("connectedaddress", connectedaddress)
      return fetch('https://novapay.live/asi/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlencoded
      })
        .then(data => data.json()
      )
     }
  //getall invoice
  const {
    data: getusers,
    error,
    isValidating,
  } = useSWR('https://novapay.live/asi/get/totalinvoice', fetcher, { refreshInterval: 36000000 });
  console.log(getusers, 'countries')
  const usermap = getusers?.data


  //getuser 
  async function getuser(id) {
    return usermap[id]
  }
  //deleteuser
  async function deleteuser(shop) {
    const urlencoded = new URLSearchParams()
    urlencoded.append("shop", shop)
      return fetch('https://novapay.live/asi/user/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlencoded
      })
        .then(data => data.json()
      )
     }
  //edituser
  async function edituser(shop, connectedaddress, email) {
    const urlencoded = new URLSearchParams()
    urlencoded.append("shop", shop)
    urlencoded.append("connectedaddress", connectedaddress)
    urlencoded.append("email", email)
      return fetch('https://novapay.live/asi/user/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlencoded
      })
        .then(data => data.json()
      )
     }
  //blockuser
  async function blockuser(shop) {
    const urlencoded = new URLSearchParams()
    urlencoded.append("shop", shop)
      return fetch('https://novapay.live/asi/user/block', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlencoded
      })
        .then(data => data.json()
      )
     }
  //updateuserrole
  async function updaterole(shop, role) {
    const urlencoded = new URLSearchParams()
    urlencoded.append("shop", shop)
    urlencoded.append("role", role)
      return fetch('https://novapay.live/asi/user/addrole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlencoded
      })
        .then(data => data.json()
      )
     }

  const hasaccount = false;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const connectWallet = async () => {
	};

  async function logout() {
    return fetch('https://novapay.live/asi/logout', {
      method: 'POST',
    })
   }

  const handleSubmit = async e => {
    e.preventDefault();
    let user = createuser(shopname, email, connectedaddress)
    //props.history.push("/");
  }

  const checkaccount = async () => {} 
  useEffect(() => {
    connectWallet();
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
        <List>
            <ListItem key="Refunds" disablePadding>
              <Link to= "/refund" className='ti'>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon /> 
                </ListItemIcon>
                <ListItemText primary="Refunds" />
              </ListItemButton>
              </Link>
            </ListItem>
        </List>
        <Button className='lit4 justcenter flex' variant="contained" onClick={logout}>Logout</Button>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {/*<Toolbar />*/}
        <div class="">
            <div className='mb5 flex width spacebetween'>
            <Typography variant='h4' className=''>Deposits</Typography>
            </div>
        <Card className='width'>
              <div className='spacearound flex mt2 bottom'>
                 <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Transaction id</Typography>
                  </div>
                  <Divider />
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Shop</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Time</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>amount</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>admin fee</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Paid in</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Status/isconfirmed</Typography>
                  </div>
                  </div>
            {usermap?.map((user) => (
              <CardContent className='spacearound flex bottom'>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      {/*<Typography>Shopname</Typography>*/}
                      <Typography>{user?.transactionhash.slice(0, 6)}...{user?.transactionhash.slice(-4)}</Typography>
                  </div>
                  <Divider />
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      {/*<Typography>Email</Typography>*/}
                      <Typography>{user?.shop}</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      {/*<Typography>Deposits</Typography>*/}
                      <Typography>{new Date(user?.date).toDateString()}</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      {/*<Typography>Deposits</Typography>*/}
                      <Typography>{user?.amount}</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      {/*<Typography>Deposits</Typography>*/}
                      <Typography>{user?.amount * Number(user?.adminshare ? user?.adminshare : 0) / 100}</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      {/*<Typography>Deposits</Typography>*/}
                      <Typography>{user?.paidin}</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      {/*<Typography>payouts</Typography>*/}
                      <Typography>{user?.isconfirmed == true ? "true" : "false"}</Typography>
                  </div>
              </CardContent>
            ))}
            </Card>
        </div>
        </Box>
    </Box>
  );
}
