import React from 'react';
import {CategoryButton} from '../components'
import { useHistory } from 'react-router-dom';
import './CategoryButtonGroup.css';

/** This component received the following props:
 * title: Title
 * locations: Array of [location id's] (for CategoryButtons)
 * names: Array of [category names] (for CategoryButtons)
 */
function CategoryButtonGroup(props){
    return (
        <div className="cat-button">
            <h1 className="cat-button-group-title">{props.title}</h1>
            <div className="cat-button-group">
                {
                    props.names.map((name, index) => 
                    <CategoryButton location={props.locations[index]} category={props.names[index]}/>
                    )
                }
            </div>
        </div>
    )
}

export default CategoryButtonGroup;
