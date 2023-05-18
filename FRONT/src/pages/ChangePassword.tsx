import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import UserService from '../services/users.services';
import { User } from '../interfaces/User';
import '../styles/ChangePassword.css'

 


export default function ChangePassword() {

  const userService = new UserService();

  const[password, setPassword] = useState("");
  const[newPassword, setNewPassword] = useState("");
  const [confNewPassword,setConfNewPassword] = useState("");


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length == 0 && newPassword.length == 0 && confNewPassword.length == 0) {
      alert("Please fill all the fields");
      return;
    }


    // userService.changePassword(userCredentials).then((response) => {
    //   const user = response as User;


    // if(user){
    //   localStorage.setItem("user", JSON.stringify(user));
    //   window.location.href = "/Home";
    // }else{
    //   alert("Invalid credentials");
    // }

    // })



  };

  return (
      <Container component="main" maxWidth="xs" className='modal'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event)=> setPassword(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="newPassword"
              id="newPassword"
              autoComplete="current-password"
              onChange={(event)=> setNewPassword(event.target.value)}
            />
            <TextField
            margin="normal"
            required
            fullWidth
            name="newConfPassword"
            label="Confirm Password"
            type="newConfPassword"
            id="newConfPassword"
            autoComplete="current-password"
            onChange={(event)=> setConfNewPassword(event.target.value)}
          />


          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Container>
  );
}