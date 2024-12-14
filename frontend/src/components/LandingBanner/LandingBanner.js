import React from 'react'
import './LandingBanner.css'
import { LinkButton } from '../components.js'

function LandingBanner(props) {
    return (
        <div
            className="img"
            style={{
                backgroundImage: `url(${props.imageUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="textCol">
                <h1 className="header1">{props.pageTitle}</h1>
                <div className='banner-button-group'>
                    <LinkButton 
                        link='/resources'
                        title='RESOURCES'
                        color='white'
                        background='#728D95'
                    />
                    <LinkButton 
                    link='/stories'
                    title='STORIES'
                    color='white'
                    background='#728D95'
                    />
                </div>
            </div>
        </div>
    )
}

export default LandingBanner
