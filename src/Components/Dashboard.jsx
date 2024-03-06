import { Grid, colors } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
var getHeaders = require('../Common.js').getHeaders;
//import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//import CardActions from '@mui/material/CardActions';
//import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';

//import env from './component/.env';

// import Box from '@mui/material/Box';
// import Layout from './Layout';






export default function Dashboard() {
let [totalproduct,setTotalProduct]=useState(0)
let [totalusers,setTotalUsers]=useState(0)
let [totalsales,setTotalSales]=useState(0)
//let [totalsalesdet,setTotalSalesDet]=useState(0)
let[chartdata,setChartData] =useState([]);



  useEffect(()=>{

    onload();
  },[])
  
  
  
  //getting product data
  function onload(){    
  axios.get("http://127.0.0.1:8081/users/", getHeaders())
    .then((resp)=>{
      console.log(resp.data.data.length);
      setTotalUsers(resp.data.data.length);

    })
    .catch((error)=>{
      console.log(error);

    })
  
    axios.get("http://127.0.0.1:8081/products/")
    
        .then((resp)=>{
          console.log(resp.data.data.length);
          setTotalProduct(resp.data.data.length);
  
        })
        .catch((error)=>{
          console.log(error);
  
        })

        axios.get("http://127.0.0.1:8081/sales/")
        .then((resp)=>{
          console.log(resp.data.data.length);
          setTotalSales(resp.data.data.length);

        setChartData(resp.data.data);

          
  
        })
        .catch((error)=>{
          console.log(error);
  
        })
  
      
       }


 const colors = ['#e91e63', '#6d1b7b', '#2c387e'];
       const xAxisData = chartdata.map(entry => new Date (entry.cdate).toLocaleDateString());
       const yAxisData = chartdata.map(entry => entry.grandTotal);
  
  return (

   
  <>
  
    

    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={3}>

  <Card sx={{ mt:3, backgroundColor:"#af52bf",color:"white"}}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{textAlign:"center"}}>
       <span> {totalusers} </span>
      <p>  Users</p>
        </Typography>
    
      </CardContent>
    
    </Card>

  
  </Grid>
  <Grid item xs={4}>

  <Card sx={{ mt:3 ,backgroundColor:"#ffa733",color:"white"}}>
    
    <CardContent>
      <Typography gutterBottom variant="h5" component="div" style={{textAlign:"center"}}>
     <span> {totalproduct}</span>
    <p>  Products</p>
      </Typography>
  
    </CardContent>
  
  </Card>



  </Grid>


  <Grid item xs={4}>
<Card sx={{  mt:3, backgroundColor:"#f73378",color:"white"}}>
        <CardContent>
      <Typography gutterBottom variant="h5" component="div" style={{textAlign:"center"}}>
     <span> {totalsales}</span>
      <p>sales</p>
      </Typography>
  
    </CardContent>
  
  </Card>

  </Grid>



</Grid>

{/* start of chart */}
{/*  
<BarChart
      xAxis={[{ scaleType: 'band', data: xAxisData }]}
      series={[{ type: 'bar', data: yAxisData }]} 
      width={500}
      height={300}
    />  */}


{/* <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
      {/* Your card components */}
    {/* </Grid> */}

  

    {/* Conditionally render the chart */}
    {/* {chartdata.length > 0 && (
      <BarChart 
        xAxis={[{ scaleType: 'band', data: xAxisData }]}
        series={[{ type: 'bar', data: yAxisData, color: colors}]} 
        width={500}
        height={300}
      
       
      /> 
    )} */}

    <div style={{ marginLeft: '200px', textAlign: 'center' }}> {/* Center the chart container */}
  {chartdata.length > 0 && (
    <BarChart 
      xAxis={[{ scaleType: 'band', data: xAxisData }]}
      series={[{ type: 'bar', data: yAxisData, color: colors }]} 
      width={500}
      height={300}
    /> 
  )}
</div>


  


</>
    
  )
}
