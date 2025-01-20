import React from 'react';
import './Modal.css'

function Modal(props) {
  return (
    <div className="overlay">
      <div className="modal-bg">
        <p>{props.message}</p>
        <div className="modal-button-container">
          <button onClick={props.onConfirm}>OK</button>
          <button onClick={props.onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal
