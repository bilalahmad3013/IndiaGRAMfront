import React from 'react'
import {  NavLink, Outlet} from 'react-router-dom'
import '../styles/navstyle.css'

export default function Navbar() {
    return (
      <>
      <nav className="navbar navbar-expand-lg bg-white sticky-top navbar-light p-3 shadow-sm">
      <div className="container">
        <NavLink  className="navbar-brand" to="#"><i className="fa-brands fa-instagram"></i> <strong>IndiaGram</strong></NavLink >
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
    
        <div className="mx-auto my-3 d-lg-none d-sm-block d-xs-block">
          <div className="input-group">
            <span className=" input-group-text  text-white" style={{background: "#3b5998"}}><i className="fa-solid fa-magnifying-glass"></i></span>
            <input type="text" className="form-control " style={{color:"#7a7a7a"}} />
            <button className="btn  text-white" style={{background: "#3b5998"}}>Search</button>
          </div>
        </div>
        <div className=" collapse navbar-collapse" id="navbarNavDropdown">
          <div className="ms-auto d-none d-lg-block">
            <div className="input-group">
              <span className=" input-group-text  text-white" style={{background: "#3b5998"}}><i className="fa-solid fa-magnifying-glass"></i></span>
              <input type="text" className="form-control" style={{color:"#7a7a7a" ,border:"1px solid #3b5998"}} />
              <button className="btn text-white" style={{background: "#3b5998"}}>Search</button>
            </div>
          </div>
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item ">
              <NavLink style={({ isActive }) => isActive ? {borderBottom:"3px solid #3b5998"} : undefined}  className="nav-link mx-2 text-uppercase active " aria-current="page" to="/"><span>Home</span></NavLink >
            </li>
            <li className="nav-item">
              <NavLink  style={({ isActive }) => isActive ? {borderBottom:"3px solid #3b5998"} : undefined}  className="nav-link mx-2 text-uppercase " to="/timeline" ><span>Timeline</span></NavLink >
            </li>
            <li className="nav-item">
              <NavLink style={({ isActive }) => isActive ? {borderBottom:"3px solid #3b5998"} : undefined} className="nav-link mx-2 text-uppercase" to="/notifications"><span>Notifications</span></NavLink >
            </li>
            <li className="nav-item" >
              <NavLink  style={({ isActive }) => isActive ? {borderBottom:"3px solid #3b5998"} : undefined} className="nav-link mx-2 text-uppercase" to="/settings"><span>Settings</span></NavLink >
            </li>
           
          </ul>
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
              <NavLink style={({ isActive }) => isActive ? {borderBottom:"3px solid #3b5998"} : undefined} className="nav-link mx-2 text-uppercase" to="/messages"><span><i class="fa-solid fa-message"></i>Messages</span></NavLink >
            </li>
            <li className="nav-item">
              <NavLink style={({ isActive }) => isActive ? {borderBottom:"3px solid #3b5998"} : undefined} className="nav-link mx-2 text-uppercase" to="/profile"><span><i className="fa-solid fa-circle-user me-1"></i> Profile</span></NavLink >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Outlet />
    </>
    )
}
