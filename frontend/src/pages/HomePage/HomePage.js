import { useState, useEffect } from 'react'
import './HomePage.css'
import '../../links.js'
import URL_PATH from '../../links.js'
import HomeIcon from '../../components/HomeIcon/HomeIcon.js'
import Fuse from 'fuse.js'
import { Search, BookText, Hammer } from 'lucide-react'
import Typewriter from '../../components/TypeWriter/TypeWriter.js'

function HomePage({ setActiveLink }) {
    const [references, setReferences] = useState([]) // all the references (resources and stories)
    const [searchFilteredReferences, setSearchFilteredReferences] = useState([]) // search results
    const [searchTerm, setSearchTerm] = useState('') // search term
    const [selectedIndex, setSelectedIndex] = useState(0) // selected index for search results
    const [randomPhrase, setRandomPhrase] = useState('') // random phrase for the header

    useEffect(() => {
        const fetchResourcesAndStories = async () => {
            try {
                // Fetch resources
                const resResources = await fetch(
                    URL_PATH + '/resources/individualresources',
                )
                const jsonResources = await resResources.json()
                const allResources = jsonResources.map((resource) => ({
                    Id: resource._id,
                    Title: resource.Title,
                    Category: resource.Category,
                    Details: resource.ParagraphText,
                    Type: 'Resource',
                }))

                // Fetch stories
                const resStories = await fetch(
                    URL_PATH + '/stories/individualstory',
                )
                const jsonStories = await resStories.json()
                const allStories = jsonStories.map((story) => ({
                    Id: story._id,
                    Title: story.Title,
                    Category: story.GeneralCategory,
                    Details: story.ParagraphText,
                    Type: 'Story',
                }))

                // Combine both and update state
                setReferences([...allResources, ...allStories])

                // Set a random phrase for the header
                const randomIndex = Math.floor(
                    Math.random() * helpPhrases.length,
                )
                setRandomPhrase(helpPhrases[randomIndex])
            } catch (error) {
                console.error(error)
            }
        }

        fetchResourcesAndStories()
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

    const helpPhrases = [
        'What can I do for you?',
        'Need a hand with anything?',
        'Anything I can help out with?',
        'How can I support you?',
        'What’s up? How can I help?',
        'Is there anything you need right now?',
        'I’m here if you need anything.',
        'How can I best support you today?',
        'What would be most helpful to you right now?',
        'How may I assist you?',
        'Is there something I can help you with?',
        'Please let me know how I can be of assistance.',
        'What do you need help with today?',
        "I'm available to support — what do you need?",
        "What's on your mind?",
        'How can I help you today?',
    ]

    const fuseOptions = {
        isCaseSensitive: false,
        includeScore: false,
        ignoreDiacritics: false,
        shouldSort: true,
        includeMatches: true,
        findAllMatches: false,
        minMatchCharLength: 1,
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
    const fuse = new Fuse(references, fuseOptions)

    const filterRefsBySearch = (e) => {
        const potRefs = fuse.search(e.target.value, {
            limit: 5,
        })
        console.log('potRefs', potRefs)
        // sort by resources first, then stories
        potRefs.sort((a, b) => {
            if (a.item.Type === 'Resource' && b.item.Type === 'Story') {
                return -1
            } else if (a.item.Type === 'Story' && b.item.Type === 'Resource') {
                return 1
            } else {
                return 0
            }
        })

        const refsWithContext = potRefs.map(({ item, matches }) => {
            const match = matches[0]
            if (!match) {
                return {
                    item: item,
                    snippet: '',
                }
            }

            const indices = match.indices.flat()
            const start = Math.max(indices[0] - 20, 0)
            const end = Math.min(indices[1] + 20, item[match.key].length)
            const snippet = item[match.key].slice(start, end)

            return {
                item: item,
                snippet: ` - ${snippet}...`,
            }
        })

        console.log(refsWithContext)
        // set the search term to the input value
        setSearchFilteredReferences(refsWithContext)
    }

    const handleRedirect = (reference) => {
        // Redirect to the resource page
        console.log(reference)
        if (reference) {
            console.log(reference.Id)
            console.log(reference.Type)
            if (reference.Type === 'Resource') {
                window.location.href = `/Resources/#`
            } else if (reference.Type === 'Story') {
                console.log(reference.Id)
                window.location.href = `/individualStory/${reference.Id}`
            }
        }
    }

    return (
        <div className="home-page">
            <div className="header-container">
                <Typewriter text={randomPhrase} speed={70} font_size={'1em'} />
            </div>
            <div className="home-search">
                <Search />
                <input
                    className="home-search-input"
                    placeholder="Search for resources and stories..."
                    value={searchTerm}
                    onInput={(e) => {
                        setSearchTerm(e.target.value)
                        filterRefsBySearch(e)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleRedirect(searchFilteredReferences[0]?.item)
                        }
                    }}
                />
                {searchFilteredReferences.length > 0 && (
                    <div className="search-dropdown">
                        {searchFilteredReferences.map((ref, index) => (
                            <div
                                className={`search-dropdown-item ${index === selectedIndex ? 'selected' : ''}`}
                                key={ref.item.Id}
                                onMouseEnter={setSelectedIndex.bind(
                                    null,
                                    index,
                                )}
                                onMouseLeave={setSelectedIndex.bind(null, 0)}
                                onClick={() => handleRedirect(ref.item)}
                            >
                                {ref.item.Type === 'Resource' ? (
                                    <Hammer />
                                ) : (
                                    <BookText />
                                )}
                                <div className="ml-2 maintext">
                                    {ref.item.Title}
                                </div>

                                <div className="subtext">{ref.snippet}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="icon-row">
                {icon_data.map((item) => (
                    <HomeIcon key={item} title={item} />
                ))}
            </div>
        </div>
    )
}

export default HomePage
