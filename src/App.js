import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Products from './Components/Products';
import Sales from './Components/Sales';
import Signin from './Components/Signin';
import Saledetails from './Components/Saledetails';
import Invoice from './Components/Invoice';


function App() {
  return (
    <>




       <BrowserRouter>
        <Routes>
{/* <Route path="/" element={<Login></Login>}></Route>  */}
<Route path="/" element={<Signin></Signin>}></Route> 
          <Route path="/layout" element={<Layout />}> 
         
           <Route path="/layout/dashboard" element={<Dashboard/>}/>
           <Route path="/layout/products" element={<Products/>}/>
            <Route path="/layout/sales" element={<Sales/>}/>
            <Route path="/layout/saledetails" element={<Saledetails/>}/>
           
           </Route>
           <Route path="/invoice/:_id" element={<Invoice />} />

         
        </Routes>

      </BrowserRouter> 
   

    </>
  );
}

export default App;
