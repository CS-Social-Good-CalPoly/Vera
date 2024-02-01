import React, { useState, useEffect } from 'react';
import { DropDownForm, DropDownOptionalForm } from '../components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './StorySubmission.css';
import axios from 'axios';
import cheerio from 'cheerio';
// const cheerio = require('cheerio');
// const scrapeWebsite = require('./scrapeWebsite.cjs');

function StorySubmission() {
    const [year, setYear] = useState('');
    const [college, setCollege] = useState('');
    const [major, setMajor] = useState('');
    const [quillValue, setQuillValue] = useState('');
    const [title, setTitleValue] = useState('');
    const [collegeList, setCollegeList] = useState([]);
    const [majorList, setMajorList] = useState([]);

    const values = {
        Year: year,
        College: college,
        Major: major,
        Description: quillValue,
    };

    const handleTitleKeyPress = (e) => {
        setTitleValue(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e);
    };

    const handleCollegeChange = (e) => {
        setCollege(e);
    };

    const handleTitleChange = (e) => {
        setTitleValue(e.target.value);
    };

    const handleMajorChange = (e) => {
        setMajor(e);
    };

    useEffect(() => {
    axios.get('https://www.calpoly.edu/colleges-departments-and-majors')
    .then(res => {
    const $ = cheerio.load(res.data);
    const college_lst = [];
    const major_lst = [];

    // Select each h2 tag
    $('h2').each((index, element) => {
        // Get the text content of the h2 tag
        const h2Text = $(element).text();
        
        // Check if the text content contains the word "college"
        if (h2Text.toLowerCase().includes('college')) {
            college_lst.push(h2Text);
        }
    });
    setCollegeList(college_lst);

    $('a').each((index, element) => {
        // Get the text content of the h2 tag
        const aText = $(element).text();
        
        // Check if the text content contains the word "college"
        if (aText.toLowerCase().includes('major') && aText !== "Find a major") {
            console.log(aText);
            major_lst.push(aText);
        }
    });
    setMajorList(major_lst);

    })
    .catch(err => console.error(err));
    }, []);

    const yearList = [
        '1st Year',
        '2nd Year',
        '3rd Year',
        '4th Year',
        '5th+ Year',
    ];

    function verifySubmission(e) {
        // if an option is selected, the value is stored as 1 at the moment
    }

    async function handlePost(e) {
        e.preventDefault();
        if (
            year === '' ||
            college === '' ||
            quillValue === '' ||
            title === ''
        ) {
            alert('Complete missing fields');
            console.log('Missing info');
            return;
        }
    
        try {
            const data = {
                Title: 'My Story Title',
                ParagraphText: values.Description,
                Date: new Date(),
                StudentMajor: values.Major,
                StudentCollege: values.College,
                StudentYear: values.Year,
            };
    
            const response = await fetch('http://localhost:3001/stories/storysubmission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const responseData = await response.json();
            console.log('Server response:', responseData);
            alert('Thank you for your submission!');
        } catch (err) {
            console.error('Error submitting data:', err);
            alert('Error submitting data. Please try again later.');
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
                                    fieldTitle="College"
                                    myoptions={collegeList}
                                    handleChange={handleCollegeChange}
                                />
                            </div>
                        </div>
                        <div class="inner-container-box">
                            <DropDownOptionalForm
                                fieldTitle="Major (optional)"
                                myoptions={majorList}
                                handleChange={handleMajorChange}
                            />
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

export default StorySubmission;
