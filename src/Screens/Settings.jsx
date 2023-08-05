import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { StatesProvider } from '../States/states'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Settings() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const userEmail = decodeURIComponent(getCookie("userEmail"));
  const navigate = useNavigate();

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

  const { setTitle } = useContext(StatesProvider);
  setTitle("Settings")

  const [obj, setObj] = useState({
    fullname: '',
    dob: '',
    private: false,
    contactinfo: '',
    bio: ''
  })


  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(`${BASE_URL}/accountsetting/getSetting`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          useremail: userEmail,
        })
      })

      let ans = await response.json();
    

      setFormData({
        fullname: ans.fullname,
        dob: ans.dob,
        private: ans.private,
        contactinfo: ans.contactinfo,
        bio: ans.bio
    });

    }
    fetchData();

  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(`${BASE_URL}/accountsetting`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        useremail: userEmail,
        fullname: formData.fullname,
        dob: formData.dob,
        private: formData.private,
        contactinfo: formData.contactinfo,
        bio: formData.bio
      })
    })

    if(!response.ok){
      Faliurnotify()
    }
    else{
      Successnotify()
    }


  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;


    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked


      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const [formData, setFormData] = useState(obj);





  const handleLogout = () => {
    let delete_cookie = function (name, path = '/') {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=' + path;
    };
    navigate('/login')
    delete_cookie('authToken');
    delete_cookie('userEmail');

  };

  const Successnotify = () =>toast.info('Updated Successfully', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

const Faliurnotify=()=>toast.info('Fialed to update', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});


  return (
    <div>
      <div className="container my-4">
        <h1 className="mb-4">Account Settings</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-4">
              <h3>Profile Photo</h3>
              <img src='' alt="profile pic" className="img-thumbnail" id="profile-photo-preview" />
              <div className="mt-3">
                <input type="file" accept="image/*" id="profile-photo-input" />
                <label for="profile-photo-input" className="btn mt-1" style={{ background: "#3b5998", color: "white" }}>Upload Photo</label>
              </div>
            </div>
          </div>
          <div className="col-md-8">


            <h3>Basic Details</h3>
            <form>
              <div className="mb-3">
                <label for="bio-input" className="form-label">Bio</label>
                <textarea className="form-control mb-4" id="bio-input" name='bio' value={formData.bio} onChange={handleChange} rows="4" maxlength="200"></textarea>
              </div>
              <div className="mb-3">
                <label for="username-input" className="form-label">Email</label>
                <input type="email" className="form-control" id="username-input" value={userEmail} name='userEmail' placeholder="Your username" />
              </div>
              <div className="mb-3">
                <label for="name-input" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name-input" name='fullname' value={formData.fullname} onChange={handleChange} placeholder="Your full name" />
              </div>
              <div className="mb-3">
                <label for="dob-input" className="form-label">DOB</label>
                <input type="date" className="form-control" id="dob-input" name='dob' value={formData.dob} onChange={handleChange} placeholder="Your DOB" />
              </div>
              <div className="mb-3">
                <label for="contactinfo-input" className="form-label">Contact Info</label>
                <input type="text" className="form-control" id="contactinfo-input" name='contactinfo' value={formData.contactinfo} onChange={handleChange} placeholder="You can give your phone number or email to show other users you details" />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" checked={formData.private} name='private' onChange={handleChange} id="private-account-input" />
                <label className="form-check-label" for="private-account-input">Private Account</label>
              </div>
              <button type="submit" onClick={handleSubmit} className="btn" style={{ background: "#3b5998", color: "white" }}>Save Changes</button>
              <button className='btn' style={{ background: "#3b5998", color: "white", marginLeft: "1%" }} onClick={handleLogout}>Logout</button>
            </form>

          </div>
        </div>
      </div>


    </div>
  );
}







