import React from 'react';
import './ResourcePageTile.css';
import arrowPic from './images/Arrow.jpg';
import { Link } from "react-router-dom";
import Dotdotdot from 'react-clamp';

/* Component Props
 * imageUrl
 * title
 * info 
 * resourcePageLink
 */

function ResourcePageTile(props) {

    return (
        <div className="ResourcePageTileWrapper">
          <Link to={props.resourcePageLink}>
            <div className="ResourcePageTile" >
              <img className="banner" src={props.imageUrl} alt={props.title}/>
              <div className="content-box">
                  <h1 className="title">{props.title} </h1>
                  <h2 className="info-text">{props.info}</h2>
              </div>
            </div>
            <img className="icon" src={arrowPic} height="20px" width="20px" alt="arrow" />
          </Link>
        </div>
    )
}

export default ResourcePageTile;
