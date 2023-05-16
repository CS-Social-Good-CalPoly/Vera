import React from 'react';
import {
  TileGroupDiv,
  TitleContainer,
  Heading,
  TileGroup,
} from '../Shared/TileGroup';
import IndividualResourceTile from '../IndividualResourceTile/IndividualResouceTile';

function IndividualResourceTileGroup({ id, title, resources }) {
  return (
    <TileGroupDiv>
      <TitleContainer>
        <Heading id={id}>{title}</Heading>
      </TitleContainer>
      <TileGroup>
        {resources.map((resource, index) => (
          <IndividualResourceTile
            imgUrl={resource.imageUrl}
            title={resource.title}
            description={resource.description}
            buildingName={resource.building}
            address={resource.address}
            toExpect={resource.whatToExpectList}
            phone={resource.phone}
            hours={resource.hourList}
            link={resource.link}
          />
        ))}
      </TileGroup>
    </TileGroupDiv>
  );
}

export default IndividualResourceTileGroup;
