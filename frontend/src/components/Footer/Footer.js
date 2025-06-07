import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer({ activeLink }) {
    return (
        <footer className="main-footer">
            <div className="column5">
                Call or Text
                <br></br>
                <div className="inline-container">
                    <span className="inline-text-footer">
                        National Sucide Hotline:
                    </span>
                    <a href="tel:+18002738255" className="inline-text-footer">
                        +1(800)-273-8255
                    </a>
                    or
                    <a href="tel:+988" className="inline-text-footer">
                        988
                    </a>
                </div>
                <div className="inline-container">
                    <span className="inline-text-footer">Cal Poly Health:</span>
                    <a className="inline-text-footer" href="tel:+18057562511">
                        +1 (805)-756-2511
                    </a>
                </div>
                <div className="inline-container">
                    <span className="inline-text-footer">Cal Poly Police:</span>
                    <a className="inline-text-footer" href="tel:+18057562281">
                        +1 (805)-756-2281
                    </a>
                </div>
            </div>
            <div className="column1">&copy; 2025 VERA</div>

            <div className="column3">
                <Link
                    onClick={() => {
                        window.scroll(0, 0)
                    }}
                    className={`footer-links ${activeLink === '/' ? 'active' : ''}`}
                    to="/"
                >
                    {' '}
                    Home{' '}
                </Link>
                <Link
                    onClick={() => {
                        window.scroll(0, 0)
                    }}
                    className={`footer-links ${activeLink === '/About' ? 'active' : ''}`}
                    to="/About"
                >
                    {' '}
                    About{' '}
                </Link>
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
