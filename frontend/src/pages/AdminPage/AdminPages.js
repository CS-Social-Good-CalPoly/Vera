import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import URL_PATH from '../../links.js'
import './AdminPages.css'
import { DropDownForm, Modal } from '../../components/components.js'

function AdminPages({ setActiveLink }) {
    const [stories, setStories] = useState([])
    const [selectedDiscipline, setSelectedDiscipline] = useState(null)
    const [toggleStatus, setToggleStatus] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedStoryId, setSelectedStoryId] = useState('')
    const [categoryNames, setCategoryNames] = useState([])

    useEffect(() => {
        let isMounted = true
        const subdirectory = '/stories/individualstory'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                if (isMounted) {
                    let tempArray = json.map((story) => ({
                        _id: story._id,
                        Title: story.Title,
                        StudentMajor: story.StudentMajor,
                        ParagraphText: story.ParagraphText,
                        Status: story.Status,
                        Approved: story.Approved,
                    }))
                    console.log(tempArray)
                    setStories(tempArray)

                    const uniqueMajors = [
                        ...new Set(
                            json
                                .map((item) => item.StudentMajor?.trim())
                                .filter((major) => major), // Filter out null, undefined, or empty strings
                        ),
                    ]
                    // Sort the majors alphabetically
                    uniqueMajors.sort((a, b) => a.localeCompare(b))

                    setCategoryNames(uniqueMajors)
                }
            })
            .catch((error) => console.error(error))

        return () => {
            isMounted = false
        }
    }, [])

    useEffect(() => {
        setActiveLink('/AdminPages')
        console.log('toggleStatus:', toggleStatus)
    }, [setActiveLink, toggleStatus])

    const handleFilter = (discipline) => {
        if (discipline === 'N/A') {
            discipline = null
        }
        setSelectedDiscipline(discipline)
    }

    const handleToggleStatus = () => {
        console.log('prev toggleStatus:', toggleStatus)
        setToggleStatus((prevToggleStatus) => !prevToggleStatus)
    }

    const handleDelete = () => {
        setShowModal(true)
    }

    const handleConfirmDelete = () => {
        deleteIndividualStory(selectedStoryId)
        setShowModal(false)
    }

    const handleCancelDelete = () => {
        setShowModal(false)
    }

    async function toggleApproval(id, approval) {
        const subdirectory = '/stories/updateIndividualStory'
        try {
            const response = await fetch(URL_PATH + subdirectory, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    individualStoryId: id,
                    Approved: !approval,
                }),
            })
            if (!response.ok) {
                throw new Error('Failed to update story')
            }
            const updatedStory = await response.json()
            setStories((prevStories) =>
                prevStories.map((story) =>
                    story._id === updatedStory._id ? updatedStory : story,
                ),
            )
        } catch (error) {
            console.error('Error toggling approval:', error)
        }
    }

    async function deleteIndividualStory(id) {
        const subdirectory = '/stories/deleteIndividualStory'
        try {
            const response = await fetch(URL_PATH + subdirectory, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    individualStoryId: id,
                }),
            })
            if (!response.ok) {
                throw new Error('Failed to delete story')
            }
            setStories((prevStories) =>
                prevStories.filter((story) => story._id !== id),
            )
        } catch (error) {
            console.error('Error deleting story:', error)
        }
    }

    return (
        <div className="admin-container">
            {showModal && (
                <Modal
                    message="Delete this story? (This action cannot be undone!)"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
            <div className="dropdown-container">
                {/* Drop down for filtering by major*/}
                <DropDownForm
                    fieldTitle="Filter By Major"
                    myoptions={categoryNames}
                    handleChange={handleFilter}
                />
                {/* Buttons for reviewing */}

                <button
                    className={`dropdown-style ${toggleStatus ? 'pressed' : ''}`}
                    onClick={() => handleToggleStatus()}
                >
                    Review
                </button>
            </div>

            <div>
                {stories
                    .filter((story) => {
                        return (
                            (!selectedDiscipline ||
                                story.StudentMajor === selectedDiscipline) &&
                            (toggleStatus ? story.Status === 'review' : true)
                        )
                    })
                    .map((story, index) => (
                        <div key={index}>
                            <div>
                                <Link
                                    to={{
                                        pathname: `/individualStory/${story._id}`,
                                    }}
                                >
                                    <h2 className="title">{story.Title}</h2>
                                </Link>
                                <div className="approved-container">
                                    <h6 className="approved-label">
                                        Approved:
                                    </h6>
                                    <h6 className="approved-value">
                                        {story.Approved ? 'Yes' : 'No'}
                                    </h6>
                                    <div className="approval-button-container">
                                        <button
                                            className="approval-button"
                                            onClick={() =>
                                                toggleApproval(
                                                    story._id,
                                                    story.Approved,
                                                )
                                            }
                                        >
                                            {story.Approved
                                                ? 'Unapprove'
                                                : 'Approve'}
                                        </button>
                                        <button
                                            className="approval-button"
                                            disabled={story.Approved}
                                            onClick={() => {
                                                if (!story.Approved) {
                                                    setSelectedStoryId(
                                                        story._id,
                                                    )
                                                    handleDelete()
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p>Student Major: {story.StudentMajor}</p>
                            <p>{story.ParagraphText}</p>
                            <br />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default AdminPages
