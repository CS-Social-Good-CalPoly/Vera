import React, { useEffect } from 'react'
import { StoryPopUp } from '../../components/components.js'
import { useLocation } from 'react-router-dom'

function IndividualStoryPage({ setActiveLink }) {
    const location = useLocation()
    const pathSegments = location.pathname.split('/')
    const id = pathSegments[pathSegments.length - 1]
    const { editable } = location.state || { editable: false }
    useEffect(() => {
        setActiveLink('/Stories')
    }, [])

    return (
        <div>
            <StoryPopUp id={id} editable={editable} />
        </div>
    )
}

export default IndividualStoryPage
