import React, { useState, useEffect } from 'react'
import URL_PATH from '../../links.js'
import Select from 'react-select'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { DropDownForm, DropDownOptionalForm } from '../components.js'
import axios from 'axios'

function EditStoryPopUp({ onClose, onPost, makeToken, story }) {
    const [radioOption, setRadioOption] = useState(
        story?.Token ? 'existing-token' : '',
    )
    const [tokenInput, setTokenInput] = useState(story?.Token || '')
    const [newToken, setNewToken] = useState('')
    const [allTokens, setAllTokens] = useState({})
    const [showError, setShowError] = useState(false)

    // Dropdown options
    const yearList = [
        '1st Year',
        '2nd Year',
        '3rd Year',
        '4th Year',
        '5th+ Year',
    ]

    // State for college/major dictionary
    const [collegeDict, setCollegeDict] = useState({})
    const [categoryList, setCategoryList] = useState([])

    // Story fields (pre-fill if editing)
    const [title, setTitle] = useState((story?.Title || '').toUpperCase())
    const [quillValue, setQuillValue] = useState(story?.ParagraphText || '')
    const [year, setYear] = useState(story?.StudentYear || '')
    const [college, setCollege] = useState(story?.StudentCollege || '')
    const [major, setMajor] = useState(story?.StudentMajor || '')
    const [categories, setCategories] = useState(
        story?.GeneralCategory
            ? [{ value: story.GeneralCategory, label: story.GeneralCategory }]
            : [],
    )

    // Fetch college/major data and categories on component mount
    useEffect(() => {
        axios
            .get(URL_PATH + '/stories/colleges-and-majors')
            .then((res) => {
                setCollegeDict(res.data)
            })
            .catch((err) => console.error(err))

        axios
            .get(URL_PATH + '/stories/generalstorycat')
            .then((res) => {
                setCategoryList(res.data)
            })
            .catch((err) => console.error(err))
    }, [])

    // Derive options from fetched data
    const collegeOptions = [...new Set(Object.values(collegeDict))]
    const majorOptions = Object.keys(collegeDict).sort()
    const categoryOptions = categoryList.map((category) => ({
        value: category.Name,
        label: category.Name,
    }))

    // Custom styles to match StorySubmission
    const customStyles = {
        control: (provided) => ({
            ...provided,
            padding: '3px',
            paddingLeft: '20px',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '16px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            width: '100%',
            color: '#534D49',
            borderColor: 'white',
            margin: '0px 0px 7% 0px',
            background: 'white',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '20px',
            border: '.5px solid rgba(0, 0, 0, 0.25)',
            textOverflow: 'ellipsis',
        }),
    }

    // Ensures that dropdown values are updated when `story` changes
    useEffect(() => {
        if (story) {
            setTitle(story.Title || '')
            setQuillValue(story.ParagraphText || '')
            setYear(story.StudentYear || '')
            setCollege(story.StudentCollege || '')
            setMajor(story.StudentMajor || '')
            setCategories(
                story.GeneralCategory
                    ? [
                          {
                              value: story.GeneralCategory,
                              label: story.GeneralCategory,
                          },
                      ]
                    : [],
            )
        }
    }, [story])

    // Fetches existing tokens and generates a new one if needed
    useEffect(() => {
        async function fetchTokenData() {
            if (radioOption === 'no-token' && newToken === '') {
                setNewToken(await makeToken())
            }
            if (Object.keys(allTokens).length === 0) {
                await fetchAllTokens()
            }
            setShowError(false)
        }
        fetchTokenData()
    }, [radioOption])

    async function fetchAllTokens() {
        try {
            const response = await fetch(URL_PATH + '/stories/tokens')
            const json = await response.json()
            const tempDict = json.reduce((acc, obj) => {
                acc[obj.Value] = obj
                return acc
            }, {})
            setAllTokens(tempDict)
        } catch (error) {
            console.error(error)
        }
    }

    const handleCategoryChange = (selectedOptions) => {
        setCategories(selectedOptions)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const updatedStory = {
            title,
            content: quillValue,
            year,
            college,
            major,
            categories: categories.map((cat) => cat.label),
            token: radioOption === 'existing-token' ? tokenInput : newToken,
        }

        onPost(updatedStory)
    }

    // Ensure title stays capitalized on change
    const handleTitleChange = (e) => {
        setTitle(e.target.value.toUpperCase())
    }

    return (
        <div
            className="popup-container"
            style={{
                position: 'center',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000,
                padding: '30px',
                borderRadius: '10px',
                maxHeight: '80vh',
                width: '90vw',
                maxWidth: '1200px',
                minWidth: '300px',
                margin: 'auto',
            }}
        >
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-outer-container">
                    <div className="inner-container-box">
                        <DropDownForm
                            fieldTitle="Year"
                            myoptions={yearList}
                            handleChange={setYear}
                            value={year}
                        />
                        <DropDownForm
                            fieldTitle="College"
                            myoptions={collegeOptions}
                            handleChange={setCollege}
                            value={college}
                        />
                    </div>
                    <div className="inner-container-box">
                        <DropDownOptionalForm
                            fieldTitle="Major (optional)"
                            myoptions={majorOptions}
                            handleChange={setMajor}
                            value={major}
                        />
                        <Select
                            styles={customStyles}
                            options={categoryOptions}
                            placeholder="Categories"
                            isMulti
                            value={categories}
                            onChange={handleCategoryChange}
                        />
                    </div>
                </div>

                {/* Story Title and Content */}
                <div className="description-box">
                    <div className="title-text">
                        <input
                            className="inputBar"
                            placeholder="Enter title"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <ReactQuill
                        theme="snow"
                        value={quillValue}
                        onChange={setQuillValue}
                    />
                </div>

                {/* Token Selection and Submission */}
                <div className="formButtons">
                    <button
                        id="cancelButton"
                        className="cancelButton"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        id="submitButton"
                        className={`submitButton ${
                            radioOption === '' || showError
                                ? 'inactiveButton'
                                : ''
                        }`}
                        disabled={radioOption === '' || showError}
                        onClick={
                            radioOption === 'existing-token'
                                ? (e) => {
                                      e.preventDefault()
                                      if (allTokens[tokenInput]) {
                                          onPost({
                                              title,
                                              content: quillValue,
                                              year,
                                              college,
                                              major,
                                              categories: categories.map(
                                                  (cat) => cat.label,
                                              ),
                                              token: tokenInput,
                                          })
                                      } else {
                                          setShowError(true)
                                      }
                                  }
                                : handleSubmit
                        }
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditStoryPopUp
