import React, { useState , useContext} from 'react';
import '../styles/modal.css'
import { StatesProvider } from '../States/states'



export default function Notify({closeModal }) {

    
  const {setN } = useContext(StatesProvider);

  const handleRead =()=>{
    // setN(0);
  }
   
  
    return (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <button className="close-button" onClick={closeModal}>
                &#x2715;
              </button>
              <h2>Notifications</h2>
              <p>This is the modal body text.</p>



              <button className='btn btn-danger' onClick={handleRead}>Mark all as read</button>
            </div>
          </div>
        </div>
      );
}