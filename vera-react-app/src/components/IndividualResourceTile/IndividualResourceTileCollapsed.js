import React from 'react';
import styled from 'styled-components';
import { Tile, TileIcon, TileTitle, TileBanner } from '../Shared/Tile';
import arrow from './right-arrow.svg';

const InfoText = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 26px;
  letter-spacing: 0.05em;
  color: #4a6e82;
  padding: 0 22px 22px;
  position: relative;
  bottom: 10px;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 12px;
    padding: 0 6px 12px;
  }
`;

function IndividualResourceTileCollapsed(props) {
  return (
    <Tile onClick={props.handleChange}>
      <TileBanner src={props.imageUrl} alt={props.title} />
      <TileTitle>{props.title}</TileTitle>
      <InfoText>{props.infoText}</InfoText>
      <TileIcon src={arrow} />
    </Tile>
  );
}

export default IndividualResourceTileCollapsed;
