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
    const [idToName, setIdToName] = useState({})
    const [categoryNames, setCategoryNames] = useState([])

    useEffect(() => {
        // URL_PATH imported from frontend/src/links.js
        // combined with subdirectory to make the full URL
        const subdirectory = '/stories/generalstorycat'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                let tempCategoryNames = []
                let tempIdToName = {}
                json.forEach(category => {
                    tempIdToName[category['_id']] = category['Title']
                    tempCategoryNames.push(category['Title'])
                })
                setIdToName(tempIdToName)
                setCategoryNames(tempCategoryNames)
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
                // Create a list of all stories
                const allStories = json.map(story => ({
                    ...story,
                    RelevantCategoryList: story.RelevantCategoryList.map(catId => idToName[catId] || catId)
                }))              
                console.log("all stories", allStories)
                setStories(allStories);
            })
            .catch((error) => console.error(error))
    }, [idToName])

    useEffect(() => {
        setActiveLink('/Stories')
    }, [])
    


    return (
        <div>
            <StoryBanner
                imageUrl="https://images.unsplash.com/photo-1506962240359-bd03fbba0e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2065&q=80"
                displayButton="true"
            />
            <DropDownForm
                fieldTitle="Categories"
                myoptions={categoryNames}
                // handleChange={handleYearChange}
            />
            <StoryTileGroup
                key="all-stories"
                id="all-stories"
                title="All Stories"
                stories={stories}
            />
        </div>
    )
}

export default StoriesPage
