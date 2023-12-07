import React from 'react';
import './TopLogo.css';
import logo from './VeraLogo.png';

function Toplogo() {
    return (
        <div className="top-logo">
            <img className="animate__animated animate__fadeInUp" src={logo} alt="Logo"></img>
        </div>
    );
}

export default Toplogo;