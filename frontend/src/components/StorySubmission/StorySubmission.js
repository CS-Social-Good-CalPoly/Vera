import React, { useState, useEffect } from 'react'
import { DropDownForm, DropDownOptionalForm } from '../components'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './StorySubmission.css'
import axios from 'axios'
import cheerio from 'cheerio'
import URL_PATH from '../../links'

function StorySubmission() {
    const [year, setYear] = useState('')
    const [college, setCollege] = useState('')
    const [major, setMajor] = useState('')
    const [category, setCategory] = useState('')
    const [quillValue, setQuillValue] = useState('')
    const [title, setTitleValue] = useState('')
    const [collegeDict, setCollegeDict] = useState({})

    const values = {
        Year: year,
        College: college,
        Major: major,
        Description: quillValue,
        Title: title,
        Category: category,
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
        setCategory(e)
    }

    const handleTitleChange = (e) => {
        setTitleValue(e.target.value)
    }

    const handleMajorChange = (e) => {
        setMajor(e)
        setCollege(collegeDict[e])
        console.log(e + ': ' + collegeDict[e])
    }

    useEffect(() => {
        axios
            .get('https://www.calpoly.edu/colleges-departments-and-majors')
            .then((res) => {
                const $ = cheerio.load(res.data)
                const college_dict = {}

                // Select each h2 tag
                $('h2').each((index, element) => {
                    // Get the text content of the h2 tag
                    const college_name = $(element).text().trim()
                    if (college_name.toLowerCase().includes('college')) {
                        // Get the section, stopping at the next h2 which should be the college
                        const $collegeSection = $(element).nextUntil('h2')

                        // Iterate over each HTML a element within this section
                        $collegeSection.find('a').each((index, element) => {
                            // Get the text content of the a tag
                            const major_name = $(element).text().trim()

                            if (
                                major_name.toLowerCase().includes('major') &&
                                major_name !== 'Find a major'
                            ) {
                                // Create key/value pair; keys = majors, values = colleges
                                // Note: keys are unique, colleges duplicate
                                college_dict[major_name] = college_name
                                console.log(
                                    major_name +
                                        ': ' +
                                        college_dict[major_name],
                                )
                            }
                        })
                    }
                })
                setCollegeDict(college_dict)
            })
            .catch((err) => console.error(err))
    }, [])

    useEffect(() => {
        axios
            .get(URL_PATH + '/stories/generalstorycat')
            .then((res) => {
                const category_lst = res.data.map((item) => item.Title)
                console.log(category_lst)
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

    function verifySubmission(e) {
        // if an option is selected, the value is stored as 1 at the moment
    }

    function handlePost(e) {
        if (
            year === '' ||
            college === '' ||
            quillValue === '' ||
            title === ''
        ) {
            alert('Complete missing fields')
            e.preventDefault()
            console.log('Missing info')
        } else {
            alert('Thank you for your submission!')

            const data = {
                Title: values.Title,
                ParagraphText: values.Description,
                Date: new Date(),
                StudentMajor: values.Major,
                StudentCollege: values.College,
                StudentYear: values.Year,
            }

            console.log(data)

            try {
                // URL_PATH imported from frontend/src/links.js
                // combined with subdirectory to make the full URL
                const subdirectory = '/stories/storysubmission'
                const response = fetch(URL_PATH + subdirectory, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })

                const responseData = response.json()
                console.log('Server response:', responseData)
            } catch (err) {
                console.error(err)
            }
        }
    }

    return (
        <div>
            <div className="background">
                <form
                    className="story-submission-box"
                    onSubmit={verifySubmission}
                >
                    <div class="input-outer-container">
                        <div class="inner-container-box">
                            <div>
                                <DropDownForm
                                    fieldTitle="Year"
                                    myoptions={yearList}
                                    handleChange={handleYearChange}
                                />
                            </div>
                            <div>
                                <DropDownForm
                                    fieldTitle={college ? college : 'College'}
                                    myoptions={[
                                        ...new Set(Object.values(collegeDict)),
                                    ]}
                                    handleChange={handleCollegeChange}
                                />
                            </div>
                        </div>
                        <div class="inner-container-box">
                            <DropDownOptionalForm
                                fieldTitle="Major (optional)"
                                myoptions={Object.keys(collegeDict).sort()}
                                handleChange={handleMajorChange}
                            />
                            <div>
                                <DropDownForm
                                    fieldTitle="Category"
                                    myoptions={categoryList}
                                    handleChange={handleCategoryChange}
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
                                onClick={handlePost}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    {/* </div>   */}
                </form>
            </div>

            {/* </div>   */}
        </div>
    )
}

export default StorySubmission
