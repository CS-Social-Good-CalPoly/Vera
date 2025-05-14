import React, { useState, useEffect } from 'react'
import {
    StoryBanner,
    StoryTileGroup,
    DropDownSelectForm,
} from '../../components/components.js'
import { Search, Coins } from 'lucide-react'
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
    const [tokenInput, setTokenInput] = useState('')
    const [idToName, setIdToName] = useState({})
    const [categoryNames, setCategoryNames] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [searchFilteredStories, setSearchFilteredStories] = useState([])
    const [tokenStories, setTokenStories] = useState([])
    const [showTokenInput, setShowTokenInput] = useState(false)

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

    // changed logic to keep all results on page, but sort them based on the selected category
    // this way, we can see all results, but the ones that match the category are at the top
    // we can add logic here to change only if the length is above a certain threshold
    const minNumResults = 1
    const allStories =
        searchFilteredStories.length >= minNumResults
            ? searchFilteredStories
            : stories
    let filteredStories = [...allStories].sort((a, b) => {
        if (!selectedCategory) return 0 // No sorting needed

        const aHasCategory = a.RelevantCategoryList.includes(selectedCategory)
            ? 0
            : 1
        const bHasCategory = b.RelevantCategoryList.includes(selectedCategory)
            ? 0
            : 1

        return aHasCategory - bHasCategory // Category matches come first
    })

    // use fuse to search against the already filtered stories
    const fuse = new Fuse(filteredStories, fuseOptions)

    /* function to get stories for a specific token - not in use yet */
    const getStoriesByToken = () => {
        const tokenValue = tokenInput
        console.log(tokenValue)
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
            .then((response) => {
                // check if the response is ok (status code 200)
                if (!response.ok) {
                    throw new Error(response.message)
                }
                return response.json()
            })
            .then((json) => {
                // Create a list of all stories

                console.log(json)
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
                setTokenStories(allStories)
            })
            .catch((error) => console.error(error))
    }

    const filterStoriesBySearch = (e) => {
        const potentialStories = fuse.search(e.target.value)
        const searchFilteredStories = potentialStories.map(
            (story) => story.item,
        )
        const searchOrder = new Map(
            searchFilteredStories.map((story, index) => [story._id, index]),
        )

        const potStories = [...stories].sort((a, b) => {
            const aRank = searchOrder.get(String(a._id)) ?? Infinity
            const bRank = searchOrder.get(String(b._id)) ?? Infinity
            return aRank - bRank
        })

        setSearchFilteredStories(potStories)

        // Then sort tokenStories based on search relevance
        const potTokenStories = [...tokenStories].sort((a, b) => {
            const aRank = searchOrder.get(String(a._id)) ?? Infinity
            const bRank = searchOrder.get(String(b._id)) ?? Infinity
            return aRank - bRank
        })

        setTokenStories(potTokenStories)
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

                    <button
                        className="tooltip-btn submit-button"
                        onClick={() => setShowTokenInput(!showTokenInput)}
                    >
                        <Coins />
                    </button>
                    {showTokenInput && (
                        <>
                            <input
                                className="custom-input mx-2"
                                placeholder="token1234"
                                value={tokenInput}
                                onChange={(e) => setTokenInput(e.target.value)}
                            />
                            <button
                                className="submit-button"
                                type="submit"
                                onClick={() => {
                                    getStoriesByToken()
                                }}
                            >
                                Enter
                            </button>
                            {tokenInput && (
                                <button
                                    className="submit-button"
                                    onClick={() => {
                                        setTokenInput('')
                                        setTokenStories([])
                                    }}
                                >
                                    Clear
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {tokenStories.length > 0 && (
                <StoryTileGroup
                    key="your-stories"
                    id="your-stories"
                    title="Your Stories"
                    stories={tokenStories}
                    tokenStories={tokenStories.map((story) => story._id)}
                />
            )}
            <StoryTileGroup
                key="all-stories"
                id="all-stories"
                title="All Stories"
                stories={filteredStories}
                tokenStories={tokenStories.map((story) => story._id)}
            />
        </div>
    )
}

export default StoriesPage
