import React from 'react';
import './Modal.css'

function Modal(props) {
  return (
    <div className="overlay">
      <div className="modal-bg">
        <p>{props.message}</p>
        <div className="modal-button-container">
          <button onClick={props.onConfirm} className='modal-button'>OK</button>
          <button onClick={props.onCancel} className='modal-button'>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
