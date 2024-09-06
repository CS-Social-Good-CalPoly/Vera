import React from 'react'
import {
    TileGroupDiv,
    TitleContainer,
    Heading,
    TileGroup,
} from '../Shared/TileGroup.js'

import { StoryTile } from '../components.js'

function StoryTileGroup({ id, title, stories }) {
    return (
        <TileGroupDiv>
            <TileGroup>
                {stories.map((story, index) => {
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
                            categories={story.RelevantCategoryList}
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
