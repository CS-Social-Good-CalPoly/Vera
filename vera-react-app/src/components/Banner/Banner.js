import React from 'react';
import './Banner.css';

function Banner(props) {

    return (
        <div>
            <img src={props.imageUrl} className="banner-img" alt=""/>
        </div>
    );
}

export default Banner;
