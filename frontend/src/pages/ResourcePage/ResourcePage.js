import React, { useState, useEffect } from 'react'
import './ResourcePage.css'
import bg from '../../components/Banner/bannerBackground.jpg'
import veraLogo from '../../components/Banner/draftLogo.png'
import {
    Banner,
    CategoryButtonGroup,
    ResourcePageTileGroup,
} from '../../components/components.js'
import '../../links.js'
import URL_PATH from '../../links.js'

function ResourcePage({ setActiveLink }) {
    // Hook to keep track of the categories to be loaded from the database.
    const [categorNames, setCategorNames] = useState([])

    // Hook to track categoryToResource.
    // categoryToResource is a dictionary mapping the category names to
    // the corresponding array of resource objects
    const [categoryToResources, setCategoryToResources] = useState({})

    // Hook which executes fetch (GET) to the database and is only
    // run upon the very first render of the website.
    useEffect(() => {
        // URL_PATH imported from frontend/src/links.js
        // combined with subdirectory to make the full URL
        const subdirectory = '/resources/generalrsrcscat'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                const tempArray = []
                for (const object in json) {
                    const name = json[object]['Title']
                    tempArray.push(name)

                    // Add this category to the category map
                    setCategoryToResources((prevDict) => ({
                        ...prevDict,
                        [name]: prevDict[name] || [],
                    }))
                }
                setCategorNames(tempArray)
            })
            .catch((error) => console.error(error))
    }, [])

    // Hook to get ALL resources and update a category-to-resource map.
    // Only runs upon first render of the website
    useEffect(() => {
        const subdirectory = '/resources/individualResources'
        // fetch(URL_PATH + subdirectory)
        fetch('http://localhost:3001' + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                for (const resource in json) {
                    // Get corresponding categories
                    const resourceCategory = json[resource]['Category']

                    // Udpate map, append this resource
                    setCategoryToResources((prevDict) => ({
                        ...prevDict,
                        [resourceCategory]: [
                            ...(prevDict[resourceCategory] || []),
                            json[resource],
                        ],
                    }))
                }
            })
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
                // Get an array of the resources
                const results = categoryToResources[name]

                // Check to prevent render if resource info is not ready yet from request
                if (
                    results !== undefined &&
                    results.length > 0 &&
                    results[0] !== undefined
                ) {
                    return (
                        <ResourcePageTileGroup
                            key={name}
                            id={name}
                            title={name}
                            resources={results}
                        />
                    )
                } else {
                    return null
                }
            })}
        </div>
    )
}

export default ResourcePage
