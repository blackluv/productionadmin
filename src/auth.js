//import * as React from 'react';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import './App.css';

async function loginUser(credentials) {
  console.log('credentials', credentials.username)
  const urlencoded = new URLSearchParams()
  urlencoded.append("username", credentials.username)
  urlencoded.append("password", credentials.password)
    return fetch('https://novapay.live/asi/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: urlencoded
    })
      .then(data => data.json()
    )
   }

export default function Login({ setToken }) {
    const addUser = () => {}
    const navigate = useNavigate();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        console.log(token, 'token')
        setToken(token);
        navigate("/settings");

        //props.history.push("/");
      }
  return (
    <Box className='flex'>
    <div className='vertical-center1'>
            <Card >
                <CardContent>
                    <Typography className='mb5'> LOGIN TO ADMIN PANEL</Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type='text'
                        onChange={e => setUserName(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className='width'
                    >
                        login
                    </Button>
                </form>
                </CardContent>
                {/*<CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>*/}
            </Card>
    </div>
    </Box>
  );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }
