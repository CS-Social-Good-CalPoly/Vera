import React from 'react'
import './CategoryButton.css'

function CategoryButton(props) {

    function scrollToElement() {
        const element =  document.getElementById(props.location);
        element.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <button className="CategoryButton" onClick={scrollToElement}>
            <span className="button-text">{props.category}</span>
        </button>
    )

}

export default CategoryButton;
