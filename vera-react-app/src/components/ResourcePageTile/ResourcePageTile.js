import React from "react";
import styled from 'styled-components';
import arrowIcon from '../Shared/arrow-icon.svg';
import { Tile, TileIcon, TileTitle, TileBanner } from '../Shared/Tile';
import { Link } from "react-router-dom";
import '../Shared/Tile.css';

const InfoText = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.05em;
  color: #4a6e82;
  padding: 0 20px 0px;
  position: relative;
  bottom: 10px;
  margin: 0px;
  width: 100%;
  height: 37%;
  overflow: hidden;
  
  @media only screen and (max-width: 768px) {
    height: 35%;
    font-size: 10px;
    line-height: 12px;
    padding-left: 6px;
    padding-top: 4px;
  }
`;

/* Component Props
 * imageUrl
 * title
 * infoText
 */

function ResourcePageTile(props) {
    return (
      <Tile onClick={props.handleClick} className='tile'>
        <Link to="/individualResource" className='tile-link'>
          <TileBanner src={props.imageUrl} alt={props.title} />
          <TileTitle>{props.title}</TileTitle>
          <InfoText>{props.infoText}</InfoText>
          <TileIcon src={arrowIcon} />
        </Link>
      </Tile>
    )
}

export default ResourcePageTile;
