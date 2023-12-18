import React from 'react';
import './Footer.css';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

function Footer() {
    return (
        <footer className="main-footer">
            <div className="column1">
                &copy; 2020 VERA
            </div>
            <div className="column3">
                <Link className="footer-links" to = "/Resources"> Resources </Link> 
                <Link className="footer-links" to="/Stories"> Stories </Link>
            </div>
        </footer>
    );
}

export default Footer;
