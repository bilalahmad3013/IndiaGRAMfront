import React from 'react'
import { createContext, useState } from 'react'


export const StatesProvider = createContext();

export default function States({ children }) {
    const [title,setTitle]=useState("");


   document.title='IndiaGram | ' + title;
  return (
    <StatesProvider.Provider value={{setTitle}}>
            {children}
        </StatesProvider.Provider>
    
  )
}
