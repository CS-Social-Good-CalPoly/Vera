import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer({ activeLink }) {
    return (
        <footer className="main-footer">
            <div className="column1">&copy; 2024 VERA</div>
            <div className="column3">
                <Link
                    onClick={() => {
                        window.scroll(0, 0)
                    }}
                    className={`footer-links ${activeLink === '/Resources' ? 'active' : ''}`}
                    to="/Resources"
                >
                    {' '}
                    Resources{' '}
                </Link>
                <Link
                    onClick={() => {
                        window.scroll(0, 0)
                    }}
                    className={`footer-links ${activeLink === '/Stories' ? 'active' : ''}`}
                    to="/Stories"
                >
                    {' '}
                    Stories{' '}
                </Link>
                <Link
                    onClick={() => {
                        window.scroll(0, 0)
                    }}
                    className={`footer-links ${activeLink === '/StorySubmission' ? 'active' : ''}`}
                    to="/StorySubmission"
                >
                    {' '}
                    Share Your Story{' '}
                </Link>
            </div>
        </footer>
    )
}

export default Footer
