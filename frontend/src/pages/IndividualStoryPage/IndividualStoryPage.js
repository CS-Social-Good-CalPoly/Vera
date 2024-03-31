import React, { useEffect } from 'react'
import { StoryPopUp } from '../../components/components'
import { useLocation } from 'react-router-dom'

function IndividualStoryPage({ setActiveLink }) {
    const location = useLocation()
    let id = location.state.storyID
    // console.log('hi')
    // console.log(id)

    useEffect(() => {
        setActiveLink('/IndividualStory')
    }, [])

    return (
        <div>
            <StoryPopUp id={id} />
        </div>
    )
}

export default IndividualStoryPage
