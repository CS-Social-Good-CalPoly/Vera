import React from 'react';
import './CategoryDescription.css';

/* prop for paragraph text string */

function CategoryDescription(props) {
    return (
        <div className="category-description">
            <p className="category-p">{props.text}</p>
        </div>
    )
}

export default CategoryDescription;
