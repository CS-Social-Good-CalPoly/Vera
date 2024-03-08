import React, { useState, useEffect } from 'react'
import './HomePage.css'
import bg from '../../components/Banner/bannerBackground.jpg'
import veraLogo from '../../components/Banner/draftLogo.png'
import {
    Banner,
    CategoryButtonGroup,
    ResourcePageTileGroup,
} from '../../components/components'
import '../../links'
import URL_PATH from '../../links'

function HomePage({ setActiveLink }) {
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
    useEffect(() => {
        // URL_PATH imported from frontend/src/links.js
        // combined with subdirectory to make the full URL
        const subdirectory = '/resources/subrsrcs'
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
                setSubresourceDict(tempDict)
            })
            .catch((error) => console.error(error))
    }, [])

    // Hook which executes fetch (GET) to the database and is only
    // run upon the very first render of the website.
    useEffect(() => {
        // URL_PATH imported from frontend/src/links.js
        // combined with subdirectory to make the full URL
        const subdirectory = '/resources/generalrsrcscat'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                let tempArray = []
                let tempNameToID = {}
                for (let object in json) {
                    let name = json[object]['Title']
                    tempArray.push(name)
                    tempNameToID[name] = json[object]['SubCategoryIDList']
                }
                setNameToID(tempNameToID)
                setCategorNames(tempArray)
            })
            .catch((error) => console.error(error))
    }, [])

    useEffect(() => {
        setActiveLink('/Resources')
    }, [])

    return (
        <div>
            <Banner
                imageUrl={bg}
                pageTitle="Resources"
                tagline1="Created by Calpoly students,"
                tagline2="for Calpoly students"
                logo={veraLogo}
            />
            <CategoryButtonGroup
                title="Categories"
                names={categorNames}
                locations={categorNames}
            />
            {categorNames.map((name, index) => {
                // Get an array of the subresource JSON objects
                let result = nameToID[name].map(
                    (id, index2) => subresourceDict[id],
                )

                // Added this check to prevent render if resource info is not ready yet from request
                if (result.length > 0 && result[0] !== undefined) {
                    return (
                        <ResourcePageTileGroup
                            key={name}
                            id={name}
                            title={name}
                            resources={result}
                        />
                    )
                } else {
                    return null
                }
            })}
        </div>
    )
}

export default HomePage
