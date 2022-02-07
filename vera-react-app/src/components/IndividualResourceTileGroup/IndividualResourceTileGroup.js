import React from 'react'
import {
    TileGroupDiv,
    TitleContainer,
    Heading,
    TileGroup,
    Tiles,
} from '../Shared/TileGroup'

function IndividualResourceTileGroup({ id, title, resources }) {
    return (
        <TileGroupDiv>
            <TitleContainer>
                <Heading id={id}>{title}</Heading>
            </TitleContainer>
            <TileGroup>
                {resources.map((resource, index) => (
                    <Tiles key={index}>
                        <p>{resource.imageUrl}</p>
                        <p>{resource.title}</p>
                        <p>{resource.description}</p>
                        <p>{resource.building}</p>
                        <p>{resource.address}</p>
                        <p>{resource.whatToExpectList}</p>
                        <p>{resource.building}</p>
                        <p>{resource.phoneNumber}</p>
                        <p>{resource.hourList}</p>
                        <p>{resource.resourceLink}</p>
                        <p>{resource.resourceLink}</p>
                    </Tiles>
                ))}
            </TileGroup>
        </TileGroupDiv>
    );
}

export default IndividualResourceTileGroup;