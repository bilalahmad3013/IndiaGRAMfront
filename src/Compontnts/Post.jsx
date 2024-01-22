import React from 'react';
import { useNavigate } from 'react-router-dom';



export default function Post({ elem, user, email ,id}) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;  
  
  const elemF=elem
  const contentType = elem.contentType || inferContentType(elemF.picURL); 
  const navigate=useNavigate();
  
  function inferContentType(picURL) {      
    const fileExtension = picURL.split('.').pop().toLowerCase();
   
    if(fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'png') {
      return 'photo';
    } else if (fileExtension === 'mp4' || fileExtension === 'webm') {
      return 'video';
    } else if (fileExtension === 'gif') {
      return 'gif';
    } else if (fileExtension === 'webp') {
      return 'webp';
    } else {
      return 'unknown';
    }
  }

  const handleClick = () =>{
    navigate('/postpage', {state:{user:user,email:email, id:id}})
  }

  return (
    <div className='post-div' onClick={handleClick}>
      {contentType === 'photo' ? (
        <img src={BASE_URL + elem.picURL} alt="" />
      ) : contentType === 'video' ? (
        <video src={BASE_URL + elem.picURL} controls />
      ) : contentType === 'gif' ? (
        <img src={BASE_URL + elem.picURL} alt="" />
      ) : contentType === 'webp' ? (
        <img src={BASE_URL + elem.picURL} alt="" />
      ) : (
        <p>Unsupported content type</p>
      )}     
    </div>
  );
}