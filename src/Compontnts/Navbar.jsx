import React, { useEffect, useState, useContext } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { StatesProvider } from '../States/states'
import Notify from './Notify';
import '../styles/navstyle.css'


export default function Navbar() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const userEmail = decodeURIComponent(getCookie("userEmail"));
  const [param,setParam]=useState('');
  const nevigate=useNavigate();
  const [isModalOpenNotify, setModalOpenNotify] = useState(false);

  const {n, setN} = useContext(StatesProvider);

  
  const openModalNotify = () => {   
    setModalOpenNotify(true);
  };
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


  const [arr,setArr]=useState([]);
 


  const handleInputChange = async (e) => {  
    try {
      let response = await fetch(`${BASE_URL}/user/giveUsers`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          string: e.target.value,
          userEmail:userEmail

        })
      });
   
      let ans = await response.json();     
      if(!ans.ok){
        setArr(ans.users);
     }
     if(e.target.value===''){
      
      setArr([]);
      console.log(arr);
    }     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
    const User=async()=>{
      let response=await fetch(`${BASE_URL}/user/getUser`,{
        method:'POSt',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({         
          userEmail:userEmail

        })
      })

      if(!response.ok){
        console.log("something went wrong");
      }
      let ans=await response.json();
      setParam(ans.name);
    }

    User();
  },[]);

 
 const handleProfileClick =()=>{
  nevigate(`/profile/${param}`)
 }
 const handleSearchClick =(name)=>{
 
   nevigate(`/profile/${name}`);
 }


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
                 arr.length > 0 ? <div style={{height:"auto", maxHeight:"400px" ,position:"absolute",margin:"5px" , width:"300px", background:"#f2f2f2", borderRadius:"5px", overflowY:"scroll"}}>
                   {
                     arr.map((item, index) => (
                      <div id='list-nav' onClick={()=>handleSearchClick(item.name)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px' }} key={index}>
                        <div>
                          <i className="fa-solid fa-magnifying-glass"></i> &nbsp;{item.name}
                        </div>
                        <div style={{ height: '35px', width: '35px', borderRadius: '50%' }}>
                          <img src={item.pic==='' ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' : BASE_URL+item.pic} alt="" style={{ height: '100%', width: '100%', borderRadius: '50%' }} />
                        </div>
                      </div>
                    ))}
                   

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
                 
                arr.length > 0 ? <div style={{height:"auto", maxHeight:"400px" ,position:"absolute",margin:"5px" , width:"300px", background:"#f2f2f2", borderRadius:"5px", overflowY:"scroll"}}>
                   {
                    arr.map((item, index) => (
                      <div id='list-nav'  onClick={()=>handleSearchClick(item.name)}   style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px' }} key={index}>
                        <div>
                          <i className="fa-solid fa-magnifying-glass"></i> &nbsp;{item.name}
                        </div>
                        <div style={{ height: '35px', width: '35px', borderRadius: '50%' }}>
                          <img src={item.pic==='' ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' : BASE_URL+item.pic} alt="" style={{ height: '100%', width: '100%', borderRadius: '50%' }} />
                        </div>
                      </div>
                    ))
                   }

                </div> : <></>
              }
              
            </div>
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item ">
                <NavLink style={({ isActive }) => isActive ? { borderBottom: "3px solid #3b5998" } : undefined} className="nav-link mx-2 text-uppercase active " aria-current="page" to="/"><span>Home</span></NavLink >
              </li>
              <li className="nav-item">
                <NavLink style={({ isActive }) => isActive ? { borderBottom: "3px solid #3b5998" } : undefined} className="nav-link mx-2 text-uppercase " to="/timeline" ><span>Create</span></NavLink >
              </li>
              <li className="nav-item">
                <NavLink  className="nav-link mx-2 text-uppercase" to="#" onClick={openModalNotify}><span>Notifications</span> {n>=1 && <span className="badge bg-danger">{n}</span>}</NavLink >
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
                <NavLink style={({ isActive }) => isActive ? { borderBottom: "" } : undefined} className="nav-link mx-2 text-uppercase" to='' onClick={handleProfileClick}><span><i className="fa-solid fa-circle-user me-1"></i> Profile</span></NavLink >
              </li>
            </ul>
          </div>
        </div>
      </nav>
         
      {isModalOpenNotify && <Notify closeModal={() => setModalOpenNotify(false)} />} 

      <Outlet />
    </>
  )
}
