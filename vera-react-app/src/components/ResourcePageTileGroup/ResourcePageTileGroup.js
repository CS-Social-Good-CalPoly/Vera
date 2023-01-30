import React from 'react'
import {
    ResourcePageTileGroupDiv,
    TitleContainer,
    Heading,
    TileGroup,
    Tiles,
    Description,
} from '../Shared/ResourcePageTileGroup'

function ResourcePageTileGroup({ id, title, description, resources }) {
    return (
        <ResourcePageTileGroupDiv>
            <TitleContainer>
                <Heading id={id}>{title}</Heading>
                <Description id={id}>{description}</Description>
            </TitleContainer>
            <TileGroup>
                {resources.map((resource, index) => (
                    <Tiles key={index}>
                        <p>{resource.id}</p>
                        <p>{resource.title}</p>
                        <p>{resource.description}</p>
                        <p>{resource.imageUrl}</p>
                    </Tiles>
                ))}
            </TileGroup>
        </ResourcePageTileGroupDiv>
    );
}

export default ResourcePageTileGroup;
