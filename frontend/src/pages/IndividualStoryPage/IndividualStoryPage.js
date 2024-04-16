import React from 'react'
import { StoryPopUp } from '../../components/components'
import { useParams } from 'react-router-dom'

function IndividualStoryPage() {
    const { id } = useParams() // Use useParams to get the id from the URL

    return (
        <div>
            <StoryPopUp id={id} />
        </div>
    )
}

export default IndividualStoryPage
