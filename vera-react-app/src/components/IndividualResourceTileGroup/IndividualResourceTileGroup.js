import { useEffect } from 'react';
import {
  TileGroupDiv,
  TitleContainer,
  Heading,
  TileGroup,
} from '../Shared/TileGroup';
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
        {resources != null &&
          resources.map((resource) => (
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
