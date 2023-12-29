import React, { useState, useContext, useEffect } from 'react';
import '../styles/modal.css'
import { StatesProvider } from '../States/states'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Notify({ closeModal }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const { setN, notifications, setNotifications, loginEmail } = useContext(StatesProvider);
  const handleRead = async () => {
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

  const handleAddFriend =async (reqUserEmail, reqUserName) => {
    let response = await fetch(`${BASE_URL}/followers/addFriend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: loginEmail,
        requestedUser: reqUserEmail
      })
    })
    const ans = await response.json();
    if(response.status===200){
      Successnotify(reqUserName);
    }

  }
  
  
  const handleDeleteFriend = () => {

  }

  const Successnotify = (name) => toast.info(`${name} is now your follower`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const Faliurnotify = () => toast.info('Fialed to update', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });




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

  console.log(notifications);


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
                    return item.type === 'follow' ? (
                      <li key={i} className='notification-list'>
                        <span>
                          <img style={{ height: "30px", width: "30px", borderRadius: "50%" }} src={item.pic === '' ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' : BASE_URL + item.pic} alt="" />
                          <strong> {item.name} </strong>{item.msg} </span><span>

                          <button onClick={()=>handleAddFriend(item.email,item.name)} style={{ borderRadius: "50%" }}><i class="fa-solid fa-check"></i></button>

                          <button onClick={handleDeleteFriend} style={{ borderRadius: "50%" }}><i class="fa-solid fa-trash"></i></button></span>
                      </li>
                    ) : (
                      <li key={i} className='notification-list'>
                        <strong> {item.sender}</strong>
                      </li>
                    );
                  })}
                </ul>
                <button className='btn btn-danger notify-button' onClick={handleRead}>Mark all as read</button>
              </>
            ) : (
              <></>
            )
          }



        </div>
      </div>
    </div>
  );
}