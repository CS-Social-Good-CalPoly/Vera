import React from 'react'

import {
    TileGroupDiv,
    TitleContainer,
    Heading,
    TileGroup,
} from '../Shared/TileGroup.js'

import { ResourcePageTile } from '../components.js'

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
                        id={
                            resource && resource._id
                                ? resource._id
                                : 'resource_id_was_not_found'
                        }
                        infoText={resource.LongDescription}
                        title={resource.Title}
                        imageUrl={resource.ImageURL}
                        individualIDs={resource.ResourceIDList}
                    />
                ))}
            </TileGroup>
        </TileGroupDiv>
    )
}

export default ResourcePageTileGroup
