import React, { useState, useEffect } from 'react'
import {
    StoryBanner,
    CategoryButtonGroup,
    StoryTileGroup,
} from '../../components/components'
import { Link } from 'react-router-dom'
import URL_PATH from '../../links'

function AdminPages({ setActiveLink }) {
    const [stories, setStories] = useState([])
    // const [nameToID, setNameToID] = useState({})
    // const [categorNames, setCategorNames] = useState([])
    const [selectedDiscipline, setSelectedDiscipline] = useState(null)
    const [toggleStatus, setToggleStatus] = useState(false)

    useEffect(() => {
        const subdirectory = '/stories/individualstory'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                let tempArray = json
                // .filter((story) => story.Status !== undefined)
                .map((story) => ({
                    _id: story._id,
                    Title: story.Title,
                    StudentMajor: story.StudentMajor,
                    ParagraphText: story.ParagraphText,
                    Status: story.Status,
                }))
                setStories(tempArray);
                // console.log('stories array:', tempArray);
            })
            .catch((error) => console.error(error))
    }, [])

    useEffect(() => {
        setActiveLink('/AdminPages');
        console.log("toggleStatus:", toggleStatus);
    }, [])

    const handleFilter = (discipline) => {
        setSelectedDiscipline(discipline)
    }

    const handleToggleStatus = () => {    
        console.log("prev toggleStatus:", toggleStatus);
        setToggleStatus(prevToggleStatus => !prevToggleStatus);
    }

    return (
        <div>
            <div>
                {/* Buttons for filtering */}
                <button onClick={() => handleFilter('SE')}>SE</button>
                <button onClick={() => handleFilter('Computer Science')}>
                    CSC
                </button>
                <button onClick={() => handleToggleStatus()}>Review</button>
                <button onClick={() => handleFilter(null)}>Show All</button>
            </div>

            <div>
                {stories
                    .filter((story) => {
                        console.log(`story status: ${story.Status}`);
                        return (
                        (!selectedDiscipline || story.StudentMajor === selectedDiscipline) &&
                        (toggleStatus ? story.Status === 'review' : true)
                        );
                    })
                    .map((story, index) => (
                        <div key={index}>
                            <h2>{story.Title}</h2>
                            <p>Student Major: {story.StudentMajor}</p>
                            <p>{story.ParagraphText}</p>
                            <Link
                                to={{
                                    pathname: `/individualStory/${story._id}`,
                                }}
                            >
                                <button>View Story</button>
                            </Link>
                            <br /> {/* Line break */}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default AdminPages
