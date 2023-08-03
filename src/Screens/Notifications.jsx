import React, {useContext} from 'react'
import { StatesProvider } from '../States/states'

export default function Notifications() {
  
  const {setTitle}=useContext(StatesProvider);
    
  setTitle("Notifications");

  return (
    <div>
      
    </div>
  )
}
