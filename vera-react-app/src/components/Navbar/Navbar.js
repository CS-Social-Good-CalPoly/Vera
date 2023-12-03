import React from 'react';
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Navbar.css';

function NavBar() {
    return (
      <div className="col-12 navsection">
          <div>
            <Link to ="/Resources">
              <a href="index.html">HOME</a>
            </Link>
          </div>
          <div>
            <Link to ="/Resources">
              <a href="index.html">RESOURCES</a>
            </Link>
          </div>
          <div>
            <Link to ="/Stories">
              <a href="articles.html">STORIES</a>
            </Link>
          </div>
          <div>
            <Link to ="/StorySubmission">
              <a href="contact.html">CONTACT</a>
            </Link>
          </div>
      </div>
    );
}

export default NavBar;
