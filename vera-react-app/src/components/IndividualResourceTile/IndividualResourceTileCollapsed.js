import React from 'react';
import styled from 'styled-components';
import { Tiles } from '../Shared/TileGroup';
import { TileIcon, TileTitle, TileBanner } from '../Shared/Tile';
import arrowIcon from '../Shared/arrow-icon.svg';

const InfoText = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 26px;
  letter-spacing: 0.05em;
  width: 90%;
  height: 30%;
  color: #4a6e82;
  padding: 0 22px 22px;
  position: relative;
  margin: 0px;
  align-self: center;

  @media only screen and (max-width: 768px) {
    position: relative;
    margin: 0px;
    width: 90%;
    height: 30%;
    font-size: 12px;
    line-height: 15px;
    padding: 0 6px 0px;
    overflow: hidden;
    align-self: center;
  }
`;

function IndividualResourceTileCollapsed(props) {
  return (
    <Tiles onClick={props.handleChange}>
      <TileBanner src={props.imageUrl} alt={props.title} />
      <TileTitle>{props.title}</TileTitle>
      <InfoText>{props.infoText}</InfoText>
      <TileIcon src={arrowIcon} />
    </Tiles>
  );
}

export default IndividualResourceTileCollapsed;
