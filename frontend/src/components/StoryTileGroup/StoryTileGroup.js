import React from 'react'
import {
    TileGroupDiv,
    TitleContainer,
    Heading,
    TileGroup,
} from '../Shared/TileGroup'

import { StoryTile } from '../components'


function StoryTileGroup({ id, title, stories }) {
    return (
        <TileGroupDiv>
            <TitleContainer>
                <Heading id={id}>{title}</Heading>
            </TitleContainer>
            <TileGroup>
                {stories.map((story, index) => {
                    // console.log(story._id)
                    return (
                        <StoryTile
                            key={index}
                            id={story && story._id ? story._id : ''}
                            title={story && story.Title ? story.Title : ''}
                            imgUrl={
                                story && story.ImageUrl ? story.ImageUrl : ''
                            }
                            description={
                                story && story.ParagraphText
                                    ? story.ParagraphText
                                    : ''
                            }
                            studentYear={
                                story && story.StudentYear
                                    ? story.StudentYear
                                    : ''
                            }
                            studentMajor={
                                story && story.StudentMajor
                                    ? story.StudentMajor
                                    : ''
                            }
                            // buildingName={story.building}
                            // address={story.address}
                            // toExpect={story.whatToExpectList}
                            // phone={story.phone}
                            // hours={story.hourList}
                            // link={story.resourceLink}
                        />
                    )
                })}
            </TileGroup>
        </TileGroupDiv>
    )
}

export default StoryTileGroup
