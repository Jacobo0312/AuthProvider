import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import UserService from '../services/users.services';
import { User } from '../interfaces/User';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function SignIn() {

  const userService = new UserService();
  const navigate = useNavigate();


  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");

  const handleSubmit = async  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.length == 0 && password.length == 0) {
      alert("Please fill all the fields");
      return;
    }

    const userCredentials:User = {
      username: username,
      password: password,
    }
    console.log(userCredentials);

    try{

    const response =await userService.login(userCredentials)

    if(response.status===200){
        localStorage.setItem("username", username);
       navigate("/home");
    }else{
      alert("Username or password incorrect");
    }
  }catch(error){
    alert("Username or password incorrect");
  }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(event)=> setUsername(event.target.value)}
            />
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
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}