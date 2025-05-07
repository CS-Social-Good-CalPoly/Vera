import arrow from './arrow-icon.svg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import React from 'react'
import { Tile, TileIcon, TileTitle, TileBanner } from '../Shared/Tile.js'
import '../Shared/Tile.css'

const Info = styled.div`
    padding: 0 20px;  /* Changed: removed top/bottom padding */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;  /* Changed: align from top */
    flex: 1;  /* Added: take available space */

    @media only screen and (max-width: 768px) {
        padding: 0 10px 10px 10px;
        width: 100%;
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

const Categories = styled.div`
    margin-top: 10px;
`

const CategoryTag = styled.span`
    display: inline-block;
    background-color: #4a6e82;
    color: white;
    padding: 2px 8px;
    margin-right: 5px;
    border-radius: 3px;
    font-size: 12px;

    @media only screen and (max-width: 768px) {
        font-size: 8px;
        padding: 1px 4px;
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
                style={{ 
                    display: 'flex',  // Added: make link a flex container
                    width: '100%',    // Added: take full width
                    height: '100%',   // Added: take full height
                    position: 'relative' // Added: for absolute positioning of icon
                }}
            >
                <TileBanner src={props.imgUrl} alt={props.title} />
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    width: '55%' 
                }}>
                    <TileTitle>{props.title}</TileTitle>
                    <Info>
                        <InfoText>{props.studentYear}</InfoText>
                        <InfoText>{props.studentMajor} Major</InfoText>
                        <Categories>
                            {props.categories.map((category, index) => (
                                <CategoryTag key={index}>{category}</CategoryTag>
                            ))}
                        </Categories>
                    </Info>
                </div>
                <TileIcon src={arrow} />
            </Link>
        </Tile>
    )
}

export default StoryTile