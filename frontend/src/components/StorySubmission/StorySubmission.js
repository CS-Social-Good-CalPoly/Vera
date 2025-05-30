import React, { useState, useEffect } from 'react'
import {
    StorySubmissionPopUp,
    StoryBanner,
    DropDownSelectForm,
} from '../components.js'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './StorySubmission.css'
import axios from 'axios'
import URL_PATH from '../../links.js'

function StorySubmission() {
    const [year, setYear] = useState('')
    const [college, setCollege] = useState('')
    const [major, setMajor] = useState('')
    const [quillValue, setQuillValue] = useState('')
    const [title, setTitleValue] = useState('')
    const [token, setTokenValue] = useState('')
    const [majorsToCollege, setMajorsToCollege] = useState({})
    const [collegeList, setCollegeList] = useState([])
    const [majorsList, setMajorsList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [categoryIds, setCategoryIds] = useState([])
    const [showPopUp, setShowPopUp] = useState(false)

    // use for Token POST: check if token already in database
    const [allTokens, setAllTokens] = useState([])

    const [isCollegeDropdownDisabled, setIsCollegeDropdownDisabled] =
        useState(false)

    const values = {
        Year: year,
        College: college,
        Major: major,
        Description: quillValue,
        Title: title,
        CategoryIds: categoryIds,
        Token: token,
    }

    const handleTitleKeyPress = (e) => {
        setTitleValue(e.target.value)
    }

    const handleYearChange = (e) => {
        setYear(e)
    }

    const handleCollegeChange = (e) => {
        setCollege(e)
    }

    const handleCategoryChange = (e) => {
        setCategoryIds(e)
    }

    const handleTitleChange = (e) => {
        setTitleValue(e.target.value)
    }

    const handleQuillChange = (content) => {
        setQuillValue(content)
    }

    const handleMajorChange = (e) => {
        setMajor(e)
        setCollege(majorsToCollege[e])
        setIsCollegeDropdownDisabled(e !== 'N/A') // Assuming "N/A" represents "MAJOR (OPTIONAL)"
    }

    // Fetch colleges
    useEffect(() => {
        axios
            .get(URL_PATH + '/stories/colleges')
            .then((res) => {
                const collegeMap = {}
                res.data.forEach((item, _) => {
                    item.Majors.forEach((major, _) => {
                        collegeMap[major] = item.College
                    })
                })
                setMajorsToCollege(collegeMap)
                const collegeNames = res.data.map((item, _) => item.College)
                collegeNames.sort((a, b) => a.localeCompare(b))
                setCollegeList(collegeNames)
            })
            .catch((err) => console.error(err))
    }, [])

    // Fetch majors
    useEffect(() => {
        axios
            .get(URL_PATH + '/stories/majors')
            .then((res) => {
                const majorNames = res.data.sort((a, b) => a.localeCompare(b))
                setMajorsList(majorNames)
            })
            .catch((err) => console.error(err))
    }, [])

    // Fetch story categories
    useEffect(() => {
        axios
            .get(URL_PATH + '/stories/generalstorycat')
            .then((res) => {
                const category_lst = res.data.map((item, _) => item)
                setCategoryList(category_lst)
            })
            .catch((err) => console.error(err))
    }, [])

    const yearList = [
        '1st Year',
        '2nd Year',
        '3rd Year',
        '4th Year',
        '5th+ Year',
    ]

    const yearOptions = yearList.map((year, index) => ({
        value: year,
        label: year,
    }))

    function verifySubmission(e) {
        // if an option is selected, the value is stored as 1 at the moment
    }

    async function handlePopUp(e) {
        if (
            year === '' ||
            college === '' ||
            quillValue === '' ||
            title === ''
        ) {
            alert('Complete missing fields')
            e.preventDefault()
        } else {
            e.preventDefault()
            setShowPopUp(true)
            window.scrollTo({
                top:
                    document.documentElement.scrollHeight / 2 -
                    window.innerHeight / 2,
                behavior: 'smooth',
            })
        }
    }

    async function generateToken() {
        // gets all tokens from database into allTokens state
        await fetchAllTokens()
        let numAttempts = 0
        while (numAttempts < 10) {
            try {
                // Create token if the story successfully submits
                const response = await axios.get(
                    URL_PATH + '/stories/generate-token',
                )
                const newToken = response.data

                // check if token already exists
                if (allTokens[newToken]) {
                    // token already exists
                    console.log('token already exists: ', newToken)
                } else {
                    setTokenValue(newToken)
                    console.log('token found', response.data)
                    return newToken
                }
                numAttempts++
            } catch (err) {
                console.error('Error fetching token:', err)
            }
        }
        if (numAttempts === 10) {
            console.error('error, no valid token found')
        }
    }

    async function handlePost(submittedToken = null) {
        // e.preventDefault()
        // POST the story
        const postData = {
            Title: values.Title,
            ParagraphText: values.Description,
            Date: new Date(),
            StudentMajor: values.Major,
            StudentCollege: values.College,
            StudentYear: values.Year,
            RelevantCategoryList: values.CategoryIds.map(
                (categoryItems, _) => categoryItems.value,
            ),
            ImageUrl: '',
            ImageAltText: '',
            GeneralCategory: '',
        }

        if (submittedToken) {
            // user inputted a token, connect old token to new story
            postData['Token'] = submittedToken
            const storyID = await fetchStoryPost(postData)
            const tokenPutData = {
                tokenID: submittedToken,
                storyID: storyID,
            }
            await updateTokenAssociatedStories(tokenPutData)
        } else {
            // no token provided, create a new token and POST
            postData['Token'] = token
            const storyID = await fetchStoryPost(postData)
            await fetchTokenPost(token, storyID)
        }
    }

    async function updateTokenAssociatedStories(putData) {
        await fetch(URL_PATH + '/stories/tokens', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(putData),
        })
            .then(() => {
                // Refresh the page after all asynchronous operations are complete
                window.location.reload()
                window.scrollTo(0, 0)
                alert(
                    'Thank you for your submission!\nYour token has been connected to your new story!',
                )
            })
            .catch((err) => console.error(err))
    }

    async function fetchStoryPost(postData) {
        let storyID = ''
        const subdirectory = '/stories/storysubmission'
        await fetch(URL_PATH + subdirectory, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then((postResponse) => postResponse.json())
            .then((postRes) => {
                // setStoryId(postRes._id)  // state isn't updating for fetchTokenPost
                storyID = postRes._id
                const catId = postRes.RelevantCategoryList[0]
                const putData = {
                    categoryId: catId,
                    storyId: storyID,
                }
                fetch(URL_PATH + '/stories/generalstorycat', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(putData),
                }).catch((err) => console.error(err))
            })
            .catch((err) => console.error(err))
        return storyID
    }

    async function fetchAllTokens() {
        await fetch(URL_PATH + '/stories/tokens')
            .then((response) => response.json())
            .then((json) => {
                // Create dictionary using token value as the key
                // mapping ito the full token object
                let tempDict = {}
                tempDict = json.reduce((acc, obj) => {
                    acc[obj.Value] = obj
                    return acc
                }, {})
                setAllTokens(tempDict)
            })
            .catch((error) => console.error(error))
    }

    async function fetchTokenPost(token, storyID) {
        // token does not exist already, POST
        const tokenData = {
            Value: token,
            AssociatedStories: [storyID],
        }

        // POST token to database
        await fetch(URL_PATH + '/stories/tokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tokenData),
        })
            .then(() => {
                // Refresh the page after all asynchronous operations are complete
                window.location.reload()
                window.scrollTo(0, 0)
                alert('Thank you for your submission!\nYour token is: ' + token)
            })
            .catch((err) => console.error(err))
    }

    const customStyles = {
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
    }

    return (
        <div className="background">
            <div className={`body ${showPopUp ? 'inactive' : ''}`}>
                <StoryBanner
                    displayButton="false"
                    imageUrl="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80"
                />
                <form
                    className={`story-submission-box ${
                        showPopUp ? 'inactive' : ''
                    }`}
                    onSubmit={verifySubmission}
                >
                    <div className="input-outer-container">
                        <div className="inner-container-box">
                            <div>
                                <DropDownSelectForm
                                    fieldTitle="Year"
                                    myoptions={yearOptions}
                                    customStyles={customStyles}
                                    handleChange={handleYearChange}
                                />
                            </div>
                            <div>
                                <DropDownSelectForm
                                    fieldTitle="College"
                                    value={college}
                                    myoptions={[
                                        { value: '', label: 'College' },
                                        ...collegeList.map(
                                            (collegeName, _) => ({
                                                value: collegeName,
                                                label: collegeName,
                                            }),
                                        ),
                                    ]} // Convert the college to an object with a value and label
                                    handleChange={handleCollegeChange}
                                    customStyles={customStyles}
                                    disabled={isCollegeDropdownDisabled}
                                />
                            </div>
                        </div>
                        <div className="inner-container-box">
                            <DropDownSelectForm
                                fieldTitle="Major"
                                value={major}
                                myoptions={[
                                    { value: '', label: 'Major' },
                                    ...majorsList.map((majorName, _) => ({
                                        value: majorName,
                                        label: majorName,
                                    })),
                                ]} // Convert the major to an object with a value and label
                                handleChange={handleMajorChange}
                                customStyles={customStyles}
                            />
                            <div>
                                <DropDownSelectForm
                                    fieldTitle="Categories"
                                    myoptions={categoryList.map(
                                        (category, _) => ({
                                            value: category._id,
                                            label: category.Name,
                                        }),
                                    )}
                                    handleChange={handleCategoryChange}
                                    isMulti={true}
                                    customStyles={customStyles}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="description-box">
                        <div className="title-text">
                            {/* figure out way to temporary  text when no text typed yet - ie 3 states state 1 'enter text ' once u click text goes away, but state stays, then once starts typing- final state*/}
                            <input
                                className="inputBar"
                                placeholder="Enter title"
                                type="text"
                                value={title}
                                onKeyDown={handleTitleKeyPress}
                                onChange={handleTitleChange}
                            />
                        </div>
                        <ReactQuill
                            theme="snow"
                            value={quillValue}
                            onChange={handleQuillChange}
                        />
                        <div className="button-wrapper">
                            <button
                                id="submitButton"
                                className="button"
                                onClick={handlePopUp}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    {/* </div>   */}
                </form>
            </div>
            {showPopUp && (
                <StorySubmissionPopUp
                    onClose={() => setShowPopUp(false)}
                    onPost={handlePost}
                    makeToken={generateToken}
                />
            )}

            {/* </div>   */}
        </div>
    )
}
export default StorySubmission
