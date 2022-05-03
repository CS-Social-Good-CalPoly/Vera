import React from 'react'
import arrow from './arrow-icon.svg'
import styled from 'styled-components';
import { Tile, TileIcon, TileTitle, TileBanner } from '../Shared/Tile';
import {
    StoryTileDiv, Banner, TitleText, Title, Info, InfoText, Icon} from '../Shared/StoryTile'

/* Component Props
 * imageUrl
 * title
 * student year
 * student major
 */

function StoryTile(props) {
    return (
        <Tile /*onClick={props.handleChange()}*/>
            <TileBanner src={props.imgUrl} alt={props.title}/>
            <TileTitle>{props.title}</TileTitle>
            <Info>
                <InfoText>{props.studentYear} Year</InfoText>
                <InfoText>{props.studentMajor} Major</InfoText>
            </Info>
            <TileIcon src={arrow} />
        </Tile>
    )
}

export default StoryTile;

