import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import URL_PATH from '../../links.js';
import './AdminPages.css';

function AdminPages({ setActiveLink }) {
    const [stories, setStories] = useState([]);
    const [selectedDiscipline, setSelectedDiscipline] = useState(null);
    const [toggleStatus, setToggleStatus] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const subdirectory = '/stories/individualstory';
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                if (isMounted) {
                    let tempArray = json.map((story) => ({
                        _id: story._id,
                        Title: story.Title,
                        StudentMajor: story.StudentMajor,
                        ParagraphText: story.ParagraphText,
                        Status: story.Status,
                        Approved: story.Approved,
                    }));
                    setStories(tempArray);
                }
            })
            .catch((error) => console.error(error));

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        setActiveLink('/AdminPages');
        console.log("toggleStatus:", toggleStatus);
    }, [setActiveLink, toggleStatus]);

    const handleFilter = (discipline) => {
        setSelectedDiscipline(discipline);
    };

    const handleToggleStatus = () => {
        console.log("prev toggleStatus:", toggleStatus);
        setToggleStatus((prevToggleStatus) => !prevToggleStatus);
    };

    async function toggleApproval(id, approval) {
        const subdirectory = '/stories/updateIndividualStory';
        try {
            const response = await fetch(URL_PATH + subdirectory, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    individualStoryId: id,
                    Approved: !approval,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update story');
            }
            const updatedStory = await response.json();
            setStories((prevStories) =>
                prevStories.map((story) =>
                    story._id === updatedStory._id ? updatedStory : story
                )
            );
        } catch (error) {
            console.error('Error toggling approval:', error);
        }
    }

    async function deleteStory(id) {
        const subdirectory = '/stories/deleteIndividualStory';
        try {
            const response = await fetch(URL_PATH + subdirectory, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    individualStoryId: id
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to delete story');
            }
            setStories((prevStories) =>
                prevStories.map((story) =>
                    story
                )
            );
        } catch (error) {
            console.error('Error deleting story:', error);
        }
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
                            <div>
                                <Link
                                    to={{
                                        pathname: `/individualStory/${story._id}`,
                                    }}
                                >
                                    <h2 className="title">{story.Title}</h2>
                                </Link>
                                <div className="approved-container">
                                    <h6 className="approved-label">
                                        Approved:
                                    </h6>
                                    <h6 className="approved-value">
                                        {story.Approved ? 'Yes' : 'No'}
                                    </h6>
                                    <div className="approval-button-container">
                                        <button
                                            onClick={() =>
                                                toggleApproval(
                                                    story._id,
                                                    story.Approved
                                                )
                                            }
                                        >
                                            {story.Approved
                                                ? 'Unapprove'
                                                : 'Approve'}
                                        </button>
                                        {
                                            story.Approved
                                                ? null
                                                : <button
                                                onClick={() =>
                                                    deleteStory(
                                                        story._id
                                                    )
                                                }>
                                                Delete
                                                </button>
                                        }
                                    </div>
                                </div>
                            </div>
                            <p>Student Major: {story.StudentMajor}</p>
                            <p>{story.ParagraphText}</p>
                            <br />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default AdminPages;
