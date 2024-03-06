




import React, {  useEffect, useState } from 'react'
// import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Box,Button } from '@mui/material';
import Grid from '@mui/material/Grid';

// import TextField from '@mui/material/TextField';
import { TextField } from '@mui/material';
import axios from 'axios';
import {Select, MenuItem} from "@mui/material";
import { styled } from '@mui/material/styles';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    //backgroundColor: theme.palette.common.black,
    //color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.contrastText,
    fontSize:17,
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



export default function Sales() {




//get products getting data in array from db
let [product,setProduct]=useState([]); 

//let[alltotal,setalltotal]=useState();

//custm details
let [custdet,SetCustDet]=useState({});

let[saleProducts,setSaleProducts]=useState([{
  quantity:1,

}]);






//customer detail like mob,name
function handlecustdet(e)
{
SetCustDet({...custdet,[e.target.id]:e.target.value})
}
console.log(custdet);
//onchnge handle on selected product drop menu

function handleSelectProduct(id,i){

  console.log(id);
  let selectedProduct=product.find((e)=>e._id === id);
  let copyRows=[...saleProducts];
  copyRows[i]=selectedProduct;
  setSaleProducts(copyRows); 
  // console.log(selectedProduct);
}
console.log(saleProducts);







function changingquantity(i,e)
{
  let updatesaleproduct=[...saleProducts];
  updatesaleproduct[i].quantity=e;
  setSaleProducts(updatesaleproduct);
 

}

console.log(saleProducts);



//add row
function addrow(){

setSaleProducts([...saleProducts,{}])
  
}
// console.log('saleProducts:', saleProducts); 
// console.log('products',product);









useEffect(()=>{
   
  //updateSubtotal();
  onload();
},[])



//getting product data
function onload(){


  axios.get("http://127.0.0.1:8081/products/")
  
      .then((resp)=>{
        console.log(resp.data);
        setProduct(resp.data.data);

      })
      .catch((error)=>{
        console.log(error);

      });

 
    }

console.log(product);
console.log(saleProducts);
 
  



console.log('salproduct',saleProducts);
console.log('custde',custdet);

//function send sale data



  

      






function saledata(e) {
  e.preventDefault();

  const postData = {
     cdate: custdet.cdate,
    cname: custdet.cname,
    cmobileno: custdet.cmobileno,
    products: saleProducts.map((product) => ({
      productid: product._id, // Assuming you have an _id property for each product
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      quantity: product.quantity,
      subtotal: product.price * product.quantity,
      gstpercent: product.gstpercent,
      gsttotal: (product.price * product.quantity * product.gstpercent) / 100,
      billtotal:
        product.price * product.quantity +
        (product.price * product.quantity * product.gstpercent) / 100,
        
    })),

    grandTotal:saleProducts.reduce((total, product) => total + (  product.price * product.quantity +
      (product.price * product.quantity * product.gstpercent) / 100 || 0), 0),
  };

  axios.post("http://127.0.0.1:8081/sales",postData)
  .then((res)=>{
    console.log(res.data);
    alert("data is sent successfully")
  })
  .catch((error)=>{
    console.log(error);
  })
  console.log(postData,'postdata'); // Check if postData is correctly populated
}


// let cal=0
// let subtotal =0
// let gsttotal=0
// let billtotal=0


let grandTotal = saleProducts.reduce((total, product) => total + (  product.price * product.quantity +
  (product.price * product.quantity * product.gstpercent) / 100 || 0), 0);
console.log(grandTotal,'total');


  return (
    <>
    
     {/* onSubmit={saledata}  */}
    {/* //grid  */}
    {/* <Grid container spacing={2}> */}
  <Grid item xs={10} >
    
  {/* //breadcrumb */}
<div role="presentation" >
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="black" href="/layout/dashboard">
          Dashboard
        </Link>
        <Link
          underline="hover"
          color="black"
          href="/layout/sales"
        >
          Sales
        </Link>
  
      </Breadcrumbs>
       
     
    </div>
    {/* end breadcrumb */}
   </Grid>
   {/* datepicker */}
   <Box component="form"  noValidate sx={{ mt: 2 }}>
   <Grid container spacing={3} >

  <Grid item xs={4}>
  
  <TextField
              margin="normal"
             
              fullWidth
             required
              id="cdate"
              // label="date"
              type="date"
              name="cdate"
               //value={formatDate(custdet.cdate)}

             
              onChange={((e)=>handlecustdet(e))}            />

  </Grid>
  <Grid item xs={4}>
    
     <TextField
              margin="normal"
           
              fullWidth
              required
              id="cname"
              label="Name"
              type="text"
              name="cname"
              // value={cname}
              // autoComplete="cname"
              // autoFocus
              onChange={((e)=>handlecustdet(e))}            />
  </Grid> 
  <Grid item xs={4}>
    
     <TextField
             margin="normal"
              
              fullWidth
              required
              id="cmobileno"
              label="Mobileno"
              type="number"
              name="cmobileno"
              // value={cmobileno}
              // autoComplete="cmobileno"
              // autoFocus
              onChange={((e)=>handlecustdet(e))}            />
              
  </Grid> 

  </Grid>
  </Box>
   
   
  
   {/* //</Grid> */}
   
   {/* table */}
   <Box sx={{mt:2, mb:1}}>
   <Button onClick={addrow} sx={{bgcolor:'warning.light',color:'black',float:'right' ,mb:2}}>Add row</Button>
   {/* <Button onClick={handleAddProduct}>add Product</Button> */}
   </Box>
   <StyledTableContainer component={Paper}>
  <Table>
 
    <TableHead>
      <TableRow >
        <StyledTableCell>Id </StyledTableCell>
        <StyledTableCell>PName </StyledTableCell>
        <StyledTableCell  >MRP </StyledTableCell>
        <StyledTableCell>Price </StyledTableCell>
        <StyledTableCell>Quantity </StyledTableCell>
        <StyledTableCell>SubTotal </StyledTableCell>
        <StyledTableCell>GstPercent </StyledTableCell>
        <StyledTableCell>GstTotal </StyledTableCell>
        <StyledTableCell>BillTotal </StyledTableCell>


      </TableRow>
    </TableHead>
    <TableBody>
      
     {saleProducts.map((pitem,index)=>{
      //let cal = pitem.price*pitem.quantity
    
      let subtotal=pitem.price*pitem.quantity
    let gsttotal=(pitem.price*pitem.quantity*pitem.gstpercent)/100
     let billtotal=(pitem.price*pitem.quantity) +((pitem.price* pitem.quantity*pitem.gstpercent)/100)
      return( 
      
        <StyledTableRow  key={index}>
          <StyledTableCell scope='row'> {index+1}   </StyledTableCell>
          <StyledTableCell>
          <Select
            
           onChange={(e)=>handleSelectProduct(e.target.value,index)}
           >
        <MenuItem value="">select product</MenuItem>
        {product.map((prod)=>(
          
        <MenuItem key={prod._id} value={prod._id}>{prod.name}</MenuItem>
        ))}
        


       
      </Select>

          </StyledTableCell>
        
             <StyledTableCell>
          <TextField
              id="mrp"
              value={pitem.mrp}
              //onChange={handleSelectProduct}
              type="number"
              
              /> 
        {/* {selectedProduct && (
              <div>
            {product.find(prod=> prod._id === selectedProduct)?.mrp}
              </div>
            )} */}
          </StyledTableCell>
          <StyledTableCell>
          < TextField
              id="price"
              value={pitem.price}

             
              type="number"
              name="price"
              
             
         />
          
       
              
          </StyledTableCell>
          
          <StyledTableCell>
          <TextField
              id="quantity"
              value={pitem.quantity}
              type="number"
              name="quantity"
              inputProps={{ min: 1, max: 20 }}  // Set the minimum and maximum values for the input
              onChange={(e)=>changingquantity(index,e.target.value)}
              
            />
          </StyledTableCell>
          <StyledTableCell>
          <TextField
              
              id="subtotal"
              value={parseFloat(subtotal)}
              type="number"
              name="subtotal"
          
            />
          </StyledTableCell>
          <StyledTableCell>
          <TextField

              id="gstpercent"
             value={pitem.gstpercent} 
              type="number"
              name="gstpercent"
              
            />
          </StyledTableCell>
          <StyledTableCell>
          <TextField
            

             
              id="gsttotal"
              value={parseFloat(gsttotal)}
              type="number"
              
              
              
            
            />
            
          </StyledTableCell>
          <StyledTableCell>
          <TextField
           

              id="billtotal"
              value={parseFloat(billtotal)}

            //  value={(pitem.price*pitem.quantity)*pitem.gstpercent/100+ (pitem.price * pitem.quantity)}
              type="number"
              name="billtotal"
             
            />
          </StyledTableCell>
          {/* <TableCell><Button onClick={handleSubmit}>edit</Button> <Button>Del</Button></TableCell> */}
          
        </StyledTableRow>
       )
          })}
          
       
    </TableBody>
  </Table>
  
</StyledTableContainer>


  <Box sx={{mt:3}}>
    <Button type='submit' onClick={saledata} variant='contained'  sx={{backgroundColor:"#357a38"}}>Submit</Button>
    
 
  <TextField
  id='grandTotal'
  type='number'
  margin='normal'
  sx={{float:"inline-end",backgroundColor:"#ffd54f"}}
value={grandTotal}
  />

  </Box>





    </>
  )
}
