import React, { useState, useEffect } from 'react';
import './HomePage.css';
import bg from '../../components/Banner/bannerBackground.jpg';
import veraLogo from '../../components/Banner/draftLogo.png';
import { Banner, CategoryButtonGroup, ResourcePageTileGroup} from '../../components/components'
import mockFinSupportData from './mockFinSupportData.json';
import mockPreventionData from './mockPreventionData.json';
import mockStressData from './mockStressData.json';

function HomePage() {
    const resourceFinSupport = mockFinSupportData;
    const resourceSuicidePrevention = mockPreventionData;
    const resourceStress = mockStressData;

    // Hook to keep track of the categories to be loaded from the database.
    const [categorNames, setCategorNames] = useState([])

    // Hook which executes fetch (GET) to the database and is only
    // run upon the very first render of the website.
    useEffect(() => {
        fetch('http://localhost:3001/resources/generalrsrcscat')
          .then(response => response.json())
          .then(json => {
            let tempArray = []
            for (let object in json)
            {
                tempArray.push(json[object]["Title"])
            }
            setCategorNames(tempArray)
          })
          .catch(error => console.error(error))
      }, [])

    // The ResourcePageTileGroup is to be empty for this specific task.
    return (
        <div>
            <Banner imageUrl= {bg} pageTitle = "Resources" tagline1="Created by Calpoly students," tagline2="for Calpoly students" logo={veraLogo}/>
            <CategoryButtonGroup title='Categories' names={categorNames} locations={categorNames}/>
            {
                categorNames.map( (value, index) => {
                    return <ResourcePageTileGroup key={value} id={value} title={value} resources={[]} />
                })
            }
        </div>
    );
}

export default HomePage;
