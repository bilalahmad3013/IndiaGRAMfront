import React from 'react'

export default function Post({ elem }) {
  console.log(elem);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  return (
    <>
      
      <div className='post-div'>
        <img src={BASE_URL+elem.picURL} alt="" />
      </div>

    </>

  )
}
