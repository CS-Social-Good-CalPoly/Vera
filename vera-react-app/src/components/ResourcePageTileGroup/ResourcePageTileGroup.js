import React from 'react'

import {
    TileGroupDiv,
    TitleContainer,
    Heading,
    TileGroup
} from '../Shared/TileGroup'

import {ResourcePageTile} from '../components'

function ResourcePageTileGroup({ id, title, resources }) {
    
    return (
        <TileGroupDiv>
            <TitleContainer>
                <Heading id={id}>{title}</Heading>
            </TitleContainer>
            <TileGroup>
                {resources.map((resource, index) => (
                    <ResourcePageTile
                        key={index}
                        infoText={resource?.LongDescription || 'No description available'}
                        title={resource?.Title || 'Untitled'}
                        imageUrl={resource?.ImageURL || ''}
                    />
                ))}
            </TileGroup>
        </TileGroupDiv>
    );
}

export default ResourcePageTileGroup;
