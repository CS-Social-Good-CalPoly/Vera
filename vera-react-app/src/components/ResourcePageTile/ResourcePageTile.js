import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
//import '../Shared/Tile.css';
// import './resourcePageTile.css';
import './ResourcePageTile.css';

/* Component Props
 * imageUrl
 * title
 * infoText
 */

function ResourcePageTile(props) {
    return (
        <div className="veratiles">
            <div style={{width: "100%"}}>
                <img src={props.imageUrl} alt={props.title} />
                <p></p>
                <h2 className="text-center" style={{ fontFamily: 'fat', color: '#08376B'}}>
                    <Link to="/individualResource" style={{color: '#08376B'}}>{props.title}</Link>
                </h2>
                <p className="text-center" style={{ color: 'gray' }}>Food Insecurity | National</p>
            </div>
        </div>
    );
}

export default ResourcePageTile;
