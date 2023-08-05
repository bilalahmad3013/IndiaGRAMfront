import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../styles/navstyle.css'

export default function Navbar() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;


  const [arr,setArr]=useState([]);
 

  const handleInputChange = async (e) => {
  
    try {
      let response = await fetch(`${BASE_URL}/user/giveUsers`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          string: e.target.value
        })
      });

      let ans = await response.json();

      if(!ans.ok){
        setArr(ans.users);
     }
     if(e.target.value===''){
      
      setArr([]);
    }

   
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white sticky-top navbar-light p-3 shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand" to="#"><i className="fa-brands fa-instagram"></i> <strong>IndiaGram</strong></NavLink >
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="mx-auto my-3 d-lg-none d-sm-block d-xs-block">
            <div className="input-group">
              <span className=" input-group-text  text-white" style={{ background: "#3b5998" }}><i className="fa-solid fa-magnifying-glass"></i></span>
              <input type="text" className="form-control " style={{ color: "#7a7a7a" }} onChange={handleInputChange} />
              <button className="btn  text-white" style={{ background: "#3b5998" }}>Search</button>
            </div>

            {
                arr.length > 0 ? <div style={{height:"auto", maxHeight:"400px" ,position:"absolute",margin:"5px" , width:"300px", border:"1px solid black", borderRadius:"10px", background: "#2596be"}}>
                   {
                    arr.map((item)=>{
                       return(
                        <div style={{borderBottom:"1px solid black" ,padding:"3px", borderBottomRightRadius:"5px", borderBottomLeftRadius:"5px"}}>
                          {item.name}
                        </div>
                       )
                    })
                   }

                </div> : <></>
              }
          </div>
          <div className=" collapse navbar-collapse" id="navbarNavDropdown">
            <div className="ms-auto d-none d-lg-block">
              <div className="input-group">
                <span className=" input-group-text  text-white" style={{ background: "#3b5998" }}><i className="fa-solid fa-magnifying-glass"></i></span>
                <input type="text" className="form-control" style={{ color: "#7a7a7a", border: "1px solid #3b5998" }} onChange={handleInputChange} />
                <button className="btn text-white" style={{ background: "#3b5998" }}>Search</button>
              </div>
              {
                arr.length > 0 ? <div style={{height:"auto", maxHeight:"400px" ,position:"absolute",margin:"5px" , width:"300px", border:"1px solid black", borderRadius:"10px", background: "#aae5e9"}}>
                   {
                    arr.map((item)=>{
                       return(
                        <div style={{borderBottom:"1px solid black" ,padding:"3px", borderBottomRightRadius:"5px", borderBottomLeftRadius:"5px"}}>
                          {item.name}
                        </div>
                       )
                    })
                   }

                </div> : <></>
              }
              
            </div>
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item ">
                <NavLink style={({ isActive }) => isActive ? { borderBottom: "3px solid #3b5998" } : undefined} className="nav-link mx-2 text-uppercase active " aria-current="page" to="/"><span>Home</span></NavLink >
              </li>
              <li className="nav-item">
                <NavLink style={({ isActive }) => isActive ? { borderBottom: "3px solid #3b5998" } : undefined} className="nav-link mx-2 text-uppercase " to="/timeline" ><span>Timeline</span></NavLink >
              </li>
              <li className="nav-item">
                <NavLink style={({ isActive }) => isActive ? { borderBottom: "3px solid #3b5998" } : undefined} className="nav-link mx-2 text-uppercase" to="/notifications"><span>Notifications</span></NavLink >
              </li>
              <li className="nav-item" >
                <NavLink style={({ isActive }) => isActive ? { borderBottom: "3px solid #3b5998" } : undefined} className="nav-link mx-2 text-uppercase" to="/settings"><span>Settings</span></NavLink >
              </li>

            </ul>
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <NavLink style={({ isActive }) => isActive ? { borderBottom: "3px solid #3b5998" } : undefined} className="nav-link mx-2 text-uppercase" to="/messages"><span><i class="fa-solid fa-message"></i>Messages</span></NavLink >
              </li>
              <li className="nav-item">
                <NavLink style={({ isActive }) => isActive ? { borderBottom: "3px solid #3b5998" } : undefined} className="nav-link mx-2 text-uppercase" to="/profile"><span><i className="fa-solid fa-circle-user me-1"></i> Profile</span></NavLink >
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}
