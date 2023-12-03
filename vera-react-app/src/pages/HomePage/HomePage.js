import React, { useState, useEffect } from 'react';
import './HomePage.css';
import bg from '../../components/Banner/bannerBackground.jpg';
import veraLogo from '../../components/Banner/draftLogo.png';
import { NavBar, Toplogo, Banner, Stat, CategoryButtonGroup, Filters, ResourcePageTileGroup } from '../../components/components';

function HomePage() {

    // Filters
    const filters = ["General Stress", "School Stress", "Chronic Stress", "Career Planning", "Suicide Prevention", "Crisis Lines", "LBTQ+ Resources", "Financial Support", "Food Insecurity", "Housing Concerns", "School Costs"];

    // Hook to keep track of the categories to be loaded from the database.
    const [categorNames, setCategorNames] = useState([])

    // Hook to keep track of subresourceDict.
    // subresourceDict makes a dictionary mapping the IDs of
    // the subrsrcs objects to the full subrsrcs objects.
    const [subresourceDict, setSubresourceDict] = useState({})

    // Hook to track nameToID.
    // nameToID is a dictionary mapping the category names to
    // the corresponding array of subresource IDs
    const [nameToID, setNameToID] = useState({})

    // This hook will execute before the other one.
    // It fetches the subrsrcs data and stores it into subresourceDict for later use.
    useEffect( () => {
        fetch('http://localhost:3001/resources/subrsrcs')
        .then(response => response.json())
        .then(json => {
            // Create a dictionary using subresource id as the key
            // mapping to the full subresource object.
            let tempDict = {}
            tempDict = json.reduce((acc, obj) => {
                acc[obj._id] = obj;
                return acc;
            }, {});
            setSubresourceDict(tempDict)
        })
      }, [])

    // Hook which executes fetch (GET) to the database and is only
    // run upon the very first render of the website.
    useEffect(() => {
        fetch('http://localhost:3001/resources/generalrsrcscat')
          .then(response => response.json())
          .then(json => {
            let tempArray = []
            let tempNameToID = {}
            for (let object in json)
            {
                let name = json[object]["Title"]
                tempArray.push(name)
                tempNameToID[name] = json[object]["SubCategoryIDList"]
            }
            setNameToID(tempNameToID)
            setCategorNames(tempArray)
          })
          .catch(error => console.error(error))
      }, [])

    return (
        <div className="everything row">
            <div className="col-lg-12 col-12 main">
                <div id="home" className="home">
                    <Toplogo />
                    <div className="row main-content">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-8 blurb">
                                    <Banner pageTitle = "Resources" paragraph="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip"/>
                                </div>
                                <div className="col-4 number d-flex justify-content-center align-items-center">
                                    <Stat number = "124" type = "Mental Health Resources" />
                                </div>
                                <div className="col-12 newsletter filters">
                                    <Filters filterNames={filters} />
                                </div>
                            </div>
                        </div>
                        <div className="col-6" style={{ padding: 0, margin: 0 }}>
                            <NavBar />
                            <div className="row team articles">
                            {
                                categorNames.map( (name, index) => {
                                    let result = nameToID[name].map( (id, index2) => subresourceDict[id])
                                    return <ResourcePageTileGroup key={name} id={name} title={name} resources={result} />
                                })
                                
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
