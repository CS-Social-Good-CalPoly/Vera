import React from 'react'
import './HomeIcon.css'
import { Link } from 'react-router-dom'

function HomeIcon({title, link}) {
    return (
        <Link
            to={{
                pathname: link
            }}
            className='icon-container'
        >
            <img className='icon-image' src={'/icon_images/'+title+'_Icon.png'} alt={'Icon representing ' + title} />
            {title}
        </Link>
    )
}

export default HomeIcon
