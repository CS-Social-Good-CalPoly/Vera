import React, {useEffect, useRef}from "react";
import styled from 'styled-components';
import arrowIcon from '../Shared/arrow-icon.svg';
import { Tile, TileIcon, TileTitle, TileBanner } from '../Shared/Tile';
import { Link } from "react-router-dom";
import '../Shared/Tile.css';
// import './resourcePageTile.css';

const InfoText = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.05em;
  color: #4a6e82;
  padding-left: 20px;
  padding-right: 40px;
  position: relative;
  bottom: 10px;
  margin: 0px;
  width: 100%;
  overflow: hidden;
  height: 100px;
  
  
  @media only screen and (max-width: 768px) {
    font-size: 10px;
    line-height: 12px;
    padding-left: 6px;
    padding-right: 14px;
    padding-top: 4px;
    height: 40px;
  }
`;

/* Component Props
 * imageUrl
 * title
 * infoText
 */

function ResourcePageTile(props) {
    const titleRef = useRef(null);
    const infoTextRef = useRef(null);
  
    useEffect(() => {
        setTimeout(() => {
          const infoTextElement = infoTextRef.current;
          if (infoTextElement.scrollHeight > infoTextElement.clientHeight) {
            infoTextElement.classList.add('fade-out-container-text');
          }
        }, 100);
      }, []);

    useEffect(() => {
        setTimeout(() => {
          const titleElement = titleRef.current;
          if (titleElement.scrollHeight > titleElement.clientHeight) {
            titleElement.classList.add('fade-out-container-title');
          }
        }, 100);
      }, []);
          
    return (
      <Tile onClick={props.handleClick} className='tile'>
        <Link to="/individualResource" className='tile-link'>
          <TileBanner src={props.imageUrl} alt={props.title} />
          <TileTitle ref={titleRef}>{props.title}</TileTitle>
          <InfoText ref={infoTextRef}>{props.infoText}</InfoText>

          <TileIcon src={arrowIcon} />
        </Link>
      </Tile>
    );
  }

export default ResourcePageTile;
