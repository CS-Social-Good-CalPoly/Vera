import React from 'react';
import './Banner.css';

function Banner(props) {

    return (
      <div
        className="img"
        style={{ backgroundImage: `url(${props.imageUrl})`,
                 backgroundSize: "cover",
                 backgroundRepeat: "no-repeat"}}
      >
        <h1 className="header0">{"."}</h1>
        <h1 className="header">{props.pageTitle}</h1>
        <h2 className="header2">{props.tagline1}</h2>
        <h2 className="header3">{props.tagline2}</h2>
        <picture className="logo">
        <img className="logo2" src={props.logo} alt="vera logo" />
      </picture>
      </div>
    );
}

export default Banner;
