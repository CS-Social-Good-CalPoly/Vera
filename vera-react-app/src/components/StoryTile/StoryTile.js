import arrow from './arrow-icon.svg'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Tile, TileIcon, TileTitle, TileBanner } from '../Shared/Tile';
import '../Shared/Tile.css';
import './StoryTile.css';

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
      <div className="veratiles">
            <div style={{width: "100%"}}>
                <img src={props.imgUrl} alt={props.title} />
                <p></p>
                <h2 className="text-center" style={{ fontFamily: 'fat', color: '#08376B'}}>
                    <Link to="/individualResource" style={{color: '#08376B'}}>{props.title}</Link>
                </h2>
                <p className="text-center" style={{ color: 'gray' }}>{props.studentYear} | {props.studentMajor}</p>
            </div>
        </div>
    )
}

export default StoryTile;

