
import React, {useContext} from 'react'
import { StatesProvider } from '../States/states'

export default function Timeline() {
  const {setTitle}=useContext(StatesProvider);
    
  setTitle("Timeline");

  return (
    <div>
      
    </div>
  )
}
