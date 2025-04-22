import React from 'react'
import './HomeIcon.css'
import { LinkButton } from '../components.js'

function HomeIcon({title, link}) {
    return (
        <LinkButton className='icon-container' link={link}>
            <img className='icon-image' src={'/icon_images/'+title+'_Icon.png'} alt={'Icon representing ' + title} />
            {title}
        </LinkButton>
    )
}

export default HomeIcon
