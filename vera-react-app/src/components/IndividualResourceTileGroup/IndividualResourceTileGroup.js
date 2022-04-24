import { useState, useEffect } from 'react';
import {
  TileGroupDiv,
  TitleContainer,
  Heading,
  TileGroup,
} from '../Shared/TileGroup';
import IndividualResourceTile from '../IndividualResourceTile/IndividualResouceTile';
import ResourcePageTile from '../ResourcePageTile/ResourcePageTile';

function IndividualResourceTileGroup({ id, title, resources }) {
  useEffect(() => {
    fetch('http://localhost:5000/');
  }, []);
  return (
    <TileGroupDiv>
      <TitleContainer>
        <Heading id={id}>{title}</Heading>
      </TitleContainer>
      <TileGroup>
        {resources &&
          resources.map((resource, index) => (
            // <IndividualResourceTile
            //   imgUrl={resource.imageUrl}
            //   title={resource.title}
            //   description={resource.description}
            //   buildingName={resource.building}
            //   address={resource.address}
            //   toExpect={resource.whatToExpectList}
            //   phone={resource.phoneNumber}
            //   hours={resource.hourList}
            //   link={resource.resourceLink}
            // />
            <ResourcePageTile
              imageUrl={resource.ImageUrl}
              title={resource.Title}
              info={resource.ShortDescription}
            />
          ))}
      </TileGroup>
    </TileGroupDiv>
  );
}

export default IndividualResourceTileGroup;
