import React from 'react'
import { StoryTile } from '../components.js'
import styled from 'styled-components'

export const TileGroupDiv = styled.div`
    display: flex;
    flex-direction: column;
`

export const TitleContainer = styled.div`
    border-bottom: 2px solid #000000;
    display: inline-block;
    width: 90%;
    min-width: 430px;
    margin: 0 5%;
    align-self: flex-start;

    @media only screen and (max-width: 768px) {
        border-bottom: 2px solid black;
        min-width: 100px;
    }

    @media only screen and (max-width: 360px) {
        text-align: center;
        align-self: center;
    }
`

export const TileGroup = styled.div`
    display: flex;
    flex-wrap: wrap;

    @media only screen and (max-width: 768px) {
        display: flex;
        flex-wrap: wrap;
        margin: 0 0 20px -8px;
    }

    @media only screen and (max-width: 360px) {
        justify-content: center;
    }
`

export const Heading = styled.h1`
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 30px;
    letter-spacing: 0.05em;
    text-transform: capitalize;
    padding-top: 15px;
    padding-bottom: 5px;

    @media only screen and (max-width: 768px) {
        font-size: 20px;
        line-height: 10px;
    }
`

function StoryTileGroup({ id, title, stories, tokenStories }) {
    return (
        <TileGroupDiv>
            <TitleContainer>
                <Heading id={id}>{title}</Heading>
            </TitleContainer>
            <TileGroup>
                {stories
                    .slice()
                    .reverse()
                    .map((story, index) => {
                        return (
                            <StoryTile
                                key={index}
                                id={story && story._id ? story._id : ''}
                                title={story && story.Title ? story.Title : ''}
                                imgUrl={
                                    story && story.ImageUrl
                                        ? story.ImageUrl
                                        : ''
                                }
                                description={
                                    story && story.ParagraphText
                                        ? story.ParagraphText
                                        : ''
                                }
                                studentYear={
                                    story && story.StudentYear
                                        ? story.StudentYear
                                        : ''
                                }
                                studentMajor={
                                    story && story.StudentMajor
                                        ? story.StudentMajor
                                        : ''
                                }
                                categories={story.RelevantCategoryList}
                                editable={tokenStories.includes(story._id)}
                            />
                        )
                    })}
            </TileGroup>
        </TileGroupDiv>
    )
}

export default StoryTileGroup
