
//import React from 'react'

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Login() {

  let [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  let navigate=useNavigate();

//onchange
  const handleSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      [event.target.name]: event.target.value
    });

    //   data = new FormData(event.currentTarget);
    //     console.log({
    //     name: data.get("name"), 
    //     email: data.get("email"),
    //     password: data.get("password"),
    //  });
  };
//sending  button click login data db
  function logindata() {

    let userData = {
      name: data.name,
      email: data.email,
      password: data.password
    };
    console.log(userData);
    if(data.name!== " " && data.email!== "" && data.password!==""){

    axios.post(process.env.base_url + "authentication/login/", userData)
      .then((res) => {
        
        // console.log(response.status, response.data.token);
        // localStorage.setItem('users',JSON.stringify(userData));

        console.log(res.data);

      })
      .catch((error) => {
        console.log(error);
      })
   
navigate("/signin")
}
  }













  return (
    // className=" bgcolor: text.primary"
    <div >
      <Container component="main" maxWidth="xs"  >
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
          }}
        >
          <Typography component="h1" variant="h5">
          Registration 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>



            <TextField
              margin="normal"
              required
              fullWidth

              id="name"
              label="Name"
              type="text"
              name="name"
             // autoComplete="name"
              autoFocus
              onChange={handleSubmit}
            />


            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleSubmit}
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
              onChange={handleSubmit}
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={logindata}


            >
              Sign Up
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link to="/layout/dashboard" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Do have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>


    </div>
  )
}
