import React from 'react';
import './Banner.css';

function Banner(props) {

    return (
      <div>
          <h2 style={{ fontFamily: 'fat', color: '#08376B' }}>{props.pageTitle}</h2>
          <p>{props.paragraph}</p>
      </div>
    );
}

export default Banner;
