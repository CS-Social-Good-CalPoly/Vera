import React from 'react';
import {CategoryButton} from '../components'
import { useHistory } from 'react-router-dom';

/** This component received the following props:
 * title: Title
 * locations: Array of [location id's] (for CategoryButtons)
 * names: Array of [category names] (for CategoryButtons)
 */
function CategoryButtonGroup(props){
    return (
        <div>
            <h1>{props.title}</h1>
            {
                props.names.map((name, index) => 
                <CategoryButton location={props.locations[index]} category={props.names[index]}/>
                )
            }
        </div>
    )
}

export default CategoryButtonGroup;
