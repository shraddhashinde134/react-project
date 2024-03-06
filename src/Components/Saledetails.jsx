import React, { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import axios from 'axios';
import PrintIcon from '@mui/icons-material/Print';
import IconButton from '@mui/material/IconButton';
//import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.light,
    color:theme.palette.primary.contrastText,
    fontSize:17
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableContainer = styled(TableContainer)({
  maxHeight: 400,
 overflowX:'auto',
  overflowY: 'auto', // Add scrollbar for vertical overflow
});


export default function Saledetails() {
  const theme = useTheme(); 
  console.log(theme);




    let[saledetails,setSaleDetails]=useState([]);
   
    useEffect(()=>{
   
    
        onload();
      })
      
      
      
      //getting product data
      function onload(){
     
   
      
        axios.get("http://127.0.0.1:8081/sales/")
        
            .then((resp)=>{
              console.log(resp.data.data);
          
              setSaleDetails(resp.data.data);
      
            })
            .catch((error)=>{
              console.log(error);
      
            });
      
       
          }




  return (
    <>

      {/* //breadcrumb */}


<div role="presentation" >
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/layout/dashboard"
         underline="hover" color='black' >
          Dashboard
        </Link>
        <Link 
          underline="hover"
           color="black"
          href="/layout/saledetails"
        >
          SaleDetails
        </Link>
  
      </Breadcrumbs>
       
     
    </div>
   
    
    <StyledTableContainer component={Paper}>
   
      <Table sx={{ minWidth: 700, mt:3 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sr.No</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Mobile no</StyledTableCell>
            {/* <StyledTableCell align="right"> productname</StyledTableCell>
            <StyledTableCell align="right">price</StyledTableCell>
            <StyledTableCell align="right">Gstpercent</StyledTableCell>
            <StyledTableCell align="right">subtotal</StyledTableCell>
         */}
            <StyledTableCell align="right">GrandTotal</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {saledetails.map((item,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {i+1}
              </StyledTableCell>
              <StyledTableCell align="right">{new Date(item.cdate).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="right">{item.cname}</StyledTableCell>
              <StyledTableCell align="right">{item.cmobileno}</StyledTableCell>
             
              <StyledTableCell align="right">{item.grandTotal}</StyledTableCell>
              <StyledTableCell align="right">
                {/* <DeleteIcon sx={{  color: theme.palette.error.main }}>del</DeleteIcon> */}

              <Link 
              component="button"
              underline="none"
              to={`/invoice/${item._id}`}>
                
                <IconButton
                 color="primary"
                  aria-label="print">
                  <PrintIcon />
                  </IconButton>
                {/* print */}
              </Link>
             
              </StyledTableCell> 
           

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
     
    </StyledTableContainer>
   
    </>
  )
}
