import React from 'react'
import arrow from './arrow-icon.svg'
import {
    StoryTileDiv,
    Banner,
    TitleText,
    Title,
    Info,
    InfoText,
    Icon
} from '../Shared/StoryTile'

/* Component Props
 * imageUrl
 * title
 * student year
 * student major
 */

function StoryTile(props) {
    return (
        <StoryTileDiv>
            <Banner src={props.imageUrl} alt=""/>
            <TitleText>
                <Title>{props.title}</Title>
                <Info>
                    <InfoText>{props.studentYear} Year</InfoText>
                    <InfoText>{props.studentMajor} Major</InfoText>
                </Info>
                <Icon src={arrow} alt="" />
            </TitleText>
        </StoryTileDiv>
    )
}

export default StoryTile;

