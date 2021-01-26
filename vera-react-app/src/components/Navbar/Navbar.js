import React from 'react';
import './Navbar.css';
import optionBar from './OptionBar.jpg'
import logo from './VeraLogo.jpg'

function Navbar() {
    return (
        <div className="main-navbar">
            <div className="logoCol">
                <img id="logo" src={logo} height="35" width="35" ></img>
            </div>
            <div className="optionCol">
                <div id="mobile"> 
                    <img id="option" src={optionBar} height="20" width="24" ></img>
                </div>
                <div id="desktop">
                    <a id ="link" href="Recourses.html"> Resources </a> 
                    <a id ="link" href="Stories.html"> Stories </a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
