import React, { useState, useEffect } from 'react'
import {
    StoryBanner,
    CategoryButtonGroup,
    StoryTileGroup,
} from '../../components/components'
import { Link } from 'react-router-dom'
import URL_PATH from '../../links'

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

    async function toggleApproval(id) {
        try {
            const response = await fetch('/updateIndividualStory', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    individualStoryId: id,
                    Approved: !approved,
                }),
            })
            const updatedStory = await response.json()
            console.log('Updated Story:', updatedStory)
            setApproved(!approved)
        } catch (error) {
            console.error('Error toggling approval:', error)
        }
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
                            <div style={{ paddingRight: '50px' }}>
                                <h2 style={{ display: 'inline-block' }}>
                                    {story.Title}
                                </h2>
                                <button
                                    onClick={toggleApproval(story._id)}
                                    style={{
                                        display: 'inline-block',
                                        float: 'right',
                                    }}
                                >
                                    {approved ? 'Unapprove' : 'Approve'}
                                </button>
                                <h6
                                    style={{
                                        display: 'inline-block',
                                        float: 'right',
                                        paddingRight: '2%',
                                        marginTop: '0.4%',
                                    }}
                                >
                                    Approval:{' '}
                                    {story.Approved ? story.Approved : 'N/A'}
                                </h6>
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
