import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Tile, TileIcon, TileTitle, TileBanner } from '../Shared/Tile.js'
import TruncateText from '../Shared/TruncateText.jsx'
import arrow from './right-arrow.svg'

const InfoText = styled.p`
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 26px;
    letter-spacing: 0.05em;
    width: 90%;
    height: 30%;
    color: #4a6e82;
    padding: 0 22px 22px;
    position: relative;
    margin: 0px;
    align-self: center;

    // @media only screen and (max-width: 768px) {
    //   position: relative;
    //   margin: 0px;
    //   width: 90%;
    //   height: 30%;
    //   font-size: 12px;
    //   line-height: 15px;
    //   padding: 0 6px 0px;
    //   overflow: hidden;
    //   align-self: center;
    // }
    @media only screen and (max-width: 768px) {
        font-size: 10px;
        line-height: 12px;
        padding-left: 6px;
        padding-right: 14px;
        padding-top: 4px;
        height: 40px;
        overflow: hidden;
    }
`

function IndividualResourceTileCollapsed(props) {
    const [maxContainerWidthPx, setMaxContainerWidthPx] = useState(0)

    useEffect(() => {
        let width = 0
        const handleResize = () => {
            width = window.innerWidth
            if (width < 0) {
                setMaxContainerWidthPx(0)
            } else if (width > 0 && width < 769) {
                setMaxContainerWidthPx(46)
            } else if (width >= 769 && width < 2000) {
                setMaxContainerWidthPx(90)
            } else {
                setMaxContainerWidthPx(2000)
            }
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    })

    return (
        <Tile onClick={props.handleChange} id={props.id}>
            <TileBanner src={props.imageUrl} alt={props.title} />
            <TileTitle>{props.title}</TileTitle>
            <InfoText>
                <TruncateText
                    text={props.infoText}
                    factor={3.3}
                    maxLines={4}
                    containerWidth={maxContainerWidthPx}
                />
            </InfoText>
            <TileIcon src={arrow} />
        </Tile>
    )
}

export default IndividualResourceTileCollapsed
