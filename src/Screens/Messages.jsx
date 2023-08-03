import React, {useContext} from 'react'
import { StatesProvider } from '../States/states'

export default function Messages() {
  const {setTitle}=useContext(StatesProvider);
    
  setTitle("Messages");
  return (
    <div>
      
    </div>
  )
}
