import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
const Navbar = () => {
  const [cartView,setCartView]=useState(false)
  let data=useCart();
  const navigate=useNavigate();
  const handleLogout = ()=>{
 localStorage.removeItem("authToken");
 navigate("/login")
  }
  return (
    <div>
         

    <nav className="navbar navbar-expand-lg navbar-light bg-info" style={{ backgroundColor: 'orange' }}>
    <div className="container-fluid">
    <Link className="navbar-brand fs-1 text-white" to="/">GOFOOD</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav me-auto mb-3">
        <Link className="nav-link active fs-4 mt-2 text-white" aria-current="page" to="/">Home</Link>
        {(localStorage.getItem("authToken"))?
         <Link className="nav-link active fs-4 mt-2 align-middle text-white" aria-current="page" to="/MyOrder">My Orders</Link>
        :""}
      </div>
      {(!localStorage.getItem("authToken"))?
       <div className='d-flex' >
        <Link className="btn bg-white text-info mx-1" to="/login">Login</Link>
        <Link className="btn bg-white text-info mx-1" to="/createuser">Signup</Link>
       </div>
        :
        <div>
        <div className='btn bg-white text-info mx-2' onClick={()=>{setCartView(true)}}>
        My Cart {" "}
          <Badge pill bg="warning">{data.length}</Badge>
     
      </div>
      {cartView? <Modal onClose={()=>setCartView(false)}> <Cart /></Modal>:null}

        <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
          Logout
        </div>
        </div>
        }
    </div>
  </div>
</nav>
  
    </div>
  )
}

export default Navbar
