import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="main-footer">
               
            <div className="column5">Call or Text
                <br></br>
                National Suicide Hotline: 1 (800)-273-3255 or 988
          <br></br>
             Cal Poly Police: (805)-783-2281
             </div>
         <div className="column1">&copy; 2024 VERA</div>
            
            <div className="column3">
                
                <Link
                    onClick={() => {
                        window.scroll(0, 0)
                    }}
                    className="footer-links"
                    to="/Resources"
                >
                    {' '}
                    Resources{' '}
                </Link>
                <Link
                    onClick={() => {
                        window.scroll(0, 0)
                    }}
                    className="footer-links"
                    to="/Stories"
                >
                    {' '}
                    Stories{' '}
                </Link>
                <Link
                    onClick = {() => {
                        window.scroll(0, 0)
                    }}
                    className = "footer-links"
                    to = "/StorySubmission"
                >
                    {' '}
                    Share Your Story{' '}
                </Link>
            </div>
        </footer>
    )
}

export default Footer
