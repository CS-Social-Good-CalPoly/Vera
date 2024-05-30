import React from 'react'
import { StoryBanner, StorySubmission } from '../../components/components'
import { useEffect } from 'react'

function StorySubmissionPage({ setActiveLink }) {
    useEffect(() => {
        setActiveLink('/StorySubmission')
    }, [])

    return (
        <div>
            {/* <StoryBanner
                displayButton="false"
                imageUrl="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80"
            /> */}
            <StorySubmission />
        </div>
    )
}

export default StorySubmissionPage
