import React, { useState, useEffect, use } from 'react'
import './ResourcePage.css'
import {
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
    const [categorNames, setCategorNames] = useState([]) // list of category names
    const [resourceSet, setResourceSet] = useState([]) // resourceSet to choose for filterning
    const [categoryToResources, setCategoryToResources] = useState({}) // map a category_name to resources
    const [selectedCategory, setSelectedCategory] = useState('') // the selected category from dropdown
    const [searchFilteredResources, setSearchFilteredResources] = useState([]) // the filtered resources from fuse
    const [resources, setResources] = useState([]) // all the resources for db
    const [searchTerm, setSearchTerm] = useState('') // search term for the input
    const [anchor, setAnchor] = useState('') // the anchor for the URL

    const nameToId = (name) => {
        // replace spaces with dashes and remove apostrophes
        return name.replace(/\s+/g, '-').replace(/'/g, '')
    }

    // function to scroll to the element with the given id
    const scrollIntoView = (category, offset = 100) => {
        const element = document.getElementById(category)
        if (element) {
            const y =
                element.getBoundingClientRect().top + window.scrollY - offset
            // Scroll to the element with a smooth behavior and offset
            window.scrollTo({ top: y, behavior: 'smooth' })
            // No offset for the code below
            // element.scrollIntoView({ behavior: 'smooth' })
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }
    }

    // handle the category change when the user selects a new category from the dropdown
    const handleCategoryChange = (category) => {
        setSelectedCategory(category) // global state update
        // Reset the fuse search to only use results from the selected category
        // We also have to recompute the filtered resources to reflect the new category
        const resSet =
            category === '' ? resources : categoryToResources[category]
        // check if we have a valid resource set
        if (resSet === undefined) {
            return
        }
        setResourceSet(resSet)
        fuse = new Fuse(resSet, fuseOptions)
        // set the search term to empty string
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
        setAnchor(category)
        scrollIntoView(category)
    }

    // use this to click on the tile resource based on id
    const expandResource = (rsrc) => {
        const element = document.getElementById(rsrc)
        if (element) {
            element.click()
        }
    }

    // useEffect to fetch the data from the server and set the state
    // this is only called once when the component mounts
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
                    catMap[nameToId(name)] = []
                }

                // Map each resource into the correct category
                for (const resource of resourcesJson) {
                    const id = nameToId(resource['Category'])
                    if (!catMap.hasOwnProperty(id)) {
                        // skip for now - these are the old entries
                        continue
                    }
                    catMap[id].push(resource)
                    tempRsrcs.push(resource)
                }

                setCategorNames(tempArray)
                setCategoryToResources(catMap)
                setResources(tempRsrcs)
                setResourceSet(tempRsrcs)

                // check the query parameter for the selected category
                const anchor = window.location.hash // e.g. "#Counseling-and-Psychological-Services"
                const cleanAnchor = anchor.replace('#', '') // "Counseling and Psychological Services"
                if (cleanAnchor) {
                    setAnchor(cleanAnchor)
                    const category = catMap[cleanAnchor]
                    if (category) {
                        // browser api to wait till browser is ready to scroll
                        requestAnimationFrame(() => {
                            handleCategoryChange(cleanAnchor)
                        })
                    } else {
                        requestAnimationFrame(() => {
                            expandResource(cleanAnchor)
                            scrollIntoView(cleanAnchor)
                        })
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        setActiveLink('/Resources')
    }, [])

    // for changing the URL
    // we are replacing the URL state so no history is created
    useEffect(() => {
        // Check if the anchor is not empty and scroll to it
        if (anchor) {
            const element = document.getElementById(anchor)
            if (element) {
                scrollIntoView(anchor)
            }
            window.history.replaceState({}, '', `#${anchor}`) // ✅ replaces current URL (no push)
        }
    }, [anchor, setAnchor])

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

        setSearchFilteredResources(filteredResources)
    }

    return (
        <div className="resource-page">
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
                                        nameToId(
                                            searchFilteredResources[0]
                                                ?.Category,
                                        )) ||
                                    ''
                                scrollIntoView(category)
                            }
                        }}
                    />
                    <DropDownSelectForm
                        fieldTitle="All Categories"
                        myoptions={[
                            { value: '', label: 'All Categories' },
                            ...categorNames.map((cat) => ({
                                value: nameToId(cat),
                                label: cat,
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
            {categorNames.map((name, _) => {
                // Get an array of the resources
                const id = nameToId(name)
                let results = categoryToResources[id]

                // If something is selected we can order the resources
                // by the selected category, otherwise we just show all resources
                if (selectedCategory === id && searchFilteredResources) {
                    const filteredSet = new Set(searchFilteredResources)
                    const matching = results.filter((item) =>
                        filteredSet.has(item),
                    )
                    const nonMatching = results.filter(
                        (item) => !filteredSet.has(item),
                    )
                    results = [...matching, ...nonMatching]
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
                            // id is title with no spaces
                            id={id}
                            title={name}
                            resources={results}
                            handleChange={(expanded, id) => {
                                if (expanded) {
                                    setAnchor(undefined)
                                } else {
                                    setAnchor(id)
                                }
                            }}
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
