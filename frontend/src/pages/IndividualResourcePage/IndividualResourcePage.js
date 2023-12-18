import React, {useEffect, useState} from 'react';
import {Banner,
  IndividualResourceTileGroup,
  CategoryButtonGroup, TextBlock,
} from "../../components/components";
import { useLocation } from "react-router-dom";


function IndividualResourcePage() {

  const location = useLocation();
  const { individualIDs, title, description, imageUrl } = location.state || {};

  const individualIDsQueryParam = new URLSearchParams({ listOfResourceIDs: JSON.stringify(individualIDs) }).toString();

  const [resourceMapper, setResourceMapper] = useState({})
  const [resourceList, setResourceList] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3001/resources/individualResources?${individualIDsQueryParam}`)
      .then(response => response.json())
      .then(json => {

        let tempDict = {}
        let tempList = []
        
        json.forEach(resource => {
          
          tempDict[resource.Category] = resource
          tempList.push(resource)
          
        });

        setResourceMapper(tempDict)
        setResourceList(tempList)

        window.scrollTo(0, 0)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <div>
      <Banner imageUrl={imageUrl} />

      <CategoryButtonGroup
        title={title}
        names={Object.keys(resourceMapper)}
        locations={Object.keys(resourceMapper)}
      />

      <TextBlock text = {description}/>

      {
        Object.keys(resourceMapper).map( (categoryName) => {
          let result = resourceList.filter( resource => categoryName === resource.Category)
          return (
            <IndividualResourceTileGroup
              id={categoryName}
              title={categoryName}
              resources={result}
            />
          )
        })
      }
    </div>
  );
}

export default IndividualResourcePage;
