import React from 'react'
import styled from 'styled-components'
import { Tile, TileBanner, TileIcon, TileTitle } from '../Shared/Tile'
import arrowIcon from '../Shared/arrow-icon.svg'

/* Component Props
 * imageUrl
 * title
 * student year
 * student major
 */

const Info = styled.div`
    padding-left: 23px;
    padding-right: 50px;
    position: relative;
    bottom: 5px;

    @media only screen and (max-width: 768px) {
        padding-left: 10px;
        padding-right: 15px;
        position: relative;
        bottom: 4px;
    }
`;

const InfoText = styled.h2`
    margin: 0;
    font-family: Poppins;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #4A6E82;

    @media only screen and (max-width: 768px) {
        font-size: 8px;
        line-height: 10px;
    }
`;

function StoryTile(props) {
    return (
        <Tile>
            <TileBanner src={props.imageUrl} alt={props.title} />
            <TileTitle>{props.title}</TileTitle>
            <Info>
                <InfoText>{props.studentYear}</InfoText>
                <InfoText>{props.studentMajor} Major</InfoText>
            </Info>
            <TileIcon src={arrowIcon} />
        </Tile>
    )
}

export default StoryTile;
