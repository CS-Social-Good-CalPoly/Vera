import React from 'react'
import { Tile, TileBanner, TileIcon, TileTitle } from '../Shared/Tile'
import arrowIcon from '../Shared/arrow-icon.svg'
import '../../StandardText.css'
import './StoryTile.css'

/* Component Props
 * imageUrl
 * title
 * student year
 * student major
 */

function StoryTile(props) {
    return (
        <Tile>
            <TileBanner src={props.imageUrl} alt="" />
            <TileTitle className="tile-title">{props.title}</TileTitle>
            <div className="info">
                <h2 className="info-text">{props.studentYear}</h2>
                <h2 className="info-text">{props.studentMajor} Major</h2>
            </div>
            <TileIcon src={arrowIcon} />
        </Tile>
    )
}

export default StoryTile;
