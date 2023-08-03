import React, {useContext} from 'react'
import { StatesProvider } from '../States/states'

export default function Profile() {
  const {setTitle}=useContext(StatesProvider);
    
  setTitle("Profile");

  return (
    <div>
      
    </div>
  )
}
