import arrow from './right-arrow.png'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import React from 'react'
import '../Shared/Tile.css'
import TruncateText from '../Shared/TruncateText.jsx'
import { useState } from 'react'
import { useEffect } from 'react'

const Tile = styled.div`
    position: relative;
    width: 90%;
    height: 50vh;
    box-shadow: 4px 4px 15px rgba(114, 141, 149, 0.15);
    background: #fbfbfb;
    border-radius: 30px;
    margin: 20px auto;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    @media only screen and (max-width: 768px) {
        border-radius: 10px;
        margin: 8px auto;
    }
`

const TileBanner = styled.img`
    display: flex;
    flex: 1;
    width: 50%;
    height: 100%;
    object-fit: cover;

    @media only screen and (max-width: 768px) {
        display: flex;
        flex: 2;
        width: 100%;
        height: 40%;
    }
`

const TileInfo = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 50%;
    height: 100%;
    padding: min(2.5%, 30px);

    @media only screen and (max-width: 768px) {
        display: flex;
        flex: 3;
        width: 100%;
        padding: min(5%, 30px);
        padding-bottom: min(2.5%, 15px);
    }
`

const TileTitle = styled.h1`
    display: flex;
    flex: 7;
    position: relative;
    font-family: Poppins;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 500;
    // color: rgb(163, 163, 163);
    color: #000000;
    letter-spacing: 0.05em;
    overflow: hidden;
    text-align: left;
    text-transform: capitalize;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    @media only screen and (max-width: 768px) {
        font-weight: 600;
        font-size: 0.9rem;
        line-height: 1em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        max-height: 2em;
    }
`
const InfoText = styled.div`
    display: flex;
    flex: 12;
    margin: 0;
    padding: 0;
    font-style: normal;
    font-weight: light;
    font-size: 1rem;
    line-height: 24px;
    letter-spacing: 0.05em;
    // color: #4a6e82;
    color: #000000;

    @media only screen and (max-width: 768px) {
        font-weight: normal;
        font-size: 0.8rem;
        line-height: 18px;
    }
`

const BottomRow = styled.div`
    display: flex;
    flex: 2;
`

const Categories = styled.div`
    display: flex;
    flex: 1;
`

const CategoryTag = styled.span`
    display: inline-block;
    background-color: #4a6e82;
    color: white;
    padding: 2px 8px;
    margin: auto 5px auto 0;
    border-radius: 3px;
    font-size: 14px;
    height: fit-content;

    @media only screen and (max-width: 768px) {
        font-size: 0.75rem;
        padding: 1px 4px;
    }
`

const ViewMore = styled.div`
    display: flex;
    background: #ffffff;
    padding: 20px 32px;

    @media only screen and (max-width: 768px) {
        padding: 10px 16px;
    }
`

const ViewMoreText = styled.p`
    margin: auto 5px auto 0;
    font-family: Poppins;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    color: #333333;
    letter-spacing: 0.1rem;
    text-transform: capitalize;

    @media only screen and (max-width: 768px) {
        font-size: 0.7rem;
    }
`

const TileIcon = styled.img`
    margin: auto 5px auto 0;
    width: 15px;
    height: 15px;
    align: right;

    @media only screen and (max-width: 768px) {
        width: 10px;
        height: 10px;
    }
`

function StoryTile(props) {
    const [maxContainerWidthPx, setMaxContainerWidthPx] = useState(0)

    useEffect(() => {
        let width = 0
        const handleResize = () => {
            width = window.innerWidth
            console.log('width:', width)
            if (width < 0) {
                setMaxContainerWidthPx(0)
            } else if (width < 769) {
                setMaxContainerWidthPx(46)
            } else if (width < 1000) {
                setMaxContainerWidthPx(70)
            } else if (width < 2000) {
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
        <Tile onClick={props.handleClick} className="tile">
            <Link
                to={{
                    pathname: `/individualStory/${props.id}`,
                    state: { editable: props.editable },
                }}
                className="tile-link"
                style={{ height: '100%', padding: '0', width: '100%' }}
            >
                <TileBanner src={props.imgUrl} alt={props.title} />
                <TileInfo>
                    <TileTitle>{props.title}</TileTitle>
                    <InfoText>
                        <p style={{ paddingTop: '3%' }}>
                            <TruncateText
                                text={props.description}
                                factor={1}
                                maxLines={4}
                                containerWidth={maxContainerWidthPx}
                            />
                        </p>
                    </InfoText>
                    <BottomRow>
                        <Categories>
                            {props.categories.map((category, index) => (
                                <CategoryTag key={index}>
                                    {category}
                                </CategoryTag>
                            ))}
                        </Categories>
                        <ViewMore>
                            <ViewMoreText>View More</ViewMoreText>
                            <TileIcon src={arrow} />{' '}
                        </ViewMore>
                    </BottomRow>
                </TileInfo>
            </Link>
        </Tile>
    )
}

export default StoryTile
