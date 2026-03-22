import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from './utils/userSlice'
import axios from 'axios'

const Body = () => {

      const dispatch=useDispatch();
      const navigate=useNavigate();

      const userDetails=async()=>{
        try {
          const res=await axios.get('http://localhost:3000/profile/view',{withCredentials:true});
          dispatch(addUser(res.data));
        } catch (error) {
          navigate('/login')
          console.log(error)
        }
      }

     useEffect(()=>{
         userDetails();
     },[]);
        
    
  return (
  <div className="bg-gray-50 min-h-screen">
    <NavBar />
    <div className="pt-15 px-4"> 
      <Outlet />
    </div>
  </div>
);
}

export default Body