import React from 'react'
import { StoryPopUp } from '../../components/components'
import { useLocation } from 'react-router-dom'

function IndividualStoryPage() {
    const location = useLocation()
    console.log("location: ", location)
    let id = location.state.storyID
    let title = location.state.storyTitle

    return (
        <div>
            <StoryPopUp id={id} title={title}/>
        </div>
    )
}

export default IndividualStoryPage
