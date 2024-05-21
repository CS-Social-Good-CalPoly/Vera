import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'
import logo from './VeraLogo.jpg'
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from '@clerk/clerk-react'

function NavBar({ activeLink }) {
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
                    <NavLink
                        className="navbar-links"
                        to="/Resources"
                        activeClassName={
                            activeLink === '/Resources' ? 'active' : ''
                        }
                    >
                        Resources
                    </NavLink>
                    <NavLink
                        className="navbar-links"
                        to="/Stories"
                        activeClassName={
                            activeLink === '/Stories' ? 'active' : ''
                        }
                    >
                        Stories
                    </NavLink>
                    <NavLink
                        className="navbar-links"
                        to="/StorySubmission"
                        activeClassName={
                            activeLink === '/StorySubmission' ? 'active' : ''
                        }
                    >
                        Share Your Story
                    </NavLink>
                    <>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
