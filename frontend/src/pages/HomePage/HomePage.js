import { useState, useEffect } from 'react'
import './HomePage.css'
import '../../links.js'
import URL_PATH from '../../links.js'
import HomeIcon from '../../components/HomeIcon/HomeIcon.js'
import Fuse from 'fuse.js'

function HomePage({ setActiveLink }) {
    const [resources, setResources] = useState([]) // all the resources
    const [searchFilteredResources, setSearchFilteredResources] = useState([]) // search results
    const [selectedIndex, setSelectedIndex] = useState(0) // selected index for search results

    useEffect(() => {
        // URL_PATH imported from frontend/src/links.js
        // combined with subdirectory to make the full URL
        const subdirectory = '/resources/individualresources'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                // Create a list of all resources
                const allResources = json.map((resource) => ({
                    Id: resource._id,
                    Title: resource.Title,
                    Category: resource.Category,
                    Details: resource.ParagraphText,
                }))
                setResources(allResources)
            })
            .catch((error) => console.error(error))
    }, [])

    useEffect(() => {
        setActiveLink('/')
    }, [setActiveLink])

    const icon_data = [
        'Physical Health',
        'Mental Health',
        'Basic Needs',
        'Academic Health',
        'Sexual Health',
    ]

    const fuseOptions = {
        isCaseSensitive: false,
        includeScore: false,
        ignoreDiacritics: false,
        shouldSort: true,
        includeMatches: false,
        findAllMatches: false,
        minMatchCharLength: 2,
        location: 0,
        threshold: 0.6,
        distance: 100,
        useExtendedSearch: false,
        ignoreLocation: false,
        ignoreFieldNorm: false,
        fieldNormWeight: 1,
        keys: ['Title', 'Category', 'Details'],
    }

    // use fuse to search for resources
    const fuse = new Fuse(resources, fuseOptions)

    const filterResourcesBySearch = (e) => {
        const potentialResources = fuse.search(e.target.value, {
            limit: 5,
        })
        setSearchFilteredResources(potentialResources)
    }

    const handleRedirect = (resource) => {
        // Redirect to the resource page
        console.log(resource)
        window.location.href = `/Resources#`
    }

    return (
        <div className="home-page">
            <input
                className="home-search "
                placeholder="Search for resources..."
                onInput={(e) => {
                    filterResourcesBySearch(e)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleRedirect(searchFilteredResources[0])
                    }
                }}
            />
            {searchFilteredResources.length > 0 && (
                <div className="search-dropdown">
                    {searchFilteredResources.map((resource, index) => (
                        <div
                            key={resource.item.Id}
                            className={`search-dropdown-item ${index == selectedIndex ? 'selected' : ''}`}
                            onMouseEnter={setSelectedIndex.bind(null, index)}
                            onMouseLeave={setSelectedIndex.bind(null, 0)}
                            onClick={() => handleRedirect(resource.item)}
                        >
                            {resource.item.Title}
                        </div>
                    ))}
                </div>
            )}
            <div className="icon-row">
                {icon_data.map((item) => (
                    <HomeIcon key={item} title={item} />
                ))}
            </div>
            <br />
            Attributions:
            <a
                href="https://www.flaticon.com/free-icons/wellness"
                title="wellness icons"
            >
                Wellness icons created by Freepik - Flaticon
            </a>
            <a
                href="https://www.flaticon.com/free-icons/mental-health"
                title="mental health icons"
            >
                Mental health icons created by Freepik - Flaticon
            </a>
            <a
                href="https://www.flaticon.com/free-icons/basic-needs"
                title="basic needs icons"
            >
                Basic needs icons created by nawicon - Flaticon
            </a>
            <a
                href="https://www.flaticon.com/free-icons/academic"
                title="academic icons"
            >
                Academic icons created by kerismaker - Flaticon
            </a>
            <a
                href="https://www.flaticon.com/free-icons/relationship"
                title="relationship icons"
            >
                Relationship icons created by BomSymbols - Flaticon
            </a>
        </div>
    )
}

export default HomePage
