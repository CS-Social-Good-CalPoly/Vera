import React from 'react';
import './Banner.css';

function Banner(props) {

    return (
      <div
        className="img"
        style={{ backgroundImage: `url(${props.imageUrl})` }}
      >
        <h1 className="header">{props.bigWords}</h1>
        <h2 className="header2">{props.smallWords}</h2>
        <picture className="logo">
        <source media="(min-width: 0px)" srcSet={props.logo} />
        <img src={props.logo} alt="vera logo" />
      </picture>
      </div>
    );
}

export default Banner;
