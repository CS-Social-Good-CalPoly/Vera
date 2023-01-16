import React from 'react'
import arrow from './arrow-icon.svg'
import styled from 'styled-components';
import { Tile, TileIcon, TileTitle, TileBanner } from '../Shared/Tile';

const Info = styled.div`
  padding-left: 23px;
  padding-right: 50px;
  position: relative;
  bottom: 5px;

  @media only screen and (max-width: 768px) {
    padding-left: 10px;
    padding-right: 15px;
    position: relative;
    bottom: 4px;
  }
`;

const InfoText = styled.div`
  margin: 0;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #4a6e82;

  @media only screen and (max-width: 768px) {
    font-weight: normal;
    font-size: 8px;
    line-height: 10px;
  }
`;

function StoryTile(props) {
    return (
        <Tile /*onClick={props.handleChange()}*/>
            <TileBanner src={props.imgUrl} alt={props.title}/>
            <TileTitle>{props.title}</TileTitle>
            <Info>
                <InfoText>{props.studentYear} Year</InfoText>
                <InfoText>{props.studentMajor} Major</InfoText>
            </Info>
            <TileIcon src={arrow} />
        </Tile>
    )
}

export default StoryTile;

