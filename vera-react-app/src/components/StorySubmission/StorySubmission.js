import React, { useState, useEffect} from 'react';
import { DropDownForm, DropDownOptionalForm } from '../components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './StorySubmission.css';

function StorySubmission() {
  const [year, setYear] = useState("")
  const [college, setCollege] = useState("")
  const [major, setMajor] = useState("")
  const [quillValue, setQuillValue] = useState('');

  const values = {
    "Year" : year,
    "College" : college,
    "Major" : major,
    "Description" : quillValue
  }
  
  const handleYearChange = (e) => {
    console.log(e);
    setYear(e);
  }
  
  const handleCollegeChange = (e) => {
    console.log(e);
    setCollege(e);
  }
  
  const handleMajorChange = (e) => {
    setMajor(e);
  }

  const collegeList = ["Agriculture, Food and Environmental Sciences", 
    "Architecture and Environmental Design",
    "Engineering",
    "Liberal Arts",
    "Science and Mathematics",
    "Business"]
  
  const yearList = ["1st Year", "2nd Year","3rd Year", "4th Year", "5th+ Year"]

  const majorList = ["CSC" ,"SE", "Other"]

  function verifySubmission(e) {
    // if an option is selected, the value is stored as 1 at the moment
    if(year === '' || year !== '1' || college === '' || college !== '1' || quillValue === ''){
      alert("Complete missing fields")
      console.log("Missing info")
      e.preventDefault();
    } else {
      alert("Thank you for your submission!");
    }

  }
  useEffect(() => {
    const button = document.getElementById("submitButton");

    if (button) {
      button.addEventListener("click", async function (e) {
        console.log("button was clicked");

        const data = {
          Title: "My Story Title",
          ParagraphText: "The main text content of my story",
          Date: new Date(),
          StudentMajor: "Computer Science",
          StudentCollege: "Engineering",
          StudentYear: "Junior"
        };

        console.log(data);

        try {
          const response = await fetch("http://localhost:3001/stories/storysubmission", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
  
          const responseData = await response.json();
          console.log("Server response:", responseData);
        } catch (err) {
          console.error(err);
        }
      });
    }
  }, []);
  
  return (
      <div>
          <div className="background">
            <form className="story-submission-box" onSubmit={verifySubmission}>
              {/* <div className="story-submission-box"> */}
                <div className='inputs'>
                  <div className="row1">
                      <DropDownForm fieldTitle="Year" myoptions={yearList} handleChange={handleYearChange}/> 
                      <DropDownForm fieldTitle="College" myoptions={collegeList} handleChange={handleCollegeChange}/>
                  </div>
                  <div className="row1" id="option">
                      <DropDownOptionalForm fieldTitle="Major (optional)" myoptions={majorList} handleChange={handleMajorChange}/>
                  </div>
                </div>
                <div className="description-box"> 
                  <div className="title-text">
                    Short Description
                  </div>
                  <ReactQuill theme="snow" value={quillValue} onChange={setQuillValue}/> 
                  <div className="button-wrapper">
                    <button id="submitButton">Submit</button>
                  </div>
                </div> 
              {/* </div>   */}
            </form>      
          </div>
      </div>
  );
}

export default StorySubmission;
