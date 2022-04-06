import React from 'react'
import {
    TileGroupDiv,
    TitleContainer,
    Heading,
    TileGroup,
    Tiles,
} from '../Shared/TileGroup'

function StoryTileGroup({ id, title, stories }) {
    return (
        <TileGroupDiv>
            <TitleContainer>
                <Heading id={id}>{title}</Heading>
            </TitleContainer>
            <TileGroup>
                {stories.map((story, index) => (
                    <Tiles key={index}>
                        <p>{story.id}</p>
                        <p>{story.title}</p>
                        <p>{story.imageUrl}</p>
                        <p>{story.studentYear}</p>
                        <p>{story.studentMajor}</p>
                    </Tiles>
                ))}
            </TileGroup>
        </TileGroupDiv>
    );
}

export default StoryTileGroup;