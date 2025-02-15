/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser,logout } from '../redux/slices/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import AdminPage from './basePages/AdminPage'

const Home = () => {
  const dispatch=useDispatch();
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  const navigate=useNavigate();
  useEffect(() => {
  if (!isLoggedIn) {
    navigate("/login");
  }
}, [isLoggedIn, navigate]);

const handleLogout=async()=>{
  try {
const response=await fetch("/api/auth/logout",{method:"POST"});
if(!response.ok){
throw new Error
}
const data=await response.json();
dispatch(setUser({
  email:"",
  role:"",
  name:"",
  _id:"",
}));
dispatch(logout());
console.log(data)
}
 catch(err){
  console.log(err.message)
 }
}
  return (
    <div className='w-screen'>
      <AdminPage/>
      <div className='w-full  flex  ml-24'>
       <button
    onClick={handleLogout}
    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-red-600 transition-all duration-300 md:px-6 md:py-3"
  >
    Logout
  </button></div>
    </div>
   
  )
}

export default Home
