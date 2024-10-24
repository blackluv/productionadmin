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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
  const handleOpen1 = () => setOpen1(true);
  const handleOpen2 = () => setOpen2(true);
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => setOpen2(false);
  const [value, setValue] = React.useState(0);
  const [shopname, setShopname] = useState();
  const [email, setEmail] = useState();
  const [key, setKey] = useState();
  const [shopname1, setShopname1] = useState();
  const [shopname2, setShopname2] = useState();
  const [email1, setEmail1] = useState();
  const [email2, setEmail2] = useState();
  const [connectedaddress, setConnectedaddress] = useState();
  const [newapi, setnewApi] = useState();
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
    urlencoded.append("key", key)
      return fetch('https://novapay.live/api/create/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlencoded
      })
        .then(data => data.json()
      )
     }
  //getuser - we 
  const {
    data: getusers,
    error,
    isValidating,
  } = useSWR('https://novapay.live/asi/get/allusers', fetcher, { refreshInterval: 36000000 });
  console.log(getusers?.data[0], 'countries')
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

async function enableuser(shop) {
  const urlencoded = new URLSearchParams();
  urlencoded.append("api", shop);

  try {
    const response = await fetch('https://novapay.live/api/enablewhitelabel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: urlencoded
    });

    const data = await response.text();
    console.log(data, 'data')

    // Alert the response data
    alert(data); // Convert to string for better readability
    return data; // Optionally return the data for further use
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function disableuser(shop) {
  const urlencoded = new URLSearchParams();
  urlencoded.append("api", shop);

  try {
    const response = await fetch('https://novapay.live/api/disablewhitelabel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: urlencoded
    });

    const data = await response.text();
    console.log(data, 'data')

    // Alert the response data
    alert(data); // Convert to string for better readability
    return data; // Optionally return the data for further use
  } catch (error) {
    alert('Error: ' + error.message);
  }
}
  //edituser
  async function edituser(shop, connectedaddress, email, key) {
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

     //setfee
     async function setfee(_shopname1) {
      const urlencoded = new URLSearchParams()
      urlencoded.append("deposit", shopname1)
      urlencoded.append("withdraw", email1)
      urlencoded.append("api", newapi)
        return fetch('https://novapay.live/asi/user/editfee', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: urlencoded
        })
          .then(data => data.json()
        )
       }

       async function setfee1(_shopname1) {
        const urlencoded = new URLSearchParams()
        urlencoded.append("time", shopname2)
          return fetch('https://novapay.live/asi/user/edittime', {
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

     async function Logout() {
        return fetch('https://novapay.live/asi/logout', {
          method: 'GET',
        })
          .then(data => data.json()
        )
       }

  const hasaccount = false;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange500 = (event) => {
    setnewApi(event.target.value);
    console.log(event.target.value, 'newapi')
  };

  const setdit = async () => {

	};

  async function logout() {
    return fetch('https://novapay.live/asi/logout', {
      method: 'POST',
    })
   }

  const handleSubmit = async e => {
    e.preventDefault();
    let user = await createuser(shopname, email, connectedaddress, key)
    //props.history.push("/");
  }

  const handleSubmit1 = async e => {
    e.preventDefault();
    let user = await setfee(shopname1)
    console.log(user, 'user')
    //props.history.push("/");
  }

  const handleSubmit2 = async e => {
    e.preventDefault();
    let user = await setfee1(shopname2)
    console.log(user, 'user')
    //props.history.push("/");
  }

  const checkaccount = async () => {} 
  /*useEffect(() => {
    connectWallet();
}, [currentAccount]);*/

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
        {/*<Button variant='contained' onClick={Logout}>Logout</Button>*/}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {/*<Toolbar />*/}
        <div class="">
            <div className='mb5 flex width spacebetween'>
            <Typography variant='h4' className=''>Novapay Users</Typography>
            <Button variant='contained' onClick={handleOpen}>Create Merchant</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Card className='width'>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Shopname"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type='text'
                            onChange={e => setShopname(e.target.value)}
                        />
                        <TextField
                            label="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type='email'
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            label="connectedaddress"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type='text'
                            onChange={e => setConnectedaddress(e.target.value)}
                        />
                        <TextField
                            label="Set keys"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type='text'
                            onChange={e => setKey(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className='width'
                        >
                            Submit
                        </Button>
                    </form>
                  </CardContent>
                  </Card>
              </Box>
            </Modal>
            </div>
            <Card className='width'>
              <div className='spacearound flex mt2 bottom'>
                 <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Shopname</Typography>
                  </div>
                  <Divider />
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Email</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Deposits</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Deposit Fee</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Withdrawal Fee</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Actions</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Set Expiry</Typography>
                  </div>
                  </div>
            {usermap?.map((user) => (
              <CardContent className='spacearound flex bottom'>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      {/*<Typography>Shopname</Typography>*/}
                      <Typography>{user?.shop}</Typography>
                  </div>
                  <Divider />
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      {/*<Typography>Email</Typography>*/}
                      <Typography>{user?.email}</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      {/*<Typography>Deposits</Typography>*/}
                      <Typography>0</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      {/*<Typography>Deposits</Typography>*/}
                      <Typography>{user?.depositfee}</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      {/*<Typography>Deposits</Typography>*/}
                      <Typography>{user?.withdrawfee}</Typography>
                  </div>
                  <div className='width10 spacebetween'>
                    <Button variant="contained" className='width5' onClick={() => deleteuser(user?.shop)}>Delete</Button>
                    <Button variant="contained" className='width5' onClick={() => blockuser(user?.shop)}>Block</Button>
                    <Button variant="contained" className='width5' onClick={handleOpen1}>Set Fee</Button>
                    <Modal
                        open={open1}
                        onClose={handleClose1}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Card className='width'>
                            <CardContent>
                              <form onSubmit={handleSubmit1}>
                                  <TextField
                                      label="Set deposit fee"
                                      variant="outlined"
                                      fullWidth
                                      margin="normal"
                                      type='text'
                                      onChange={e => setShopname1(e.target.value)}
                                  />
                                  <TextField
                                      label="Set withdraw fee"
                                      variant="outlined"
                                      fullWidth
                                      margin="normal"
                                      type='text'
                                      onChange={e => setEmail1(e.target.value)}
                                  />
                                  <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label">Select Api</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={newapi}
                                        label="Payment Token"
                                        onChange={handleChange500}
                                      >
                                      {usermap?.map((user) => (
                                        <MenuItem value={user?.apikey}>{user?.shop}</MenuItem>
                                      ))}
                                      </Select>
                                    </FormControl>
                                  </Box>
                                  <Button
                                      variant="contained"
                                      color="primary"
                                      type="submit"
                                      className='width'
                                  >
                                      Submit
                                  </Button>
                              </form>
                            </CardContent>
                            </Card>
                        </Box>
                      </Modal>
                    <Link to={'/transaction/' + user?.apikey }><Button variant="contained" className='width5' >View</Button></Link>
                  </div>
                  <div className='width10'>
                    <Button variant="contained" className='width5' onClick={handleOpen2}>Set Expiry</Button>
                    <Modal
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Card className='width'>
                            <CardContent>
                              <form onSubmit={handleSubmit2}>
                                  <TextField
                                      label="Set time in unix"
                                      variant="outlined"
                                      fullWidth
                                      margin="normal"
                                      type='text'
                                      onChange={e => setShopname2(e.target.value)}
                                  />
                                  <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label">Select Api</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={newapi}
                                        label="Payment Token"
                                        onChange={handleChange500}
                                      >
                                        {usermap?.map((user) => (
                                        <MenuItem value={user?.apikey}>{user?.shop}</MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Box>
                                  <Button
                                      variant="contained"
                                      color="primary"
                                      type="submit"
                                      className='width'
                                  >
                                      Submit
                                  </Button>
                              </form>
                            </CardContent>
                            </Card>
                        </Box>
                      </Modal>
                      <Button variant="contained" className='width5' onClick={() => enableuser(user?.apikey)}>Enable Label</Button>
                      <Button variant="contained" className='width5' onClick={() => disableuser(user?.apikey)}>Disable Label</Button>
                  </div>
              </CardContent>
            ))}
            </Card>
          </div>
        </Box>
    </Box>
  );
}
                    {/*<CardContent className='spacearound flex'>
                    usermap?.map((user) => (
                                    <div className='justcenter flex aligncenter column width20 mb2'>
                                      <Typography>Shopname</Typography>
                                      <Typography>{user?.shop}</Typography>
                                    </div>
                                    <div className='justcenter flex aligncenter column width20 mb2'>
                                      <Typography>Email</Typography>
                                      <Typography>{user?.email}</Typography>
                                    </div>
                                    <div className='justcenter flex aligncenter column width20 mb2'>
                                      <Typography>Deposits</Typography>
                                      <Typography>getdeposits</Typography>
                                    </div>
                                    <div className='justcenter flex aligncenter column width20 mb2'>
                                      <Typography>payouts</Typography>
                                      <Typography>getcount</Typography>
                                    </div>
                                                ))
                    </CardContent>*
                    <CardActions> usermap?.map((user) => (
                       {/*<Button variant="contained" onClick={() => deleteuser(user?.shop)}>Delete</Button>*/
                       /*<Button variant="contained" onClick={() => blockuser(user?.shop)}>Block</Button>*/
                    /*</CardActions>*/}
