import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import { Box } from "@mui/system";
import { useReactToPrint } from "react-to-print";
import axios from "axios";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.primary.contrastText,
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



  

  
  

const Invoice = () => {
  const [saledetails, setSaledetails] = useState([]);
  const { _id } = useParams();

  useEffect(() => {
    onload();
  }, [_id]);

  function onload() {
    axios.get(`http://127.0.0.1:8081/sales/${_id}`)
      .then((resp) => {
        console.log(resp.data.data);
        setSaledetails(resp.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const componentPDF = useRef();

  const generatePdf = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "bill",
    onafterprint: () => alert("Data saved in pdf"),
  });

  return (
    <div className="container m-4 p-4">
      <Paper elevation={3} className="bill-container">
        <h2 className="text-center text-decoration-underline" style={{ marginTop: "8px",textAlign:"center" }}>Invoice Form </h2>
        
        <div ref={componentPDF}>
        <Typography>
          
      
  

          <Box>
          <Grid container spacing={2}>
          <Grid item xs={10}>
    
              <div className="text-decoration-underline fs-5 ms-3 mt-3"><b>Customer Name: </b>
            {saledetails.cname}</div>
            </Grid>
            <Grid item xs={2}>
              <div className="text-decoration-underline fs-5 ms-3" ><b>Date:</b>
              {new Date(saledetails.cdate).toLocaleDateString()}{"\n"}</div>{"\n"}
              </Grid>
              <Grid item xs={12}>
              <div className="text-decoration-underline fs-5 ms-3 mt-3"  ><b> Mobileno:</b>
              {saledetails.cmobileno}</div>{"\n"}
              </Grid>
           
              </Grid>
          </Box>
         
        </Typography>

        <hr />
        <StyledTableContainer component={Paper} style={{ padding: "15px" }}>
          
            <Table style={{ padding: "10px" }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sr.No</StyledTableCell>
                  <StyledTableCell>Product Name</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Gstpercent</StyledTableCell>
                  <StyledTableCell>Subtotal</StyledTableCell>
                  <StyledTableCell>Gsttotal</StyledTableCell>
                  <StyledTableCell>billtotal</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {saledetails?.products?.map((product, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{product.name}</StyledTableCell>
                    <StyledTableCell>{product.price}</StyledTableCell>
                    <StyledTableCell>{product.gstpercent}</StyledTableCell>
                    <StyledTableCell>{product.subtotal}</StyledTableCell>
                    <StyledTableCell>{product.gsttotal}</StyledTableCell>
                    <StyledTableCell>{product.billtotal}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
        
        </StyledTableContainer>

        <Typography
          variant="h6"
          style={{ marginTop: "15px",float:'right' }}
         // className="d-flex justify-content-between ms-3"
          
        >
          <b style={{backgroundColor:"#ffcd38"}}>Total: {saledetails.grandTotal}</b>
        </Typography>
        </div>

       
      </Paper>
      

      <div className="container mt-3" style={{ marginLeft: "50px" ,marginTop:"15px"}}>
          <Button className="m-4 " variant="contained"  onClick={generatePdf}>
            Print
          </Button>
        </div>


    </div>
  );
};

export default Invoice;