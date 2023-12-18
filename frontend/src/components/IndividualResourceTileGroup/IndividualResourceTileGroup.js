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
            imgUrl={resource.ImageURL}
            title={resource.Title}
            description={resource.ParagraphText}
            buildingName={resource.Building}
            address={resource.Address}
            toExpect={resource.WhatToExpect}
            phone={resource.PhoneNumber}
            hours={resource.ListOfHours}
            link={resource.ResourceURL}
          />
        ))}
      </TileGroup>
    </TileGroupDiv>
  );
}

export default IndividualResourceTileGroup;
