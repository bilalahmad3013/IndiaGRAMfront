import React, { useState } from 'react';
import '../styles/modal.css'



export default function Followers({closeModal }) {
   
  
    return (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <button className="close-button" onClick={closeModal}>
                &#x2715;
              </button>
              <h2>Followers</h2>
              <p>This is the modal body text.</p>
              
            </div>
          </div>
        </div>
      );
}