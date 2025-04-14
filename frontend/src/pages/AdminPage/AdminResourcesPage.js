import React, { useState, useEffect } from 'react'
import URL_PATH from '../../links.js'
import './AdminPages.css'
import {
    Modal
} from '../../components/components.js'

function AdminResourcesPage({ setActiveLink }) {
    const [resources, setResources] = useState([])
    const [showModal, setShowModal] = useState(false)
    // const [selectedResourceId, setSelectedResourceId] = useState('') // keeping for later implementation

    useEffect(() => {
        setActiveLink('/AdminPages')
    }, [setActiveLink])

    useEffect(() => {
        let isMounted = true
        // Fetch all resources
        const subdirectory = '/resources/individualResources'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                if (isMounted) {
                    setResources(json)
                }
            })
            .catch((error) => console.error(error))

        return () => {
            isMounted = false
        }
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
                {resources
                    .map((resource, index) => (
                        <div
                            key={index}
                            className="mb-4 p-3 border rounded"
                        >
                            <div className="d-flex justify-content-between">
                                <h2 className="title">{resource.Title}</h2>
                                <div className="approval-button-container">
                                    <button
                                        className="approval-button"
                                        onClick={() =>
                                            handleDelete(resource._id)
                                        }
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
                                <strong>List Of Hours:</strong> {resource.ListOfHours}
                            </p>
                            <p>
                                <strong>Phone Number:</strong> {resource.PhoneNumber}
                            </p>
                            <p>
                                <strong>Paragraph Text:</strong> {resource.ParagraphText}
                            </p>
                            <p>
                                <strong>Extra Info:</strong> {resource.ExtraInfo}
                            </p>
                            <p>
                                <strong>Resource URL:</strong>
                                <a
                                    href={resource.ResourceURL}
                                    color = "blue"
                                    style = {{ color: 'blue', textDecoration: 'underline' }}
                                >
                                    {resource.ResourceURL}
                                </a>
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default AdminResourcesPage
