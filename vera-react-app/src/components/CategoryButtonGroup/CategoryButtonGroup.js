import React from 'react';
import { CategoryButton } from '../components';
import './CategoryButtonGroup.css';

/** This component received the following props:
 * title: Title
 * categories: Array of category Titles to be displayed on button
 */
function CategoryButtonGroup(props) {
  return (
    <div className="cat-button">
      <h1 className="cat-button-group-title">{props.title}</h1>
      <div className="cat-button-group">
        {props.categories &&
          props.categories.map((c, index) => (
            <CategoryButton key={index} title={c.Title} locationId={c.Name} />
          ))}
      </div>
    </div>
  );
}

export default CategoryButtonGroup;
