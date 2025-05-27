import './IndividualStoryPage.css'
import { useEffect, useState } from 'react'
import { StoryPopUp } from '../../components/components.js'
import { useLocation } from 'react-router-dom'
import URL_PATH from '../../links.js'

function IndividualStoryPage({ category, setActiveLink }) {
    const location = useLocation()
    const pathSegments = location.pathname.split('/')
    const id = pathSegments[pathSegments.length - 1]
    const { editable } = location.state || { editable: false }
    const [relatedStories, setRelatedStories] = useState([])

    const getStoriesByCategory = () => {
        // URL_PATH imported from frontend/src/links.js
        // combined with subdirectory to make the full URL
        const subdirectory = '/stories/stories-by-category'

        const url = new URL(`${URL_PATH}${subdirectory}`)

        // If category exists and is an array, append each category to the URL
        if (category) {
            if (Array.isArray(category)) {
                // If category is an array, add each category as a separate parameter
                category.forEach((cat) => {
                    url.searchParams.append('category', cat)
                })
            } else {
                // If category is a single string, add it as a parameter
                url.searchParams.append('category', category)
            }
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                // check if the response is ok (status code 200)
                if (!response.ok) {
                    throw new Error(response.message)
                }
                return response.json()
            })
            .then((json) => {
                console.log(json)
                const allStories = json.data || []
                setRelatedStories(allStories)
            })
            .catch((error) => console.error(error))
    }

    useEffect(() => {
        setActiveLink('/Stories')
        getStoriesByCategory()
    }, [category])

    return (
        <div class="individual-story-page">
            <StoryPopUp id={id} editable={editable} />
            <div class="hear-from-other-students">Hear From Other Students</div>
        </div>
    )
}

export default IndividualStoryPage
