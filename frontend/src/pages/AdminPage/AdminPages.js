import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import URL_PATH from '../../links.js'
import './AdminPages.css'
import { DropDownSelectForm, Modal } from '../../components/components.js'

function AdminPages({ setActiveLink }) {
    const [stories, setStories] = useState([])
    const [selectedDiscipline, setSelectedDiscipline] = useState(null)
    const [toggleStatus, setToggleStatus] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedStoryId, setSelectedStoryId] = useState('')
    const [categoryNames, setCategoryNames] = useState([])
    const history = useHistory()

    useEffect(() => {
        let isMounted = true
        const subdirectory = '/stories/individualstory'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                if (isMounted) {
                    let tempArray = json.map((story, index) => ({
                        _id: story._id,
                        Title: story.Title,
                        StudentMajor: story.StudentMajor,
                        ParagraphText: story.ParagraphText,
                        Status: story.Status,
                        Approved: story.Approved,
                    }))
                    setStories(tempArray)

                    let uniqueMajors = [
                        ...new Set(
                            json
                                .map((item) => item.StudentMajor?.trim())
                                .filter((major) => major), // Filter out null, undefined, or empty strings
                        ),
                    ]
                    // Sort the majors alphabetically
                    uniqueMajors.sort((a, b) => a.localeCompare(b))
                    uniqueMajors = [...uniqueMajors, 'Other']

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
    }, [setActiveLink, toggleStatus])

    const handleFilter = (discipline) => {
        setSelectedDiscipline(discipline)
    }

    const handleToggleStatus = () => {
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

    async function handleSyncColleges() {
        const subdirectory = '/colleges_scraper/sync_colleges'
        try {
            const response = await fetch(URL_PATH + subdirectory, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                throw new Error('Failed to sync colleges')
            }
            alert('Colleges synced successfully')
        } catch (error) {
            console.error('Error syncing colleges:', error)
            alert('Error syncing colleges')
        }
    }

    const handleResourceAdminNavigation = () => {
        history.push('/AdminPages/resources')
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
                <DropDownSelectForm
                    fieldTitle="All Majors"
                    myoptions={[
                        { value: '', label: 'Show All' },
                        ...categoryNames.map((major) => ({
                            value: major,
                            label: major,
                        })),
                    ]} // Convert the major to an object with a value and label
                    handleChange={handleFilter}
                    customStyles={{
                        width: '400px',
                    }}
                />
                {/* Buttons for reviewing */}

                <button
                    className={`dropdown-style ${toggleStatus ? 'pressed' : ''}`}
                    onClick={() => handleToggleStatus()}
                >
                    Review
                </button>

                {/*button for syncing colleges */}
                <button
                    className="dropdown-style"
                    onClick={() => handleSyncColleges()}
                >
                    Sync Colleges
                </button>

                <button
                    className="dropdown-style"
                    onClick={() => handleResourceAdminNavigation()}
                >
                    Resource Administration
                </button>
            </div>

            <div className="mt-4">
                {stories
                    .filter((story) => {
                        const isOther =
                            selectedDiscipline === 'Other' &&
                            (story.StudentMajor === undefined ||
                                story.StudentMajor === null ||
                                story.StudentMajor.trim() === '')

                        return (
                            (!selectedDiscipline ||
                                story.StudentMajor === selectedDiscipline ||
                                isOther) &&
                            (toggleStatus ? story.Status === 'review' : true)
                        )
                    })
                    .map((story, index) => (
                        <div key={index} className="mb-4 p-3 border rounded">
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
                            {/* This is to prevent from showing HTML tags in story!!! 
                                Don't remove unless you have a better solution */}
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: story.ParagraphText,
                                }}
                            />
                            <br />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default AdminPages
