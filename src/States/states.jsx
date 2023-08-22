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
  const [n, setN]=useState(0);

  useEffect(() => {

    const newSocket = socketIO.connect(BASE_URL);


    setSocket(newSocket);

   

    newSocket.on('followRequest', (data) => {
       setN(n+1);
    });


    return () => {

      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [BASE_URL]);




  document.title = 'IndiaGram | ' + title;
  return (
    <StatesProvider.Provider value={{ setTitle, socket, loginEmail , setN, n}}>
      {children}
    </StatesProvider.Provider>

  )
}
