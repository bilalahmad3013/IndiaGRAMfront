import React, {useContext} from 'react'
import Navbar from '../Compontnts/Navbar'
import { StatesProvider } from '../States/states'

export default function Home() {
  const {setTitle}=useContext(StatesProvider);
    
  setTitle("Home")
  return (
    <div>
      <Navbar />
    </div>
  )
}
