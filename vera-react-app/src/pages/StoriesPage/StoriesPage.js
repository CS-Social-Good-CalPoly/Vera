import React , { useState, useEffect } from 'react';
import '../HomePage/HomePage.css';
import bg from '../../components/Banner/bannerBackground.jpg';
import veraLogo from '../../components/Banner/draftLogo.png';
import { NavBar, Toplogo, Banner, Stat, CategoryButtonGroup, Filters, ResourcePageTileGroup, StoryTileGroup } from '../../components/components';


function StoriesPage() {
    const filters = ["General Stress", "School Stress", "Chronic Stress", "Career Planning", "Suicide Prevention", "Crisis Lines", "LBTQ+", "Financial Support", "Food Insecurity", "Housing Concerns", "School Costs"];

    const [stories, setStories] = useState([]);
    const [nameToID, setNameToID] = useState({})
    const [categorNames, setCategorNames] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/stories/generalstorycat')
        .then(response => response.json())
        .then(json => {
          let tempArray = []
          let tempNameToID = {}
          for (let object in json)
          {
              let name = json[object]["Title"]
              tempArray.push(name)
              tempNameToID[name] = json[object]["StoryIDList"]
          }
          setNameToID(tempNameToID)
          setCategorNames(tempArray)
        })
        .catch(error => console.error(error))
    }, [])

    
    useEffect(() => {
        fetch('http://localhost:3001/stories/individualstory')
        .then(response => response.json())
        .then(json => {
            // Create a dictionary using subresource id as the key
            // mapping to the full subresource object.
            let tempDict = {}
            tempDict = json.reduce((acc, obj) => {
                acc[obj._id] = obj;
                return acc;
            }, {});
            setStories(tempDict)
    })
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
                                    <Banner pageTitle = "Stories" paragraph="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip"/>
                                </div>
                                <div className="col-4 number d-flex justify-content-center align-items-center">
                                    <Stat number = "82" type = "Student-Written Stories" />
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
                                    let result = nameToID[name].map( (id, index2) => stories[id])
                                    return <StoryTileGroup key={name} id={name} title={name} stories={result} />
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

export default StoriesPage;
