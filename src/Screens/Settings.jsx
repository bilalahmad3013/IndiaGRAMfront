import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { StatesProvider } from '../States/states'



export default function Settings() {
  const navigate = useNavigate();
    
  const {setTitle}=useContext(StatesProvider);
    
  setTitle("Settings")




  const handleLogout = () => {
    let delete_cookie = function (name, path = '/') {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=' + path;
    };
    navigate('/login')
    delete_cookie('authToken');
    delete_cookie('userEmail');

  };

 
  return (
    <div>
       <div className="container my-4">
    <h1 className="mb-4">Account Settings</h1>
    <div className="row">
      <div className="col-md-4">
        <div className="mb-4">
          <h3>Profile Photo</h3>
          <img src="path/to/default_profile_photo.jpg" alt="Profile Photo" className="img-thumbnail" id="profile-photo-preview" />
          <div className="mt-3">
            <input type="file" accept="image/*" id="profile-photo-input"  />
            <label for="profile-photo-input" className="btn btn-primary mt-1">Upload Photo</label>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <h3>Bio</h3>
        <textarea className="form-control mb-4" id="bio-input" rows="4" maxlength="200"></textarea>
        <h3>Basic Details</h3>
        <form>
          <div className="mb-3">
            <label for="username-input" className="form-label">Username</label>
            <input type="text" className="form-control" id="username-input" placeholder="Your username" />
          </div>
          <div className="mb-3">
            <label for="email-input" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email-input" placeholder="Your email" />
          </div>
          <div className="mb-3">
            <label for="name-input" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="name-input" placeholder="Your full name" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="private-account-input" />
            <label className="form-check-label" for="private-account-input">Private Account</label>
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
      <button onClick={handleLogout}>logOut</button>

    </div>
  );
}







