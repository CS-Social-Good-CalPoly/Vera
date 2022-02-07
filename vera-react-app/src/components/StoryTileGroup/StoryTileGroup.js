import React from 'react';
import {
  TileGroupDiv,
  TitleContainer,
  Heading,
  TileGroup,
} from '../Shared/TileGroup';
import StoryTile from '../StoryTile/StoryTile';

function StoryTileGroup({ id, title, stories }) {
  return (
    <TileGroupDiv>
      <TitleContainer>
        <Heading id={id}>{title}</Heading>
      </TitleContainer>
      <TileGroup>
        {stories.map((story, index) => (
          <StoryTile
            key={index}
            imageUrl={story.imageUrl}
            title={story.title}
            studentYear={story.studentYear}
            studentMajor={story.studentMajor}
          />
        ))}
      </TileGroup>
    </TileGroupDiv>
  );
}

export default StoryTileGroup;
