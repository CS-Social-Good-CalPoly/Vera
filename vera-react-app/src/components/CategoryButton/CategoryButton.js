import React from 'react'
import './CategoryButton.css'

function CategoryButton(props) {
    // no more props.location; modifying so that it scrolls to modified props.category
    const location = props.category.replace(/\s+/g, '').toLowerCase()

    function scrollToElement() {
        const element =  document.getElementById(location);
        element.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <button className="CategoryButton" onClick={scrollToElement}>
            <span className="button-text">{props.category}</span>
        </button>
    )

}

export default CategoryButton;
