import React, { useState, useEffect } from 'react'
import {
    StoryBanner,
    CategoryButtonGroup,
    StoryTileGroup,
} from '../../components/components'
import { Link } from 'react-router-dom'
import URL_PATH from '../../links'
import './AdminPages.css'

function AdminPages({ setActiveLink }) {
    const [stories, setStories] = useState([])
    // const [nameToID, setNameToID] = useState({})
    // const [categorNames, setCategorNames] = useState([])
    const [selectedDiscipline, setSelectedDiscipline] = useState(null)
    const [approved, setApproved] = useState(false)

    useEffect(() => {
        const subdirectory = '/stories/individualstory'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                // console.log(json)
                let tempArray = json.map((story) => ({
                    _id: story._id,
                    Title: story.Title,
                    StudentMajor: story.StudentMajor,
                    ParagraphText: story.ParagraphText,
                    Approved: story.Approved,
                }))
                setStories(tempArray)
            })
            .catch((error) => console.error(error))
    }, [])

    // useEffect(() => {
    //     setActiveLink('/AdminPages')
    // }, [])

    const handleFilter = (discipline) => {
        setSelectedDiscipline(discipline)
    }

    async function toggleApproval(id, approved, setApproved) {
        console.log(id)
        console.log(URL_PATH)
        try {
            const response = await fetch(URL_PATH + '/updateIndividualStory', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    individualStoryId: id,
                    Approved: !approved,
                }),
            })
            if (!response.ok) {
                throw new Error('Failed to update story')
            }
            const updatedStory = await response.json()
            console.log('Updated Story Successfully')
            setApproved(!approved)
            return updatedStory
        } catch (error) {
            console.error('Error toggling approval:', error)
        }
    }

    const changeApproval = (id) => {
        toggleApproval(id, approved, setApproved).catch((error) => {
            console.log("Didn't change approval")
        })
    }

    return (
        <div>
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
                            <div>
                                <h2 className="title">{story.Title}</h2>
                                <div className="approved-container">
                                    <h6 className="approved-label">
                                        Approved:
                                    </h6>
                                    <h6 className="approved-value">
                                        {story.Approved ? 'Yes' : 'No'}
                                    </h6>
                                    <button
                                        onClick={() =>
                                            changeApproval(story._id)
                                        }
                                    >
                                        {story.Approved
                                            ? 'Unapprove'
                                            : 'Approve'}
                                    </button>
                                </div>
                            </div>
                            <p>Student Major: {story.StudentMajor}</p>
                            <p>{story.ParagraphText}</p>
                            <Link
                                to={{
                                    pathname: `/individualStory/${story._id}`,
                                }}
                            >
                                <button>View Story</button>
                            </Link>
                            <br />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default AdminPages
