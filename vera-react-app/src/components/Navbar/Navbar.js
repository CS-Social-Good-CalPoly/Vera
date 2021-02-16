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
                <button class="mobile" id= "mobile" onClick={() =>
                         {document.getElementById('desktop').classList.toggle('show')}  }> 
                    <img id="option" src={optionBar} height="16" width="16" ></img>
                </button>
                <div id="desktop">
                    <a id ="link" href="Recourses.html"> Resources </a> 
                    <a id ="link" href="Stories.html"> Stories </a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
