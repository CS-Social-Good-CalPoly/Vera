import React from 'react'
import { ResourcePageTileGroupDiv, TitleContainer, Heading, TileGroup, Tiles } from '../Shared/ResourcePageTileGroup'

function ResourcePageTileGroup({id, title, resources}) {

    return (
        <ResourcePageTileGroupDiv>
            <TitleContainer>
                <Heading id={id}>{title}</Heading>
            </TitleContainer>
            <TileGroup>
                {
                    resources.map(
                        (resource, index) => (
                            <Tiles key={index}>
                                <p>{resource.id}</p>
                                <p>{resource.title}</p>
                                <p>{resource.imageUrl}</p>
                            </Tiles>
                        )
                    )
                }
            </TileGroup>
        </ResourcePageTileGroupDiv>
    )
}

export default ResourcePageTileGroup;
