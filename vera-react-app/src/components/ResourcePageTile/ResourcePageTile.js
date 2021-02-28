import React from 'react';
import './ResourcePageTile.css';
import arrowPic from './images/Arrow.jpg';
import bannerPic from "./images/TesterImage.jpg"
import { Link } from "react-router-dom";

/* Component Props
 * imageUrl
 * title
 * student year
 * student major
 */

function ResourcePageTile(props) {

    return (
        <div className="ResourcePageTileWrapper">
          <Link to={props.resourcePageLink}>
            <div className="ResourcePageTile" >
              <img className="banner" src={bannerPic} alt={bannerPic}/>
              <h1 className="title">{props.title} </h1>
              <div className="info">
                <h2 className="info-text">{props.info}</h2>
              </div>
              <img className="icon" src={arrowPic} height="20px" width="20px" alt="" />
            </div>
          </Link>
        </div>
    )
}

export default ResourcePageTile; 