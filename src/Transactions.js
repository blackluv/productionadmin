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
import { ethers } from "ethers";
import { useParams } from 'react-router-dom';

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
  //const [id, setId] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const [value, setValue] = React.useState(0);
  const [shopname, setShopname] = useState();
  const [email, setEmail] = useState();
  const [solhi, setSolhi] = useState();
  const [connectedaddress, setConnectedaddress] = useState();
  const { id } = useParams();
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

     //getusers with id

     const {
      data: user22,
      error22,
      isValidating22,
    } = useSWR('https://novapay.live/api/wallets?api=' + id, fetcher, { refreshInterval: 36000000 });
    console.log(user22, 'countries22')
    console.log('api', 'https://novapay.live/api/wallets?api=' + id)
    const used = user22?.data

    const {
      data: user50,
      error50,
      isValidating50,
    } = useSWR('https://novapay.live/api/get/userapi?shop=' + id, fetcher, { refreshInterval: 36000000 });
    console.log(user50, 'countries50')
    const used5 = user50?.data

    const {
      data: user100,
      error100,
      isValidating100,
    } = useSWR('https://api.trongrid.io/v1/accounts/' + used?.trxaddress + '/transactions', fetcher, { refreshInterval: 3600000 });
  
    console.log( used?.trxaddress, 'trx')
  
    const rest1 = user100?.data
  
    const {
      data: user200,
      error200,
      isValidating200,
    } = useSWR('https://api.blockcypher.com/v1/btc/main/addrs/' + used?.btcaddress, fetcher, { refreshInterval: 3600000 });
  
    console.log(used?.btcaddress, 'btc')
  
    const rest2 = user200?.txrefs

    const getsol = async () => {
      var myHeaders = new Headers();
    myHeaders.append("x-api-key", "vXLwVmfF1Ipdu4aR");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    let solhi = fetch(
      'https://api.shyft.to/sol/v1/transaction/history?network=mainnet-beta&tx_num=2&account='+ used?.soladdress +'&enable_raw=true',
      requestOptions
    )
      .then(response => response.text())
      .then(result => console.log(result.result, 'solhistory'))
      .catch(error => console.log('error', error));
    
      setSolhi(solhi.result ? solhi.result : [])
    }
    
    const { data15, error15 } = useSWR('getsol', getsol, { refreshInterval: 36000 })

    const {
      data: user7,
      error7,
      isValidating7,
    } = useSWR('https://api.etherscan.io/api?module=account&action=txlist&address=' + used5?.connectedaddress + '&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=5MB1DN839Y3E8YUQGE5WAB7R522FKYUD7Y', fetcher, { refreshInterval: 3600000 });
  
    console.log(user7?.result, 'usertx')
  
    const rest = user7?.result

  const {
    data: getusers,
    error,
    isValidating,
  } = useSWR('https://novapay.live/asi/get/getsingleshoptx?shop=' + used5?.shop, fetcher, { refreshInterval: 36000000 });
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
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {/*<Toolbar />*/}
        <div class="">
            <div className='mb5 flex width spacebetween'>
            <Typography variant='h4' className=''>User Transactions</Typography>
            </div>

            <div className='flex spacebetween'>
        <Card className='halfwidth'>
              <div className='spacearound flex mt2 bottom'>
                 <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Transaction id</Typography>
                  </div>
                  <Divider />
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Shopname</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Amount</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>Status</Typography>
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
                      <Typography>{user?.amount}</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      {/*<Typography>payouts</Typography>*/}
                      <Typography>{user?.isconfirmed == true ? "true" : "false"}</Typography>
                  </div>
              </CardContent>
            ))}
            </Card>
            <Card className='halfwidth'>
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
                <Card className='width mb2'>
                  <CardContent className='spacebetween flex'>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>USDT-TRC20</Typography>
                    </div>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>{used?.usdttrxbalance ? used?.usdttrxbalance : 0}</Typography>
                    </div>
                  </CardContent>
                </Card>
                <Typography className='mb2'>Merchant Wallet Transactions</Typography>
              <div className='spacearound flex mt2 bottom column'>
                  {/*rest ? rest?.map((rest) => (
                    <Card className='width mb2'>
                      <CardContent className='spacebetween flex'>
                        <div className='justcenter flex aligncenter column'>
                          <Typography>Transaction Hash</Typography>
                          <Typography> {rest?.hash.slice(0, 6)}...{rest?.hash.slice(-4)}</Typography>
                        </div>
                        <div className='justcenter flex aligncenter column'>
                          <Typography>Confirmation</Typography>
                          <Typography>{rest?.confirmations}</Typography>
                        </div>
                        <div className='justcenter flex aligncenter column'>
                          <Typography>Amount</Typography>
                          <Typography>{Math.round(ethers.utils.formatEther(rest?.value) * 1e2) / 1e2}</Typography>
                        </div>
                        <div className='justcenter flex aligncenter column'>
                          <Typography>To Address</Typography>
                          <Typography>{rest?.to.slice(0, 6)}...{rest?.to.slice(-4)}</Typography>
                        </div>
                      </CardContent>
                    </Card>
                    )) : <Typography></Typography>*/}
                  {rest1 ? rest1?.map((rest1) => (
                    <Card className='width mb2'>
                      <CardContent className='spacebetween flex'>
                        <div className='justcenter flex aligncenter column'>
                          <Typography>Transaction Hash</Typography>
                          <Typography> {rest1?.txID.slice(0, 6)}...{rest1?.txID.slice(-4)}</Typography>
                        </div>
                        <div className='justcenter flex aligncenter column'>
                          <Typography>Confirmation</Typography>
                          <Typography>{rest1?.ret[0].contractret}</Typography>
                        </div>
                        <div className='justcenter flex aligncenter column'>
                          <Typography>Amount</Typography>
                          <Typography>{rest1?.raw_data.contract[0].parameter.value.amount}</Typography>
                        </div>
                        <div className='justcenter flex aligncenter column'>
                          <Typography>To Address</Typography>
                          <Typography>{rest1?.raw_data.contract[0].parameter.value.to_address.slice(0, 6)}...{rest1?.raw_data.contract[0].parameter.value.to_address.slice(-4)}</Typography>
                        </div>
                      </CardContent>
                    </Card>
                    )) : <Typography></Typography>}
                  {rest2 ? rest2?.map((rest2) => (
                    <Card className='width mb2'>
                      <CardContent className='spacebetween flex'>
                        <div className='justcenter flex aligncenter column'>
                          <Typography>Transaction Hash</Typography>
                          <Typography> {rest2?.tx_hash.slice(0, 6)}...{rest2?.tx_hash.slice(-4)}</Typography>
                        </div>
                        <div className='justcenter flex aligncenter column'>
                          <Typography>Confirmation</Typography>
                          <Typography>{rest2?.confirmations}</Typography>
                        </div>
                        <div className='justcenter flex aligncenter column'>
                          <Typography>Amount</Typography>
                          <Typography>{rest2?.value / 100000000}</Typography>
                        </div>
                      </CardContent>
                    </Card>
                    )) : <Typography></Typography>}
                  {solhi ? solhi?.map((resp) => (
                <Card className='width mb2'>
                  <CardContent className='spacebetween flex'>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>Sender</Typography>
                      <Typography> {resp?.info.sender.slice(0, 6)}...{resp?.info.sender.slice(-4)}</Typography>
                    </div>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>Amount</Typography>
                      <Typography>{resp?.info.amount}</Typography>
                    </div>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>Type</Typography>
                      <Typography>Solana</Typography>
                    </div>
                    <div className='justcenter flex aligncenter column'>
                      <Typography>Reciever</Typography>
                      <Typography>{resp?.info.reciever.slice(0, 6)}...{resp?.info.reciever.slice(-4)}</Typography>
                    </div>
                  </CardContent>
                </Card>
                )) : <Typography></Typography>}
              </div>
            {/*usermap?.map((user) => (
              <CardContent className='spacearound flex bottom'>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>{user?.transactionhash.slice(0, 6)}...{user?.transactionhash.slice(-4)}</Typography>
                  </div>
                  <Divider />
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>{user?.shop}</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>setdate</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>{user?.amount}</Typography>
                  </div>
                  <div className='justcenter flex aligncenter column width20 mb2'>
                      <Typography>{user?.status ? user?.status : "false"}</Typography>
                  </div>
              </CardContent>
            ))*/}
            </Card>
            </div>
        </div>
        </Box>
    </Box>
  );
}
