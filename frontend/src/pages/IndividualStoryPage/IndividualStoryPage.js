import React, { useEffect } from 'react'
import { StoryPopUp } from '../../components/components.js'
import { useLocation } from 'react-router-dom'
import './IndividualStoryPage.css'

function IndividualStoryPage({ setActiveLink }) {
    const location = useLocation()
    const pathSegments = location.pathname.split('/')
    const id = pathSegments[pathSegments.length - 1]
    const { editable } = location.state || { editable: false }
    console.log(location.state)
    useEffect(() => {
        setActiveLink('/Stories')
    }, [])

    return (
        <div class="individual-story-page">
            <StoryPopUp id={id} editable={editable} />
            <div class="hear-from-other-students">Hear From Other Students</div>
        </div>
    )
}

export default IndividualStoryPage
