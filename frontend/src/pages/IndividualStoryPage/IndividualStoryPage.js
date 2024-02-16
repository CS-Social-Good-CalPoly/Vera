import React from 'react'
import { StoryPopUp } from '../../components/components'
import { useLocation } from 'react-router-dom'

function IndividualStoryPage() {
    const location = useLocation()
    let id = location.state.storyID
    // console.log('hi')
    // console.log(id)

    return (
        <div>
            <StoryPopUp id={id} />
        </div>
    )
}

export default IndividualStoryPage
