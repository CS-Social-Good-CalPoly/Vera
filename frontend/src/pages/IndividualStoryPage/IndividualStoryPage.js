import React, { useEffect } from 'react'
import { StoryPopUp } from '../../components/components.js'
import { useLocation } from 'react-router-dom'

function IndividualStoryPage({ setActiveLink }) {
    const location = useLocation()
    const pathSegments = location.pathname.split('/')
    const id = pathSegments[pathSegments.length - 1]

    useEffect(() => {
        setActiveLink('/Stories')
    }, [])

    return (
        <div>
            <StoryPopUp id={id} />
        </div>
    )
}

export default IndividualStoryPage
