import React, { useState, useEffect } from 'react'
import {
    StoryBanner,
    CategoryButtonGroup,
    StoryTileGroup,
} from '../../components/components'
import { Link } from 'react-router-dom'
import URL_PATH from '../../links'
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser,
    Protect,
} from '@clerk/clerk-react'

function AdminPages({ setActiveLink }) {
    const [stories, setStories] = useState([])
    // const [nameToID, setNameToID] = useState({})
    // const [categorNames, setCategorNames] = useState([])
    const [selectedDiscipline, setSelectedDiscipline] = useState(null)

    useEffect(() => {
        const subdirectory = '/stories/individualstory'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                let tempArray = json.map((story) => ({
                    _id: story._id,
                    Title: story.Title,
                    StudentMajor: story.StudentMajor,
                    ParagraphText: story.ParagraphText,
                }))
                setStories(tempArray)
            })
            .catch((error) => console.error(error))
    }, [])

    useEffect(() => {
        setActiveLink('/AdminPages')
    }, [])

    const handleFilter = (discipline) => {
        setSelectedDiscipline(discipline)
    }

    //Limiting /adminpages to users manually put into organizaitons
    // const { user } = useUser()
    // const hasAdminAccess = user?.organizationMemberships.length >= 1
    // console.log('membershispsS')
    // console.log(user.organizationMemberships)

    // if (!hasAdminAccess) {
    //     return (
    //         <div>
    //             Access Denied. You do not have permission to view this page.
    //         </div>
    //     )
    // }

    return (
        <div>
            <header>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </header>
            <div></div>
            <div>
                {/* Buttons for filtering */}
                <button onClick={() => handleFilter('SE')}>SE</button>
                <button onClick={() => handleFilter('Computer Science')}>
                    CSC
                </button>
                <button onClick={() => handleFilter(null)}>Show All</button>
            </div>

            <div>
                {stories
                    .filter(
                        (story) =>
                            !selectedDiscipline ||
                            story.StudentMajor === selectedDiscipline,
                    )
                    .map((story, index) => (
                        <div key={index}>
                            <h2>{story.Title}</h2>
                            <p>Student Major: {story.StudentMajor}</p>
                            <p>{story.ParagraphText}</p>
                            <Link
                                to={{
                                    pathname: `/individualStory/${story._id}`,
                                }}
                            >
                                <button>View Story</button>
                            </Link>
                            <br /> {/* Line break */}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default AdminPages
