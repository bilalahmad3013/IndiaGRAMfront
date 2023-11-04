import React, { useContext, useState, useEffect } from 'react';
import { StatesProvider } from '../States/states'


export default function Notifications() {

  const { setTitle } = useContext(StatesProvider);

  setTitle("Notifications");


  

  useEffect(() => {

  
    setTitle("Messages");

   
  }, []);



  return (
    <div>


  

    </div>
  )
}
