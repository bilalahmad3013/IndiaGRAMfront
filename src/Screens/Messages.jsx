
import React, { useContext, useState, useEffect } from 'react';
import { StatesProvider } from '../States/states';
import socketIO from 'socket.io-client';

export default function Messages({ user }) {
  const { setTitle } = useContext(StatesProvider);
 

  return (
    <div>
     
    </div>
  );
}
=======
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
>>>>>>> f83fb0f83a177ffe9c9bfabba4a67835dba026f3
