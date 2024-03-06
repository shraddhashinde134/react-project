import React, { useContext, useEffect, useState } from 'react'
 import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Box,Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import TextField from '@mui/material/TextField';
import { TextField } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//import { UserContext } from '../context/Usestate.jsx';
var getHeaders = require('../Common.js').getHeaders;

//modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



//table style
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.light,
    color:theme.palette.primary.contrastText,
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

function Products() {
//modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState()

  
  // useState form
  let [data, setData] = useState({

    name: "",
    mrp: 0,
    price:0 ,
    gstpercent:0,
    image:""
  })
//getting data in array from db
 let[newdata,setNewData]=useState([]);

//setting id
let [id,setID]=useState();

  //form modal


  

 //handle button
    function handleSubmit(event) {
        event.preventDefault();
        setData({...data,[event.target.id]:event.target.value});
        // console.log(firstName, lastName, email, dateOfBirth, password) 
        // console.log(name,mrp,price,gstpercent,image);
    }

 
  
 
  // function productdata(){

  //   if(id===undefined){

    
  //    data={
  //     name: data.name,
  //         mrp: data.mrp,
  //         price: data.price,
  //           gstpercent:data.gstpercent,
  //           imagepath:file

  //   }
  //   console.log("before post",data);
  //   console.log(data.imagepath,'image');
  //   axios.post("http://127.0.0.1:8081/products/", data, getHeaders())
  //   .then((res) => {
  //     // console.log(response.status, response.data.token);
      

  //     console.log("afterpost",res.data);

  //     onload();

  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // }
  // else{
  //   axios.put("http://127.0.0.1:8081/products/"+id,data)
  //   .then((res)=>{
  //     console.log(res.data);
  //     onload();
      
  //   });}
  // //   setData({
  // //     name: "data.name",
  // //     mrp: data.mrp,
  // //     price:data.price ,
  // //     gstpercent:data.gstpercent,
  // //     image:"data"

  //   // })
  
  // }
  function productdata() {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('mrp', data.mrp);
    formData.append('price', data.price);
    formData.append('gstpercent', data.gstpercent);
    formData.append('image', file);
  
    if (id === undefined) {
      axios.post("http://127.0.0.1:8081/products/", formData, getHeaders())
        .then((res) => {
          console.log("after post", res.data);
  
          
          setData({
            name: "",
            mrp: 0,
            price: 0,
            gstpercent: 0,
            imagepath: ""
          });
          setFile(null);
          handleClose();
          onload()
        })
        .catch((error) => {
          console.log(error);
        });

        
    } 
      else{
    axios.put("http://127.0.0.1:8081/products/"+id, formData, getHeaders())
    .then((res)=>{
      console.log(res.data.data);
      
      onload();
      setID(undefined); // Reset ID after editing
      handleClose(); // Close the modal after submission
    
      
    }).catch((error)=>{
      console.log(error);
    })
    // setData({
    //   name: "data.name",
    //   mrp: data.mrp,
    //   price:data.price ,
    //   gstpercent:data.gstpercent,
    //   image:"data"

    // })
  }
  //setOpen=>false
  }
  
function onload(){
  axios.get("http://127.0.0.1:8081/products/")
      .then((resp)=>{
        setNewData(resp.data.data);
      })
      .catch((error)=>{
        console.log(error);
      })
    }


    useEffect(()=>{
      onload();
    },[])
    
//dele
function handledelete(e,id)
{
  e.preventDefault();
  axios.delete("http://127.0.0.1:8081/products/"+id)
  .then((resp)=>{
    console.log(resp.data);
    onload();

  })
  .catch((error)=>{
    console.log(error);
  })
  
}

//update
function handleUpdate(e,id)
{
  e.preventDefault();
  setID(id); 
  handleOpen(); 
  axios.get("http://127.0.0.1:8081/products/"+id)
  .then((res)=>{
    console.log(res.data.data);

    // Populate the form fields with the fetched data by updating the state
    setData({
      name: res.data.data.name,
      mrp: res.data.data.mrp,
      price: res.data.data.price,
      gstpercent: res.data.data.gstpercent,
      // imagepath: res.data.data.imagepath // Optionally, you can update the imagepath as well
    });
    console.log(res.data.data.name);

  }).catch((error)=>{
    console.log(error);
  })
  //setOpen=>false;

}





// const handleImageChange = (e) => {
//   setData({ ...data, image: e.target.files[0] }); // Update the image file in the state
// };
  
  

  
  



  
  return (
    <>
    {/* //grid  */}
<Grid container spacing={2}>
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
          href="/layout/products"
        >
          Product
        </Link>
      </Breadcrumbs>
       
     
    </div>
    {/* end breadcrumb */}
   </Grid>
   {/* modal button */}
    <Grid  item xs={2}>
    <div>
      <Button sx={{ bgcolor: 'warning.light',color:'black',mb:2 }} onClick={handleOpen}>Open  to Add</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Products 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
{/* form modal */}
<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>



            <TextField
              margin="normal"
              required
              fullWidth

              id="name"
              label="Name"
              type="text"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={handleSubmit}
            />


            <TextField
              margin="normal"
              required
              fullWidth
              id="mrp"
              label="MRP"
              name="mrp"
              type='number'
              autoComplete="mrp"
              autoFocus
              onChange={handleSubmit}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="number"
              id="price"
              autoComplete="price"
              onChange={handleSubmit}
            />
                  <TextField
              margin="normal"
              required
              fullWidth
              name="gstpercent"
              label="GstPercent"
              type="number"
              id="gstpercent"
              autoComplete="gstpercent"
              onChange={handleSubmit}
            />
       

       <TextField
              margin="normal"
              // required
              fullWidth
              name="image"
              label="Image"
              type="file"
              id="image"
              // autoComplete="image"
              // onChange={handleSubmit}
              onChange={e => setFile(e.target.files[0])} 

            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
               onClick={productdata}


            >
              Send
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link to="/layout/dashboard" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            
            </Grid> */}
          </Box>
         
          </Typography>
         
        </Box>
      </Modal>
    </div>
     
    </Grid>
  
   </Grid>
<StyledTableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <StyledTableCell>Id </StyledTableCell>
        <StyledTableCell>Product Name </StyledTableCell>
        <StyledTableCell>MRP </StyledTableCell>
        <StyledTableCell>Price </StyledTableCell>
        <StyledTableCell>Gst Percent </StyledTableCell>
        <StyledTableCell>Image </StyledTableCell>
        <StyledTableCell>Action </StyledTableCell>

      </TableRow>
    </TableHead>
    <TableBody>
      {newdata.map((i,index)=>(

        <StyledTableRow key={index} >
          <StyledTableCell component={"th"} scope='row'>
{index+1}
          </StyledTableCell>
          
          {/* <TableCell>{i._id}</TableCell> */}
          <StyledTableCell>{i.name}</StyledTableCell>
          <StyledTableCell>{i.mrp}</StyledTableCell>
          <StyledTableCell>{i.price}</StyledTableCell>
          <StyledTableCell>{i.gstpercent}</StyledTableCell>
          <StyledTableCell>


          <img 
    src={"http://localhost:8081/" + i.imagepath} // Assuming the image URL is stored in the 'image' field
    alt={i.name} // Assuming the image name is stored in the 'name' field
    style={{ width: '100px', height: '100px' }} // Adjust width and height as needed
  />
         
            {/* <img 
          
      
          src={${i.img} ?w=164&h=164&fit=crop&auto=format}
          alt={i.img}
          loading="lazy"/> */}
          </StyledTableCell>
          <StyledTableCell><EditIcon sx={{ color: 'success.light' }} onClick={((e)=>handleUpdate(e,i._id))}>edit</EditIcon> 
          <DeleteIcon sx={{ color: 'red' }} onClick={((e)=>handledelete(e,i._id))}>Del</DeleteIcon ></StyledTableCell>
          
        </StyledTableRow>
      
      ))}
    </TableBody>
  </Table>



</StyledTableContainer>


   
 
    </>
  )
}

export default Products;