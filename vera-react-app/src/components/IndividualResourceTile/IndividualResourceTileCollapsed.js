import React from 'react'
import styled from 'styled-components'
import {
    Tile,
    TileBanner,
    TileIcon
} from '../Shared/Tile'
import arrowIcon from '../Shared/arrow-icon.svg'
import '../../StandardText.css'

export const Title = styled.h1`
    position: relative;
    bottom: 1.4px;
    padding: 0 14px;

    @media only screen and (max-width: 768px) {
        padding: 0 6px;
        font-weight: 600;
        font-size: 10px;
        line-height: 12px;
    }
`;

function IndividualResourceTileCollapsed(props) {
    return (
        <Tile onClick={props.handleChange}>
            <TileBanner src={props.imageUrl} alt="" />
            <Title className="tile-title">{props.title}</Title>
            <TileIcon src={arrowIcon} />
            <h2 className="general-text">{props.infoText}</h2>
        </Tile>
    )
}

export default IndividualResourceTileCollapsed;

