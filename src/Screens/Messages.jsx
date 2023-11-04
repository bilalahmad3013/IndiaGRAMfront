
import React, { useContext, useState, useEffect } from 'react';
import { StatesProvider } from '../States/states';
import socketIO from 'socket.io-client';

export default function Messages({ user }) {
  const { setTitle } = useContext(StatesProvider);
 

  return (
    <div>
     hiiiii
    </div>
  );
}

