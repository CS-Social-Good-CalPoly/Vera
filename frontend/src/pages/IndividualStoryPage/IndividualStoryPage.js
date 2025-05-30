import './IndividualStoryPage.css'
import { useEffect, useState } from 'react'
import { RelatedStoriesTile, StoryPopUp } from '../../components/components.js'
import { useLocation } from 'react-router-dom'
import URL_PATH from '../../links.js'

function IndividualStoryPage({ setActiveLink }) {
    const location = useLocation()
    const pathSegments = location.pathname.split('/')
    const id = pathSegments[pathSegments.length - 1]
    const { editable } = location.state || { editable: false }
    const [relatedStoriesID, setRelatedStoriesID] = useState([])
    const [relatedStories, setRelatedStories] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch categories for this story
    const getStoriesByCategory = () => {
        // We already have the story IDs from the backend
        // Just flatten the array, remove nulls and duplicates
        if (relatedStoriesID && relatedStoriesID.length > 0) {
            let storyIds = []
            relatedStoriesID.forEach((categoryStoryList) => {
                if (Array.isArray(categoryStoryList)) {
                    storyIds = [...storyIds, ...categoryStoryList]
                }
            })

            // Remove duplicates, nulls, and current story ID
            storyIds = [...new Set(storyIds)].filter(
                (storyId) => storyId !== null && storyId !== id,
            )

            if (storyIds.length > 0) {
                // Fetch full story details for the related story IDs
                fetch(`${URL_PATH}/stories/individualstory`)
                    .then((response) => response.json())
                    .then((allStories) => {
                        // Filter to only include stories from our related IDs
                        let filteredStories = allStories.filter((story) =>
                            storyIds.includes(story._id),
                        )

                        // If we have too many stories, take a random subset
                        if (filteredStories.length > 3) {
                            const shuffled = [...filteredStories].sort(
                                () => 0.5 - Math.random(),
                            )
                            filteredStories = shuffled.slice(0, 4)
                            setRelatedStories(filteredStories)
                        }
                        // If we have fewer than 3 related stories, get some random ones to fill in
                        else if (filteredStories.length < 3) {
                            // Filter out stories we already have and the current story
                            const alreadySelectedIds = new Set(
                                filteredStories.map((story) => story._id),
                            )
                            alreadySelectedIds.add(id) // Add current story ID

                            const otherStories = allStories.filter(
                                (story) => !alreadySelectedIds.has(story._id),
                            )

                            // Shuffle and take just enough to reach 3 total
                            const shuffled = [...otherStories].sort(
                                () => 0.5 - Math.random(),
                            )
                            const randomStories = shuffled.slice(
                                0,
                                Math.min(
                                    4 - filteredStories.length,
                                    shuffled.length,
                                ),
                            )

                            // Combine the filtered stories with random ones
                            const combinedStories = [
                                ...filteredStories,
                                ...randomStories,
                            ]
                            setRelatedStories(combinedStories)
                        }
                        // If we have exactly 3, just use those
                        else {
                            setRelatedStories(filteredStories)
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching story details:', error)
                        // If there's an error, fall back to random stories
                        fetchRandomStories()
                    })
                return
            }
        }

        // If we have no related story IDs, fetch random stories
        fetchRandomStories()
    }

    // Helper function to fetch random stories
    const fetchRandomStories = () => {
        fetch(`${URL_PATH}/stories/individualstory`)
            .then((response) => response.json())
            .then((allStories) => {
                // Filter out the current story
                const otherStories = allStories.filter(
                    (story) => story._id !== id,
                )

                // Shuffle and take first 3
                const shuffled = [...otherStories].sort(
                    () => 0.5 - Math.random(),
                )
                const randomStories = shuffled.slice(
                    0,
                    Math.min(4, shuffled.length),
                )

                setRelatedStories(randomStories)
            })
            .catch((error) =>
                console.error('Error fetching random stories:', error),
            )
    }

    /* The reason for making it a backend call is because seeing how the 
        only other way would be to pass it in the "state" of StoryTile, 
        the value would be lost as soon as the page were refreshed.
    */
    useEffect(() => {
        setLoading(true)
        fetch(`${URL_PATH}/stories/story-categories/${id}`)
            .then((response) => response.json())
            .then((data) => {
                // Check if data.categories exists and is an array
                if (data.categories && Array.isArray(data.categories)) {
                    setRelatedStoriesID(data.categories)
                } else {
                    console.warn('Invalid categories format:', data)
                    setRelatedStoriesID([])
                }
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching categories:', error)
                setRelatedStoriesID([])
                setLoading(false)
            })
    }, [id])

    useEffect(() => {
        if (!loading) {
            setActiveLink('/Stories')
            getStoriesByCategory()
        }
    }, [loading])

    return (
        <div className="individual-story-page">
            <StoryPopUp id={id} editable={editable} />
            <div className="hear-from-other-students">
                Hear From Other Students
            </div>
            <div className="related-stories">
                {relatedStories.map((story, index) => (
                    <RelatedStoriesTile
                        key={index}
                        id={story && story._id ? story._id : ''}
                        title={story && story.Title ? story.Title : ''}
                        imgUrl={story && story.ImageUrl ? story.ImageUrl : ''}
                        description={
                            story && story.ParagraphText
                                ? story.ParagraphText
                                : ''
                        }
                        studentYear={
                            story && story.StudentYear ? story.StudentYear : ''
                        }
                        studentMajor={
                            story && story.StudentMajor
                                ? story.StudentMajor
                                : ''
                        }
                        categories={story.RelevantCategoryList}
                    />
                ))}
            </div>
        </div>
    )
}

export default IndividualStoryPage
