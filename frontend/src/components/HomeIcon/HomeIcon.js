import React from 'react'
import './HomeIcon.css'
import { HashLink } from 'react-router-hash-link';

function HomeIcon({title, link}) {
    return (
        <HashLink
            smooth
            to={link}
            className='icon-container'
        >
            <img className='icon-image' src={'/icon_images/'+title+'_Icon.png'} alt={'Icon representing ' + title} />
            {title}
        </HashLink>
    )
}

export default HomeIcon
