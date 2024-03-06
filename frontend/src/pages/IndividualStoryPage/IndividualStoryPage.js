import React from 'react'
import { StoryPopUp } from '../../components/components'
import { useLocation, useParams } from 'react-router-dom'

function IndividualStoryPage() {
    const location = useLocation()
    let id = location.state.storyID
    // let title = location.state.storyTitle
    const { title } = useParams()

    return (
        <div>
            <StoryPopUp id={id} title={title}/>
        </div>
    )
}

export default IndividualStoryPage
