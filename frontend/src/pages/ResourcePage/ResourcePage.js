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
import { Search } from 'lucide-react'
import DropDownSelectForm from '../../components/DropDownSelectForm/DropDownSelectForm.js'
import Fuse from 'fuse.js'

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
    keys: ['Title', 'Category', 'ParagraphText'],
}

function ResourcePage({ setActiveLink }) {
    const [categorNames, setCategorNames] = useState([])
    const [resourceSet, setResourceSet] = useState([])
    const [categoryToResources, setCategoryToResources] = useState({})
    const [selectedCategory, setSelectedCategory] = useState('')
    const [searchFilteredResources, setSearchFilteredResources] = useState([])
    const [resources, setResources] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, resourcesRes] = await Promise.all([
                    fetch(URL_PATH + '/resources/generalrsrcscat'),
                    fetch(URL_PATH + '/resources/individualResources'),
                ])
                const categoriesJson = await categoriesRes.json()
                const resourcesJson = await resourcesRes.json()

                const tempArray = []
                const tempRsrcs = []
                const catMap = {}

                // Add all category names
                for (const object of categoriesJson) {
                    const name = object['Title']
                    tempArray.push(name)
                    catMap[name] = []
                }

                // Map each resource into the correct category
                for (const resource of resourcesJson) {
                    const cat = resource['Category'].replaceAll('-', ' ')
                    if (!catMap.hasOwnProperty(cat)) {
                        // skip for now - these are the old entries
                        continue
                        catMap[cat] = []
                    }
                    catMap[cat].push(resource)
                    tempRsrcs.push(resource)
                }

                setCategorNames(tempArray)
                setCategoryToResources(catMap)
                setResources(tempRsrcs)
                setResourceSet(tempRsrcs)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        setActiveLink('/Resources')
    }, [])

    const handleCategoryChange = (category) => {
        setSelectedCategory(category) // global state update
        // Reset the fuse search to only use results from the selected category
        // We also have to recompute the filtered resources to reflect the new category
        const resSet =
            category === '' ? resources : categoryToResources[category]
        setResourceSet(resSet)
        fuse = new Fuse(resSet, fuseOptions)
        // // set the search term to empty string
        const potentialResources = fuse.search(searchTerm)
        const searchFilteredResources = potentialResources.map(
            (resource) => resource.item,
        )
        const minNumResults = 1
        let filteredResources =
            searchFilteredResources.length >= minNumResults
                ? searchFilteredResources
                : category
                  ? categoryToResources[category]
                  : resources
        setSearchFilteredResources(filteredResources)

        scrollIntoView(category)
    }

    const scrollIntoView = (category) => {
        console.log(category)

        const element = document.getElementById(category)

        if (element) {
            // Scroll to the element with a smooth behavior
            console.log('scrolling to', category)
            element.scrollIntoView({ behavior: 'smooth' })
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }
    }

    // use fuse to search against the already filtered stories
    let fuse = new Fuse(resourceSet, fuseOptions)

    const filterResourcesBySearch = (e) => {
        const potentialResources = fuse.search(e.target.value)
        const searchFilteredResources = potentialResources.map(
            (resource) => resource.item,
        )
        const minNumResults = 1
        // recompute the filtered resources based on the search input
        // if the search input is empty, we want to show all resources in the selected category
        let filteredResources =
            searchFilteredResources.length >= minNumResults
                ? searchFilteredResources
                : selectedCategory
                  ? categoryToResources[selectedCategory]
                  : resources

        console.log(filteredResources)
        setSearchFilteredResources(filteredResources)
    }

    return (
        <div>
            <Banner
                imageUrl={bg}
                pageTitle="Resources"
                tagline1="Created by Calpoly students,"
                tagline2="for Calpoly students"
                logo={veraLogo}
            />
            <div className="dropdown-container">
                <div className="dropdown-style justify-content-between">
                    <Search />
                    <input
                        className="custom-input mx-2 "
                        placeholder="Search for resources..."
                        value={searchTerm}
                        onInput={(e) => {
                            setSearchTerm(e.target.value)
                            filterResourcesBySearch(e)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const category =
                                    selectedCategory ||
                                    (searchFilteredResources &&
                                        searchFilteredResources[0]?.Category) ||
                                    ''
                                scrollIntoView(category)
                            }
                        }}
                    />
                    <DropDownSelectForm
                        fieldTitle="All Categories"
                        myoptions={[
                            { value: '', label: 'All Categories' },
                            ...categorNames.map((major) => ({
                                value: major,
                                label: major,
                            })),
                        ]}
                        handleChange={handleCategoryChange}
                        customStyles={{
                            margin: '2px 2px 2px 2px',
                            width: '250px',
                        }}
                        value={selectedCategory}
                    />
                    {selectedCategory && (
                        <button
                            className="clear-button"
                            onClick={() => handleCategoryChange('')}
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>
            {categorNames.map((name, index) => {
                // Get an array of the resources
                let results = categoryToResources[name]

                // If something is selected we can order the resources
                // by the selected category, otherwise we just show all resources
                if (selectedCategory == name) {
                    results = searchFilteredResources
                }

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
