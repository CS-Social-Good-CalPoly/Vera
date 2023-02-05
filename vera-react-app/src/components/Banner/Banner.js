import React from 'react';
import './Banner.css';

function Banner(props) {

    return (
      <div
        className="img"
        style={{ backgroundImage: `url(${props.imageUrl})` }}
      >
        <h1 className="header">{props.pageTitle}</h1>
        <h2 className="header2">{props.tagline1}</h2>
        <h2 className="header2">{props.tagline2}</h2>
        <picture className="logo">
        <source media="(min-width: 0px)" srcSet={props.logo} />
        <img src={props.logo} alt="vera logo" />
      </picture>
      </div>
    );
}

export default Banner;
