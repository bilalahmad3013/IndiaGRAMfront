import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { Prev } from 'react-bootstrap/esm/PageItem';
import socketIO from 'socket.io-client';


export const StatesProvider = createContext();

export default function States({ children }) {

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
  const loginEmail = decodeURIComponent(getCookie("userEmail"));

  const [title, setTitle] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [n, setN] = useState(0);

  useEffect(() => {

    const newSocket = socketIO.connect(BASE_URL);
    setSocket(newSocket);
    newSocket.on('followRequest', async (data) => {
      setN((prevN) => prevN + 1);
      let response = await fetch(`${BASE_URL}/Notifications/createNotification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: loginEmail,
          obj: {
            sender: data.senderUserId,
            msg: data.msg,
            type:"follow"
          }
        })
      })
      if (!response.ok) {
        console.log("Something went wrong in uploading the notification");
      }
    });

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
      setN(ans.NotificationArray.length);
    }

    fetchNotifications();
    return () => {

      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);




  document.title = 'IndiaGram | ' + title;
  return (
    <StatesProvider.Provider value={{ setTitle, socket, loginEmail, setN, n, notifications, setNotifications }}>
      {children}
    </StatesProvider.Provider>

  )
}
