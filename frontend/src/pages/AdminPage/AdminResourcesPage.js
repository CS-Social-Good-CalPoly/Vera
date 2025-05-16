import React, { useState, useEffect } from 'react'
import URL_PATH from '../../links.js'
import './AdminPages.css'
import { Modal, ResourceTag } from '../../components/components.js'

// Predefined list of tags
const predefinedTags = [
    'Food',
    'Mental Health',
    'Counseling',
    'Therapy',
    'Housing',
    'Financial',
    'Academic',
    'Other'
]

function AdminResourcesPage({ setActiveLink }) {
    const [resources, setResources] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedResourceId, setSelectedResourceId] = useState('')
    const [showTagInput, setShowTagInput] = useState(null) // Track which resource's tag input is shown
    const [newTag, setNewTag] = useState('') // Store the new tag text
    const [showTagDropdown, setShowTagDropdown] = useState(null) // Track which resource's tag dropdown is shown

    useEffect(() => {
        setActiveLink('/AdminPages')
    }, [setActiveLink])

    useEffect(() => {
        // Fetch all resources
        const subdirectory = '/resources/individualResources'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                setResources(json)
            })
            .catch((error) => console.error(error))

        return () => {}
    }, [])

    const handleDelete = (id) => {
        // setSelectedResourceId(id)
        setShowModal(true)
    }

    const handleConfirmDelete = () => {
        // deleteResource(selectedResourceId)
        setShowModal(false)
    }

    const handleCancelDelete = () => {
        setShowModal(false)
    }

    const handleAddTagClick = (resourceId) => {
        if (showTagInput === resourceId) {
            setShowTagInput(null) // Hide the input field if it's already shown
            setShowTagDropdown(null) // Hide the dropdown if it's already shown
        } else {
            setShowTagInput(resourceId)
            setShowTagDropdown(resourceId) // Show the dropdown for this resource
        }
    }

    const handleTagChange = (e) => {
        setNewTag(e.target.value)
    }

    const handleTagKeyDown = (e, resourceId) => {
        if (e.key === 'Enter' && newTag.trim() !== '') {                
            // Add the new tag to the resource
            const updatedResources = resources.map((resource) => {
                if (resource._id === resourceId) {
                    if (resource.Tags && resource.Tags.includes(newTag.trim())) {
                        return resource
                    } else {
                        return {
                            ...resource,
                            Tags: [...(resource.Tags || []), newTag.trim()],
                        }
                    }
                }
                return resource
            })
            setResources(updatedResources)
            setNewTag('') // Clear the input
            setShowTagInput(null) // Hide the input field
            setShowTagDropdown(null) // Hide the dropdown
        }
    }

    const handleTagSelect = (tag, resourceId) => {
        // Add the selected predefined tag to the resource
        const updatedResources = resources.map((resource) => {
            if (resource._id === resourceId) {
                if (resource.Tags && resource.Tags.includes(tag)) {
                    return resource
                } else {
                    return {
                        ...resource,
                        Tags: [...(resource.Tags || []), tag],
                    }
                }
            }
            return resource
        })
        setResources(updatedResources)
        setShowTagDropdown(null) // Hide the dropdown
        setShowTagInput(null) // Hide the input field
    }

    const handleTagDelete = (tag, resourceId) => {
        // Remove the tag from the resource
        const updatedResources = resources.map((resource) => {
            if (resource._id === resourceId) {
                return {
                    ...resource,
                    Tags: (resource.Tags).filter(t => t !== tag)
                }
            }
            return resource
        })
        setResources(updatedResources)
    }

    return (
        <div className="admin-container">
            {showModal && (
                <Modal
                    message="Delete this resource? (This action cannot be undone!)"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
            <div className="mt-4">
                <h1>Resource Administration</h1>
                {resources.map((resource, index) => (
                    <div key={index} className="mb-4 p-3 border rounded">
                        <div className="d-flex justify-content-between">
                            <h2 className="title">{resource.Title}</h2>
                            <div className="approval-button-container">
                                <button
                                    className="approval-button"
                                    onClick={() => handleDelete(resource._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <p>
                            <strong>Category:</strong> {resource.Category}
                        </p>
                        <p>
                            <strong>Location:</strong> {resource.BuildingName}
                        </p>
                        <p>
                            <strong>Address:</strong> {resource.Address}
                        </p>
                        <p>
                            <strong>List Of Hours:</strong>{' '}
                            {resource.ListOfHours}
                        </p>
                        <p>
                            <strong>Phone Number:</strong>{' '}
                            {resource.PhoneNumber}
                        </p>
                        <p>
                            <strong>Paragraph Text:</strong>{' '}
                            {resource.ParagraphText}
                        </p>
                        <p>
                            <strong>Extra Info:</strong> {resource.ExtraInfo}
                        </p>
                        <p>
                            <strong>Resource URL:</strong>
                            <a
                                href={resource.ResourceURL}
                                style={{
                                    color: 'blue',
                                    textDecoration: 'underline',
                                }}
                            >
                                {resource.ResourceURL}
                            </a>
                        </p>
                        <div>
                            <strong>Tags:</strong>
                            <div className="resource-tag-container">
                                {resource.Tags && resource.Tags.length > 0 ? (
                                    resource.Tags.map((tag) => (
                                        <ResourceTag 
                                            tag={tag} 
                                            onDelete={() => handleTagDelete(tag, resource._id)} 
                                        />
                                    ))
                                ) : (
                                    <span className="no-tags-text">No tags</span>
                                )}
                                <button
                                    className="add-tag-button"
                                    onClick={() =>handleAddTagClick(resource._id)}
                                >
                                    + Add Tag
                                </button>
                                {showTagInput === resource._id && (
                                    <div>
                                        <input
                                            type="text"
                                            value={newTag}
                                            onChange={handleTagChange} // onChange automatically passes in the event
                                            onKeyDown={(e) =>
                                                handleTagKeyDown(e, resource._id)
                                            }
                                            placeholder="Enter new tag"
                                            className="new-tag-input"
                                        />
                                        {showTagDropdown === resource._id && (
                                            <div className="tag-dropdown">
                                                {predefinedTags.map((tag) => (
                                                    <div
                                                        className="tag-option"
                                                        onClick={() =>
                                                            handleTagSelect(tag, resource._id)
                                                        }
                                                    >
                                                        {tag}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminResourcesPage
