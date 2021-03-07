import React from 'react'
import './StoryTile.css'
import icon from './arrow-icon.svg'

/* Component Props
 * imageUrl
 * title
 * student year
 * student major
 */

function StoryTile(props) {
    return (
        <div className="StoryTile">
            <img className="banner" src={props.imageUrl} alt=""/>
            <div className="tile-text">
                <h1 className="title">{props.title}</h1>
                <div className="info">
                    <h2 className="info-text">{props.studentYear} Year</h2>
                    <h2 className="info-text">{props.studentMajor} Major</h2>
                </div>
                <img className="icon" src={icon} alt="" />
            </div>
        </div>
    )
}

export default StoryTile;

