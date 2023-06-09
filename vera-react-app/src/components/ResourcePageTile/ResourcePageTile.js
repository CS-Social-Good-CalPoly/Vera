import React, { useState, useEffect} from "react";
import styled from 'styled-components';
import arrowIcon from '../Shared/arrow-icon.svg';
import { Tile, TileIcon, TileTitle, TileBanner } from '../Shared/Tile';
import { Link } from "react-router-dom";
import '../Shared/Tile.css';
import TruncateText from "../Shared/TruncateText";
import { useHistory } from "react-router-dom";



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

    const [maxContainerWidthPx, setMaxContainerWidthPx] = useState(0)
    
    const { individualIDs, title, imageUrl, infoText } = props

    const history = useHistory();

    const handleTileClick = () => {

        // useHistory hook to navigate to individual resource page
        history.push({
            pathname: "/individualResource",
            state: {
              individualIDs: individualIDs,
              title: title,
              description: infoText,
              imageUrl: imageUrl,
            },
          });
    };

    useEffect(() => {
        let width = 0
        const handleResize = () => {
            width = window.innerWidth;
            if (width < 0) {
                setMaxContainerWidthPx(0);
            } else if (width > 0 && width < 769) {
                setMaxContainerWidthPx(46);
            } else if (width >= 769 && width < 2000) {
                setMaxContainerWidthPx(90);
            } else {
                setMaxContainerWidthPx(2000);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    });

    return (
        <Tile onClick={handleTileClick} className='tile'>
            <Link to="#" className='tile-link' onClick={handleTileClick}>
                <TileBanner src={props.imageUrl} alt={props.title} />
                <TileTitle>{props.title}</TileTitle>
                <InfoText >
                    {/* Larger factor means it shows less text before ellipses is added */}
                    <TruncateText text={props.infoText} factor={3.3} maxLines={4} containerWidth={maxContainerWidthPx} />
                </InfoText>
                <TileIcon src={arrowIcon} />
            </Link>
        </Tile> 
    );
}

export default ResourcePageTile;


