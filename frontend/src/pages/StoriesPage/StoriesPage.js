import React, { useState, useEffect } from 'react'
import {
    StoryBanner,
    CategoryButtonGroup,
    StoryTileGroup,
    DropDownForm
} from '../../components/components'
import URL_PATH from '../../links'

function StoriesPage({ setActiveLink }) {
    const [stories, setStories] = useState([])
    const [nameToID, setNameToID] = useState({})
    const [categorNames, setCategorNames] = useState([])
    const allStories = Object.values(nameToID).flat().map(id => stories[id]);

    useEffect(() => {
        // URL_PATH imported from frontend/src/links.js
        // combined with subdirectory to make the full URL
        const subdirectory = '/stories/generalstorycat'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                let tempArray = []
                let tempNameToID = {}
                for (let object in json) {
                    let name = json[object]['Title']
                    tempArray.push(name)
                    tempNameToID[name] = json[object]['StoryIDList']
                }
                setNameToID(tempNameToID)
                setCategorNames(tempArray)
            })
            .catch((error) => console.error(error))
    }, [])

    useEffect(() => {
        // URL_PATH imported from frontend/src/links.js
        // combined with subdirectory to make the full URL
        const subdirectory = '/stories/individualstory'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                // Create a dictionary using subresource id as the key
                // mapping to the full subresource object.
                let tempDict = {}
                tempDict = json.reduce((acc, obj) => {
                    acc[obj._id] = obj
                    return acc
                }, {})
                setStories(tempDict)
            })
            .catch((error) => console.error(error))
    }, [])

    useEffect(() => {
        setActiveLink('/Stories')
    }, [])


    return (
        <div>
            <StoryBanner
                imageUrl="https://images.unsplash.com/photo-1506962240359-bd03fbba0e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2065&q=80"
                displayButton="true"
            />
            <CategoryButtonGroup
                title="Categories"
                names={categorNames}
                locations={categorNames}
            />
            <DropDownForm
                fieldTitle="Categories"
                myoptions={categorNames}
                // handleChange={handleYearChange}
            />

            <StoryTileGroup
                key="all-stories"
                id="all-stories"
                title="All Stories"
                stories={allStories}
            />

            {/* {categorNames.map((name, index) => {
                let result = nameToID[name].map((id, index2) => stories[id])
                return (
                    <StoryTileGroup
                        key={name}
                        id={name}
                        title={name}
                        stories={result}
                    />
                )
            })} */}
        </div>
    )
}

export default StoriesPage
