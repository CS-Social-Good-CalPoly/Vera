import React, { useState, useEffect } from 'react'
import URL_PATH from '../../links.js'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import '../StorySubmission/StorySubmission.css'

function EditStoryPopUp({ onClose, onPost, story }) {
    const [title, setTitle] = useState((story?.Title || '').toUpperCase())
    const [quillValue, setQuillValue] = useState(story?.ParagraphText || '')
    const [year, setYear] = useState(story?.StudentYear || '')
    const [college, setCollege] = useState(story?.StudentCollege || '')
    const [major, setMajor] = useState(story?.StudentMajor || '')
    const [categories, setCategories] = useState([])

    // Fetch college/major and category data on mount
    useEffect(() => {
        axios
            .get(URL_PATH + '/stories/colleges-and-majors')
            .catch((err) => console.error(err))

        axios
            .get(URL_PATH + '/stories/generalstorycat')
            .then((res) => {
                // Map existing story categories to react-select format
                if (story?.RelevantCategoryList?.length > 0) {
                    const selectedCategories = res.data
                        .filter((cat) =>
                            story.RelevantCategoryList.includes(cat._id),
                        )
                        .map((cat) => ({ value: cat._id, label: cat.Title }))
                    setCategories(selectedCategories)
                }
            })
            .catch((err) => console.error(err))
    }, [story])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title || !quillValue) {
            alert('Title and story content are required.')
            return
        }
        const updatedStory = {
            Title: title,
            ParagraphText: quillValue,
            StudentYear: year,
            StudentCollege: college,
            StudentMajor: major,
            RelevantCategoryList: categories.map((cat) => cat.value),
            Token: story.Token, // Preserve existing token
        }
        onPost(updatedStory)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value.toUpperCase())
    }

    return (
        <div
            className="popup-overlay"
            style={{
                position: 'fixed', // Ensures the blur covers the full screen
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backdropFilter: 'blur(3px)', // Stronger blur
                backgroundColor: 'rgba(255, 255, 255, 0.7)', // Lighter white
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                className="popup-container story-submission-box"
                style={{
                    borderRadius: '20px',
                    height: '90vh',
                    width: '90vw',
                    maxWidth: '1200px',
                    minWidth: '300px',
                    marginBottom: '5%',
                    overflowY: 'auto',
                    position: 'relative',
                }}
            >
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        className="inputBar"
                        placeholder="Enter title"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <ReactQuill
                        theme="snow"
                        value={quillValue}
                        onChange={setQuillValue}
                    />
                    <div
                        className="button-wrapper"
                        style={{
                            marginTop: '6%',
                            marginBottom: 0,
                            padding: 0,
                        }}
                    >
                        <button
                            type="button"
                            className="button"
                            onClick={onClose}
                            style={{
                                backgroundColor: '#B7CAD4',
                                margin: '0 10px 0 0',
                                padding: 0,
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="button"
                            style={{
                                margin: '0 10px 0 0',
                                padding: 0,
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditStoryPopUp
