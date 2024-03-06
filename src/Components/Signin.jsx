
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signin() {
    let [data,setData]=useState({
        email:"",
        password:""
});

let navigate=useNavigate();

     function handleSubmit(e){
        e.preventDefault();
        setData({...data,[e.target.id]:e.target.value});
     }

     function signinindata(){
        axios.post("http://localhost:8081/authentication/login/", data)
        .then((res)=>{
          if(res.data.status == "success"){
            localStorage.setItem("user", JSON.stringify(res.data.data));
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("usertype", "admin");
            navigate("/layout/dashboard")
          }
          else{
            alert(res.data.data);
          }
        })
.catch((err)=>{
    console.log(err);
})
   }


  return (
    <div style={{ backgroundColor: "#f0f0f0" ,display:'flex',minHeight: '100vh'}}>
    
    <Container component="main" maxWidth="xs"  >
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor:'InfoBackground'
          

          }}
        >
 <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              
            //   autoComplete="email"
            //   autoFocus
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
              
              onChange={handleSubmit}
            />

             <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signinindata}


            >
              Sign In
            </Button>
            </Box>
        </Box>
      </Container>


    </div>
  )
}
