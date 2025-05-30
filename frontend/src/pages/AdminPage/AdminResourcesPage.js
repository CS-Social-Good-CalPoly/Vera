import React, { useState, useEffect } from 'react'
import URL_PATH from '../../links.js'
import './AdminPages.css'
import { Modal, ResourceTag } from '../../components/components.js'    
import Fuse from 'fuse.js' 

const fuseOptions = {
    isCaseSensitive: false,
    includeScore: false,
    ignoreDiacritics: false,
    shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 1,
    location: 0,
    threshold: 0.6,
    distance: 100,
    useExtendedSearch: false,
    ignoreLocation: false,
    ignoreFieldNorm: false,
    fieldNormWeight: 1,
    keys: ['Title', 'Category', 'ParagraphText'],
}

function AdminResourcesPage({ setActiveLink }) {
    const [resources, setResources] = useState([]) // Store all resources
    const [showModal, setShowModal] = useState(false) // Track if the delete modal is shown
    const [showTagInput, setShowTagInput] = useState(null) // Track which resource's tag input is shown
    const [newTag, setNewTag] = useState('') // Stores the new tag text
    const [showTagDropdown, setShowTagDropdown] = useState(null) // Track which resource's tag dropdown is shown
    const [tagError, setTagError] = useState(null) // Track tag error messages with resourceId
    const [allTags, setAllTags] = useState([]) // Store all tags fetched from the backend

    // Set the active link for the admin page
    useEffect(() => {
        setActiveLink('/AdminPages')
    }, [setActiveLink])

    useEffect(() => {
        // Fetch all resources
        const subdirectory = '/resources/individualResources'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                setResources(json) // Store fetched resources in state
            })
            .catch((error) => console.error(error))

        // Fetch all tags from the backend
        const fetchTags = async () => {
            const tags = await getAllTags()
            setAllTags(tags)
        }
        fetchTags()

        return () => {}
    }, [])

    // Helper function to add a single tag to the resource-tag collection
    const addTagToCollection = async (tagName) => {
        try {
            const response = await fetch(`${URL_PATH}/tags/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tagName: tagName
                })
            })
            
        } catch (error) {
            return { success: false, message: `Network error: ${error.message}` }
        }
    }

    // const migratePredefinedTags = async () => {
    //     try {            
    //         // Loop through each predefined tag and add it individually
    //         for (let i = 0; i < predefinedTags.length; i++) {
    //             const tagName = predefinedTags[i]
    //             addTagToCollection(tagName)
    //         }
    //     } catch (error) {
    //         console.error('Error during migration:', error)
    //         alert('Error during migration: ' + error.message)
    //     }
    // }

    const getAllTags = async () => {
        try {
            const response = await fetch(`${URL_PATH}/tags/all`)
            if (response.status !== 200) {
                throw new Error('Failed to fetch tags')
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching tags:', error)
            return []
        }
    }

    // Delete resource function
    const handleDelete = (id) => {
        setShowModal(true)
    }

    // Confirm delete function
    const handleConfirmDelete = () => {
        setShowModal(false)
    }
    
    // Cancel delete function
    const handleCancelDelete = () => {
        setShowModal(false)
    }

    // Called when add tag button is clicked
    const handleAddTagClick = (resourceId) => {
        if (showTagInput === resourceId) {
            setShowTagInput(null) // Hide the input field if it's already shown
            setShowTagDropdown(null) // Hide the dropdown if it's already shown
        } else {
            setShowTagInput(resourceId)
            setShowTagDropdown(resourceId) // Show the dropdown for this resource
            setTagError(null) // Clear any error message
        }
    }

    // Called when the user types in the tag input
    const handleTagChange = (e) => {
        setNewTag(e.target.value) // Update the new tag state
        // Clear error when the user starts typing again
        if (tagError) {
            setTagError(null)
        }
    }

    // Called when the user presses a key in the tag input
    const handleTagKeyDown = async (e, resourceId) => {
        if (e.key === 'Enter' && newTag.trim() !== '') {
            try {
                // Reset error messages
                setTagError(null); 
                
                // Call backend API to add the to the resource
                const response = await fetch(`${URL_PATH}/tags/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        resourceId: resourceId,
                        tag: newTag.trim()
                    })
                });

                // If the tag is not in the predefined list, add it to the collection
                if (!allTags.some(tag => tag.toLowerCase() === newTag.trim().toLowerCase())) {
                    await addTagToCollection(newTag.trim());
                    setAllTags(prev => [...prev, newTag.trim()]);
                }

                const data = await response.json();
                
                // Check if there was an error (status code 409 for duplicate)
                if (response.status === 409) {
                    setTagError({ resourceId, message: data.message });
                    return;
                }
                
                // Update the resources state with the response
                const updatedResources = resources.map(resource => {
                    // Check if the resource ID matches the one we are updating
                    if (resource._id === resourceId) {
                        return data.resource;
                    }
                    return resource;
                });
                
                setResources(updatedResources); // Update the resources state to reflect the new tag
                setNewTag(''); // Clear the input
                setShowTagInput(null); // Hide the input field
                setShowTagDropdown(null); // Hide the dropdown
            } catch (error) {
                console.error('Error adding tag:', error);
            }
        }
    }

    // Called when a predefined tag is selected from the dropdown
    const handleTagSelect = async (tag, resourceId) => {        
        try {
            // Reset any previous error messages
            setTagError(null);
            
            // Call backend API to add the tag
            const response = await fetch(`${URL_PATH}/tags/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    resourceId: resourceId,
                    tag: tag
                })
            });
            
            const data = await response.json();
            
            // Check if there was an error (status code 409 for duplicate)
            if (response.status === 409) {
                setTagError({ resourceId, message: data.message });
                return;
            }
            
            // Update the resources state with the response
            const updatedResources = resources.map(resource => {
                // Check if the resource ID matches the one we are updating
                if (resource._id === resourceId) {
                    return data.resource;
                }
                return resource;
            });
            
            setResources(updatedResources); // Update the resources state to reflect the new tag
            setShowTagDropdown(null); // Hide the dropdown
            setShowTagInput(null); // Hide the input field
        } catch (error) {
            console.error('Error adding tag:', error);
        } 
    }

    // Called when a tag is deleted
    const handleTagDelete = async (tag, resourceId) => {
        try {
            // Call backend API to remove the tag
            const response = await fetch(`${URL_PATH}/tags/remove/${resourceId}/${encodeURIComponent(tag)}`, {
                method: 'DELETE'  // Explicitly set the HTTP method to DELETE
            });

            const data = await response.json();
            
            // Update the resources state with the response
            const updatedResources = resources.map(resource => {
                // Check if the resource ID matches the one we are updating
                if (resource._id === resourceId) {
                    return data.resource;
                }
                return resource;
            });
            
            setResources(updatedResources); // Update the resources state to reflect the removed tag
        } catch (error) {
            console.error('Error deleting tag:', error);
        }
    }

    return (
        // Modal to confirm deletion of RESOURCE
        <div className="admin-container">
            {showModal && (
                <Modal
                    message="Delete this resource? (This action cannot be undone!)"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
            
            {/* Migration Section
            <div>
                <p>Click the button to migrate predefined tags to the MongoDB database. This is a one-time operation.</p>
                <button 
                    onClick={migratePredefinedTags}
                >
                    Migrate Predefined Tags to Database
                </button>
            </div> */}
            
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
                                    resource.Tags.map((tag, tagIndex) => (
                                        // Create ResourceTag component for each tag
                                        <ResourceTag 
                                            key={tagIndex} 
                                            tag={tag}
                                            resourceId={resource._id}
                                            onDelete={() => handleTagDelete(tag, resource._id)} 
                                        />
                                    ))
                                ) : (
                                    <span className="no-tags-text">No tags</span>
                                )}
                                <button // Button to add a new tag
                                    className="add-tag-button"
                                    onClick={() =>handleAddTagClick(resource._id)} // Call function and pass resource ID
                                >
                                    + Add Tag
                                </button>
                                {showTagInput === resource._id && (
                                    <div>
                                        <input // Input field to enter new tag 
                                            type="text"
                                            value={newTag}
                                            onChange={handleTagChange} // onChange automatically passes in the event
                                            onKeyDown={(e) =>
                                                handleTagKeyDown(e, resource._id)
                                            }
                                            placeholder="Enter new tag"
                                            className="new-tag-input"
                                        />
                                        {tagError && tagError.resourceId === resource._id && ( // Show error message if tag is already added
                                                <span className="tag-error-message">{tagError.message}</span>
                                            )}
                                        {showTagDropdown === resource._id && (() => { // Show dropdown with predefined tags
                                            const fuse = new Fuse(allTags, fuseOptions);
                                            const results = fuse.search(newTag);
                                            const sortedTags = results.map(result => result.item);
                                            const isSorted = sortedTags.length === 0 ? allTags : sortedTags;
                                            return (
                                                <div className="tag-dropdown">
                                                    {isSorted.map((tag, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="tag-option"
                                                            onClick={() =>
                                                                handleTagSelect(tag, resource._id)
                                                            }
                                                        >
                                                            {tag}
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })()}
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
