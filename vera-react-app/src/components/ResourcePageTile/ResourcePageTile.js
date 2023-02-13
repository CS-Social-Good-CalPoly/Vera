import React from 'react';
import styled from 'styled-components';
import arrowIcon from '../Shared/arrow-icon.svg';
import Dotdotdot from 'react-clamp';
import { Tile, TileIcon, TileTitle, TileBanner } from '../Shared/Tile';
import { Link } from "react-router-dom";

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

/* Component Props
 * imageUrl
 * title
 * infoText
 */

function ResourcePageTile(props) {
    return (
      <Tile onClick={props.handleClick}>
        <TileBanner src={props.imageUrl} alt={props.title} />
        <TileTitle>{props.title}</TileTitle>
        <InfoText>{props.infoText}</InfoText>
        <TileIcon src={arrowIcon} />
        <Link to="/individualresource">Click Here</Link>
      </Tile>
    )
}

export default ResourcePageTile;
