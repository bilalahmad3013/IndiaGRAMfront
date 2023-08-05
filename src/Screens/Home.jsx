import React, {useContext, useEffect} from 'react'
import { StatesProvider } from '../States/states'
import {Link, useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate=useNavigate();

  function getCookie(name) {
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

const authToken = getCookie('authToken');
const userEmail = decodeURIComponent(getCookie("userEmail"));


if(!authToken && userEmail){
   navigate('/login');
}
  

 
 
  
  const {setTitle}=useContext(StatesProvider);
    
  setTitle("Home")

 

  return (
    <div style={{}}>
      
     
    </div>
  )
}
