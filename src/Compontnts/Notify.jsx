import React, { useState, useContext, useEffect } from 'react';
import '../styles/modal.css'
import { StatesProvider } from '../States/states'



export default function Notify({ closeModal }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const { setN, notifications, setNotifications, loginEmail } = useContext(StatesProvider);
  const handleRead =async () => {
    setN(0);
    setNotifications([]);
    let response = await fetch(`${BASE_URL}/Notifications/deleteNotifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: loginEmail
      })
    })
    if (!response.ok) {
      console.log("Something went wrong in uploading the notification");
    }   
   
  }

  

  useEffect(() => {
    const fetchNotifications = async () => {
      let response = await fetch(`${BASE_URL}/Notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: loginEmail
        })
      })
      const ans = await response.json();                  
      setNotifications(ans.NotificationArray);
    }
    fetchNotifications();
  }, [])


  return (
    <div className="modal-overlay">
      <div className="modal-container" >
        <div className="modal-content" id='notify-modal' >
          <button className="close-button" onClick={closeModal}>
            &#x2715;
          </button>
          <h2 id='notify-h'>Notifications</h2>

          {
  notifications.length >= 1 ? (
    <>
    <ul style={{ listStyle: "none" }}>
      {notifications.map((item, i) => {
        console.log(item, i);
        return item.type === 'follow' ? (
          <li key={i} className='notification-list'>
            <span><strong> {item.sender} </strong>{item.msg} </span><span><button style={{borderRadius:"50%"}}><i class="fa-solid fa-check"></i></button> <button style={{borderRadius:"50%"}}><i class="fa-solid fa-trash"></i></button></span>
          </li>
        ) : (
          <li key={i} className='notification-list'>
            <strong> {item.sender}</strong> {item.msg}
          </li>
        );
      })}
    </ul>
      <button className='btn btn-danger notify-button' onClick={handleRead}>Mark all as read</button>
      </>
  ):(
   <></>
  )
}


        
        </div>
      </div>
    </div>
  );
}