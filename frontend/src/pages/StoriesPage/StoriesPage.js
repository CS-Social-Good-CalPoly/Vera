import React, { useState, useEffect } from 'react'
import {
    StoryBanner,
    StoryTileGroup,
    DropDownSelectForm,
    DropDownForm,
} from '../../components/components.js'
import URL_PATH from '../../links.js'

function StoriesPage({ setActiveLink }) {
    const [stories, setStories] = useState([])
    const [idToName, setIdToName] = useState({})
    const [categoryNames, setCategoryNames] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')

    useEffect(() => {
        // URL_PATH imported from frontend/src/links.js
        // combined with subdirectory to make the full URL
        const subdirectory = '/stories/generalstorycat'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                let tempCategoryNames = []
                let tempIdToName = {}
                json.forEach((category) => {
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
                const allStories = json.map((story) => ({
                    ...story,
                    RelevantCategoryList: story.RelevantCategoryList.map(
                        (catId, index) => idToName[catId] || catId,
                    ),
                }))
                setStories(allStories)
            })
            .catch((error) => console.error(error))
    }, [idToName])

    useEffect(() => {
        setActiveLink('/Stories')
    }, [])

    const handleCategoryChange = (category) => {
        setSelectedCategory(category)
    }

    const filteredStories = selectedCategory
        ? stories.filter((story) =>
              story.RelevantCategoryList.includes(selectedCategory),
          )
        : stories

    /* function to get stories for a specific token - not in use yet */
    const getStoriesByToken = () => {
            const tokenValue = '' // make into state when we have an input for this
            const params = new URLSearchParams({
                token: tokenValue
            })

            // URL_PATH imported from frontend/src/links.js
            // combined with subdirectory to make the full URL
            const subdirectory = '/stories/stories-by-token'
            fetch(`${URL_PATH}${subdirectory}?${params}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    // Create a list of all stories
                    const allStories = json.map((story) => ({
                        ...story,
                        RelevantCategoryList: story.RelevantCategoryList.map(
                            (catId, index) => idToName[catId] || catId,
                        ),
                    }))
                    console.log(allStories)
                    // eventually, set state to this result
                })
                .catch((error) => console.error(error))
        }

    return (
        <div>
            <StoryBanner
                imageUrl="https://images.unsplash.com/photo-1506962240359-bd03fbba0e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2065&q=80"
                displayButton="true"
            />
            <DropDownSelectForm
                fieldTitle="All Categories"
                myoptions={[
                    { value: '', label: 'Show All' },
                    ...categoryNames.map((major) => ({
                        value: major,
                        label: major,
                    })),
                ]}
                handleChange={handleCategoryChange}
                customStyles={{
                    margin: '10px 5px 20px 5px',
                }}
            />
            <StoryTileGroup
                key="all-stories"
                id="all-stories"
                title="All Stories"
                stories={filteredStories}
            />
        </div>
    )
}

export default StoriesPage
