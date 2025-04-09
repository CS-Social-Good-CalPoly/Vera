import React from 'react'
import './HomeIcon.css'

function HomeIcon({title}) {
    return (
        <div className='icon-container'>
            <img className='icon-image' src={'/icon_images/'+title+'_Icon.png'} alt={'Icon representing ' + title} />
            {title}
        </div>
    )
}

export default HomeIcon
