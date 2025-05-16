import React, { useState } from 'react'
import './ResourceTag.css'
import { Modal } from '../../components/components.js'

const ResourceTag = ({tag, onDelete }) => {
    const [showModal, setShowModal] = useState(false)

    const handleDelete = () => {
        setShowModal(true)
    }

    const handleConfirmDelete = () => {
        onDelete(tag)
        setShowModal(false)
    }

    const handleCancelDelete = () => {
        setShowModal(false)
    }

    return (
        <>
        {showModal && (
            <Modal
                message={`Delete tag "${tag}"? (This action cannot be undone!)`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        )}
        <div className="resource-tag">
            {tag}
            <span className="resource-tag-delete" onClick={handleDelete}>
                ×
            </span>
        </div>
        </>
    )
}

export default ResourceTag
