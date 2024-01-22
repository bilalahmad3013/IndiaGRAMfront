import React from 'react'

export default function Nothing() {
  return (
    <div style={{height:"300px", width:"100%", display:"flex",marginTop:"-20px", justifyContent:'center', alignItems:"center",flexDirection:"column"}}>
       <i class="fa-solid fa-magnifying-glass fa-4x" style={{opacity:'0.6'}}></i>
       <h3>Nothing to show here.</h3>
    </div>
  )
}
