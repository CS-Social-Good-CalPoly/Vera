import React, { useState, useEffect } from 'react'
import {
    DropDownForm,
    DropDownOptionalForm,
    StorySubmissionPopUp,
    StoryBanner,
    DropDownSelectForm,
} from '../components.js'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './StorySubmission.css'
import axios from 'axios'
import URL_PATH from '../../links.js'
import Select from 'react-select'

function StorySubmission() {
    const [year, setYear] = useState('')
    const [college, setCollege] = useState('')
    const [major, setMajor] = useState('')
    const [selectedCategories, setSelectedCategories] = useState([])
    const [quillValue, setQuillValue] = useState('')
    const [title, setTitleValue] = useState('')
    const [token, setTokenValue] = useState('')
    const [collegeDict, setCollegeDict] = useState({})
    const [categoryNamesList, setCategoryNamesList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [categoryIds, setCategoryIds] = useState([])
    const [showPopUp, setShowPopUp] = useState(false)
    //use for put
    const [storyId, setStoryId] = useState('')

    //use for Token POST: check if token already in database
    const [allTokens, setAllTokens] = useState([])

    //const [selectedCategory, setSelectedCategory] = useState([]);
    const [isCollegeDropdownDisabled, setIsCollegeDropdownDisabled] =
        useState(false)

    const values = {
        Year: year,
        College: college,
        Major: major,
        Description: quillValue,
        Title: title,
        Category: selectedCategories,
        CategoryIds: categoryIds,
        Token: token,
    }

    const categoryValues = [
        'School',
        'Family',
        'Clubs',
        'Work',
        'Home',
        'Friends',
        'Sports',
        'Eating',
        'Alcohol',
        'Drugs',
        'Financial',
        'Anxiety',
        'Stress',
        'Depression',
    ]

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
        setCategoryIds([...selectedCategories, e])
    }

    // const getCategoryId = (categories, categoryName) => {
    //     // console.log(categories)
    //     const cat = categories.filter((c) => c.Name === categoryName)[0]
    //     // console.log(cat)
    //     return cat._id
    // }

    const getCategoryId = (categories, categoryName) => {
        const cat = categories.find((c) => c.Title === categoryName)
        return cat ? cat._id : null
    }

    // //change the id list to include the selected category
    // useEffect(() => {
    //     console.log(selectedCategoryName)
    //     if (selectedCategoryName) {
    //         const id = getCategoryId(categoryList, selectedCategoryName)
    //         console.log(id)
    //         setCategoryIds((prev) => [...prev, id])
    //     }
    // }, [selectedCategories])

    // useEffect(() => {
    //     const ids = selectedCategories.map((category) =>
    //         getCategoryId(categoryList, category.value)
    //     );
    //     setCategoryIds(ids);
    // }, [selectedCategories, categoryList]);

    const handleTitleChange = (e) => {
        setTitleValue(e.target.value)
        console.log('selected:', categoryIds)
    }

    const handleMajorChange = (e) => {
        setMajor(e)
        setCollege(collegeDict[e])
        console.log(e + ': ' + collegeDict[e])
        setIsCollegeDropdownDisabled(e !== 'N/A') // Assuming "N/A" represents "MAJOR (OPTIONAL)"
    }

    useEffect(() => {
        axios
            .get(URL_PATH + '/stories/colleges-and-majors')
            .then((res) => {
                setCollegeDict(res.data)
            })
            .catch((err) => console.error(err))
    }, [])

    useEffect(() => {
        axios
            .get(URL_PATH + '/stories/generalstorycat')
            .then((res) => {
                const category_names_lst = res.data.map(
                    (item, index) => item.Title,
                )
                const category_lst = res.data.map((item, index) => item)
                setCategoryNamesList(category_names_lst)
                setCategoryList(category_lst)
            })
            .catch((err) => console.error(err))
    }, [])

    // react-select Select takes value and label objects as category options
    const categoryOptions = categoryList.map((category, index) => ({
        value: category._id,
        label: category.Name,
    }))

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
        // NOTE: TEMPORARY FIX UNTIL ISSUES #336 AND #337 ARE COMPLETE
        // Temporarily removes college requirement
        // remove these comments and restore college requirement when working on ISSUE #337
        if (
            year === '' ||
            // college === '' ||
            quillValue === '' ||
            title === ''
        ) {
            alert('Complete missing fields')
            e.preventDefault()
            console.log('Missing info')
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
        console.log('generating...')
        await fetchAllTokens()
        let numAttempts = 0
        while (numAttempts < 10) {
            try {
                console.log('looking for new token')
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
            console.log('error, no valid token found')
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
            RelevantCategoryList: values.CategoryIds,
            ImageUrl: '',
            ImageAltText: '',
            GeneralCategory: '',
        }
        console.log(postData)

        if (submittedToken) {
            // user inputted a token, connect old token to new story
            console.log('updating old token')
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
            console.log('unique token found')
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
                console.log(putData)
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
                    <div class="input-outer-container">
                        <div class="inner-container-box">
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
                                    fieldTitle={college ? college : 'College'}
                                    myoptions={[
                                        ...new Set(Object.values(collegeDict)),
                                    ]}
                                    handleChange={handleCollegeChange}
                                    customStyles={customStyles}
                                    disabled={isCollegeDropdownDisabled}
                                />
                            </div>
                        </div>
                        <div class="inner-container-box">
                            {/* <DropDownOptionalForm
                                fieldTitle="Major (optional)"
                                myoptions={Object.keys(collegeDict).sort()}
                                handleChange={handleMajorChange}
                            /> */}
                            <DropDownSelectForm
                                fieldTitle="Major"
                                myoptions={Object.keys(collegeDict).sort()}
                                handleChange={handleMajorChange}
                                customStyles={customStyles}
                            />
                            <div>
                                <DropDownSelectForm
                                    fieldTitle="Categories"
                                    myoptions={categoryOptions}
                                    handleChange={handleCategoryChange}
                                    isMulti
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
                                onKeyPress={handleTitleKeyPress}
                                onChange={handleTitleChange}
                            />
                        </div>
                        <ReactQuill
                            theme="snow"
                            value={quillValue}
                            onChange={setQuillValue}
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
