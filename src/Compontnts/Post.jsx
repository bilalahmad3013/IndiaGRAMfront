import React from 'react';

export default function Post({ elem }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log(elem);

  // Determine the contentType based on the provided contentType or file extension
  const contentType = elem.contentType || inferContentType(elem.picURL);

  function inferContentType(picURL) {
  
    const fileExtension = picURL.split('.').pop().toLowerCase(); // Convert to lowercase for case insensitivity

   
    if (fileExtension === 'jpeg' || fileExtension === 'jpg') {
      return 'photo';
    } else if (fileExtension === 'mp4' || fileExtension === 'webm') {
      return 'video';
    } else if (fileExtension === 'gif') {
      return 'gif';
    } else if (fileExtension === 'webp') {
      return 'webp';
    } else {
      return 'unknown'; // Handle other file types as needed
    }
  }

  return (
    <div className='post-div'>
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
