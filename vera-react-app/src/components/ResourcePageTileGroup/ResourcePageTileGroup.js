import React from 'react'

import {
    TileGroupDiv,
    TitleContainer,
    Heading,
    TileGroup,
//     Tiles,
//     Description,
// } from '../Shared/ResourcePageTileGroup'
    TileGroup
} from '../Shared/TileGroup'

import {ResourcePageTile} from '../components'

function ResourcePageTileGroup({ id, title, description, resources }) {
    return (
        <TileGroupDiv>
            <TitleContainer>
                <Heading id={id}>{title}</Heading>
                <Description id={id}>{description}</Description>
            </TitleContainer>
            <TileGroup>
                {resources.map((resource, index) => (
                    // <Tiles key={index}>
                    //     <p>{resource.id}</p>
                    //     <p>{resource.title}</p>
                    //     <p>{resource.description}</p>
                    //     <p>{resource.imageUrl}</p>
                    // </Tiles>
                    <ResourcePageTile key={index}
                        infoText={resource.description}
                        title={resource.title}
                        imageUrl={resource.imageUrl}
                    />
                ))}
            </TileGroup>
        </TileGroupDiv>
    );
}

export default ResourcePageTileGroup;
