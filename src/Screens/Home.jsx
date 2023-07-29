import React, {useContext, useEffect} from 'react'
import Navbar from '../Compontnts/Navbar'
import { StatesProvider } from '../States/states'
import {Link, useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate=useNavigate();
  if(!localStorage.getItem("authToken")){
    navigate('/login');
  }
  
  const {setTitle}=useContext(StatesProvider);
    
  setTitle("Home")

 
  
  return (
    <div style={{}}>
      
     
    </div>
  )
}
