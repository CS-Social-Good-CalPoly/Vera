import React from 'react'
import './HomeIcon.css'

function HomeIcon({image, title}) {
    return (
        <div className='icon-container'>
            <img src={image} alt={'Icon representing ' + title} />
            {title}
        </div>
    )
}

export default HomeIcon
