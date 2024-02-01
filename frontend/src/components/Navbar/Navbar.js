import React from 'react'
import { useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from './VeraLogo.jpg'

function NavBar() {
    const [activeLink1, setActiveLink1] = useState(true)
    const [activeLink2, setActiveLink2] = useState(false)
    const [activeLink3, setActiveLink3] = useState(false)

    const handleLinkClick1 = () => {
        setActiveLink1(true)
        setActiveLink2(false)
        setActiveLink3(false)
    }
    const handleLinkClick2 = () => {
        setActiveLink2(true)
        setActiveLink1(false)
        setActiveLink3(false)
    }
    const handleLinkClick3 = () => {
        setActiveLink3(true)
        setActiveLink2(false)
        setActiveLink1(false)
    }

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
                    <Link
                        onClick={handleLinkClick1}
                        style={{
                            'text-decoration': activeLink1 ? 'underline' : '',
                        }}
                        className="navbar-links"
                        to="/Resources"
                    >
                        Resources
                    </Link>
                    <Link
                        onClick={handleLinkClick2}
                        style={{
                            'text-decoration': activeLink2 ? 'underline' : '',
                        }}
                        className="navbar-links"
                        to="/Stories"
                    >
                        Stories
                    </Link>
                    <Link
                        onClick={handleLinkClick3}
                        style={{
                            'text-decoration': activeLink3 ? 'underline' : '',
                        }}
                        className="navbar-links"
                        to="/StorySubmission"
                    >
                        Share Your Story
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
