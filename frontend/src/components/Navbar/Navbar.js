import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from './VeraLogo.jpg'

function NavBar() {
    return (
        <Navbar className="nav-main" bg="light" expand="lg">
            <Link to="/">
                <div className="logoCol">
                    <img id="logo" src={logo} height="35" width="35"></img>
                </div>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link className="navbar-links" to="/Resources">
                        Resources
                    </Link>
                    <Link className="navbar-links" to="/Stories">
                        Stories
                    </Link>
                    <Link className="navbar-links" to="/StorySubmission">
                        Share Your Story
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
