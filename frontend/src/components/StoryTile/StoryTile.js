import arrow from './arrow-icon.svg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { Tile, TileIcon, TileTitle, TileBanner } from '../Shared/Tile'
import '../Shared/Tile.css'
// import slugify from 'slugify'

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
`

const InfoText = styled.div`
    margin: 0;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #4a6e82;

    @media only screen and (max-width: 768px) {
        font-weight: normal;
        font-size: 8px;
        line-height: 10px;
    }
`

function StoryTile(props) {
    return (
        <Tile onClick={props.handleClick} className="tile">
            <Link
                to={{
                    pathname: `/individualStory/${props.id}`,
                }}
                className="tile-link"
            >
                <TileBanner src={props.imgUrl} alt={props.title} />
                <TileTitle>{props.title}</TileTitle>
                <Info>
                    <InfoText>{props.studentYear}</InfoText>
                    <InfoText>{props.studentMajor} Major</InfoText>
                </Info>
                <TileIcon src={arrow} />
            </Link>
        </Tile>
    )
}

export default StoryTile
