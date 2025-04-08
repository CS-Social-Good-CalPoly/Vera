import React from 'react'
import {
    TileGroupDiv,
    TitleContainer,
    Heading,
    TileGroup,
} from '../Shared/TileGroup.js'
import IndividualResourceTile from '../IndividualResourceTile/IndividualResouceTile.js'

function ResourcePageTileGroup({ id, title, resources }) {
    return (
        <TileGroupDiv>
            <TitleContainer>
                <Heading id={id}>{title}</Heading>
            </TitleContainer>
            <TileGroup>
                {resources.map((resource, index) => (
                    <IndividualResourceTile
                        key={index}
                        imgUrl={resource.ImageURL}
                        title={resource.Title}
                        description={resource.ParagraphText}
                        buildingName={resource.Building}
                        address={resource.Address}
                        extraInfo={resource.ExtraInfo}
                        phone={resource.PhoneNumber}
                        hours={resource.ListOfHours}
                        link={resource.ResourceURL}
                    />
                ))}
            </TileGroup>
        </TileGroupDiv>
    )
}

export default ResourcePageTileGroup
