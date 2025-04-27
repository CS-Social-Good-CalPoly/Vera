import React, { useState, useEffect } from 'react'
import {
    StoryBanner,
    StoryTileGroup,
    DropDownSelectForm,
} from '../../components/components.js'
import { Search } from 'lucide-react'
import Fuse from 'fuse.js'
import URL_PATH from '../../links.js'
import './StoriesPage.css'

const fuseOptions = {
    isCaseSensitive: false,
    includeScore: false,
    ignoreDiacritics: false,
    shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 1,
    location: 0,
    threshold: 0.6,
    distance: 100,
    useExtendedSearch: false,
    ignoreLocation: false,
    ignoreFieldNorm: false,
    fieldNormWeight: 1,
    keys: ['Title', 'GeneralCategory', 'StudentMajor', 'ParagraphText'],
}

function StoriesPage({ setActiveLink }) {
    const [stories, setStories] = useState([])
    const [idToName, setIdToName] = useState({})
    const [categoryNames, setCategoryNames] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [searchFilteredStories, setSearchFilteredStories] = useState([])

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
                    RelevantCategoryList: story.RelevantCategoryList
                        ? story.RelevantCategoryList.map(
                              (catId, index) => idToName[catId] || catId,
                          )
                        : [],
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

    // filter based on selected and search filtered stories
    // we can add logic here to change only if the length is above a certain threshold
    const minNumResults = 1
    let filteredStories =
        searchFilteredStories.length >= minNumResults
            ? searchFilteredStories
            : selectedCategory
              ? stories.filter((story) =>
                    story.RelevantCategoryList.includes(selectedCategory),
                )
              : stories

    // use fuse to search against the already filtered stories
    const fuse = new Fuse(filteredStories, fuseOptions)

    /* function to get stories for a specific token - not in use yet */
    let getStoriesByToken = () => {
        const tokenValue = '' // make into state when we have an input for this
        const params = new URLSearchParams({
            token: tokenValue,
        })

        // URL_PATH imported from frontend/src/links.js
        // combined with subdirectory to make the full URL
        const subdirectory = '/stories/stories-by-token'
        fetch(`${URL_PATH}${subdirectory}?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                // Create a list of all stories
                const allStories = json.map((story) => ({
                    ...story,
                    RelevantCategoryList: story.RelevantCategoryList
                        ? story.RelevantCategoryList.map(
                              (catId, index) => idToName[catId] || catId,
                          )
                        : [],
                }))
                console.log(allStories)
                // eventually, set state to this result
            })
            .catch((error) => console.error(error))
    }

    const filterStoriesBySearch = (e) => {
        const potentialStories = fuse.search(e.target.value)
        const searchFilteredStories = potentialStories.map(
            (story) => story.item,
        )
        setSearchFilteredStories(searchFilteredStories)
    }

    return (
        <div>
            <StoryBanner
                imageUrl="https://images.unsplash.com/photo-1506962240359-bd03fbba0e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2065&q=80"
                displayButton="true"
            />
            <div className="dropdown-container">
                <div className="dropdown-style justify-content-between">
                    <Search />
                    <input
                        className="custom-input mx-2"
                        placeholder="Search for stories..."
                        onInput={(e) => {
                            filterStoriesBySearch(e)
                        }}
                    />
                    <DropDownSelectForm
                        fieldTitle="All Categories"
                        myoptions={[
                            { value: '', label: 'All Categories' },
                            ...categoryNames.map((major) => ({
                                value: major,
                                label: major,
                            })),
                        ]}
                        handleChange={handleCategoryChange}
                        customStyles={{
                            margin: '2px 2px 2px 2px',
                            width: '250px',
                        }}
                    />
                </div>
            </div>

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
