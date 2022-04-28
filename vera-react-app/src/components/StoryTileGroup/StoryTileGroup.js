import React from 'react'
import {
    TileGroupDiv,
    TitleContainer,
    Heading,
    TileGroup
} from '../Shared/TileGroup'

import {Tile} from '../Shared/Tile'
import { StoryTile } from '../components';
function StoryTileGroup({ id, title, stories }) {
    return (
        <TileGroupDiv>
            <TitleContainer>
                <Heading id={id}>{title}</Heading>
            </TitleContainer>
            <TileGroup>
                {stories.map((story, index) => (
                    /*<Tile key={index}>
                        <p>{story.id}</p>
                        <p>{story.title}</p>
                        <p>{story.imageUrl}</p>
                        <p>{story.studentYear}</p>
                        <p>{story.studentMajor}</p>
                    </Tile>*/
                    <StoryTile 
                        id = {story.id}
                        title = {story.title}
                        imgUrl={story.imageUrl}
                        description={story.description}
                        buildingName={story.building}
                        address={story.address}
                        toExpect={story.whatToExpectList}
                        phone={story.phone}
                        hours={story.hourList}
                        link={story.resourceLink}
                        
                        studentYear={story.studentYear}
                        studentMajor={story.studentMajor}
                    />
                ))}
            </TileGroup>
        </TileGroupDiv>
    );
}

export default StoryTileGroup;