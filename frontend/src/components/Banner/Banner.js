import React from 'react'
import './Banner.css'

function Banner(props) {
    return (
        <div
            className="img"
            style={{
                backgroundImage: `url(${props.imageUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <div className="textCol">
                <h1 className="header">{props.pageTitle}</h1>
                <h2 className="header2">{props.tagline1}</h2>
                <h2 className="header3">{props.tagline2}</h2>
            </div>
            {/* Only render the logo if props.logo exists */}
            {props.logo && <img className="logo" src={props.logo} alt="" />}
        </div>
    )
}

export default Banner
