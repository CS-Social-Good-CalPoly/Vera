import React, { useState } from 'react'
import './ResourceTag.css'
import { Modal } from '../../components/components.js'

const ResourceTag = ({tag, resourceId, onDelete }) => {
    const [showModal, setShowModal] = useState(false)

    const handleDelete = () => {
        setShowModal(true)
    }

    const handleConfirmDelete = () => {
        onDelete(tag, resourceId)
        setShowModal(false)
    }

    const handleCancelDelete = () => {
        setShowModal(false)
    }

    return (
        <>
        {showModal && (
            <Modal
                message={`Delete tag "${tag}"?`}
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
