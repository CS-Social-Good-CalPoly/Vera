import React, { useState, useEffect } from 'react'
import URL_PATH from '../../links.js'
import './AdminPages.css'
import { Modal, ResourceTag } from '../../components/components.js'

function AdminResourcesPage({ setActiveLink }) {
    const [resources, setResources] = useState([])
    const [showModal, setShowModal] = useState(false)
    // const [selectedResourceId, setSelectedResourceId] = useState('') // keeping for later implementation

    useEffect(() => {
        setActiveLink('/AdminPages')
    }, [setActiveLink])

    useEffect(() => {
        // Fetch all resources
        const subdirectory = '/resources/individualResources'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                // Add sample tags for display if no tags exist
                const resourcesWithTags = json.map((resource) => {
                    if (!resource.Tags || resource.Tags.length === 0) {
                        // Add sample tags based on resource category
                        const sampleTags = []
                        if (resource.Category) {
                            sampleTags.push(resource.Category)
                        }

                        // Add additional tags based on title keywords
                        const titleLower = resource.Title
                            ? resource.Title.toLowerCase()
                            : ''
                        if (titleLower.includes('health'))
                            sampleTags.push('Health')
                        if (titleLower.includes('food')) sampleTags.push('Food')
                        if (titleLower.includes('counseling'))
                            sampleTags.push('Mental Health')
                        if (titleLower.includes('pharmacy'))
                            sampleTags.push('Medication')

                        return { ...resource, Tags: sampleTags }
                    }
                    return resource
                })
                setResources(resourcesWithTags)
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
                                        <ResourceTag tag={tag} />
                                    ))
                                ) : (
                                    <p>No tags</p>
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
