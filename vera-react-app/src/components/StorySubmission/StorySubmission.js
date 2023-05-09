import React, { useState} from 'react';
import { DropDownForm, DropDownOptionalForm } from '../components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './StorySubmission.css';

function StorySubmission() {

  const [year, setYear] = useState("")
  const [college, setCollege] = useState("")
  const [major, setMajor] = useState("")
  const [quillValue, setQuillValue] = useState('');
  const [title, setTitleValue] = useState("Enter title");

  const values = {
    "Year" : year,
    "College" : college,
    "Major" : major,
    "Description" : quillValue
  }

  const fakeInput = "Enter title"

  const handleTitleKeyPress = (e) => {
    if(e.key === "\t" && e.value === ""){
      e.preventDefault()
      setTitleValue(fakeInput)
      
    }
    setTitleValue(e.value)
  }
  
  const handleTitleClick = (e) => {
    if (title === "Enter title") {
      setTitleValue('');
    }
  }

  const handleYearChange = (e) => {
    setYear(e);
  }
  
  const handleCollegeChange = (e) => {
    setCollege(e);
  }
  
  const handleMajorChange = (e) => {
    setMajor(e);
  }

  const handleTitleChange = (e) => {
    setTitleValue(e.value);
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
                    {/* figure out way to temporary  text when no text typed yet - ie 3 states state 1 'enter text ' once u click text goes away, but state stays, then once starts typing- final state*/}
                    <input
                      className='inputBar'
                      type="text"
                      value={title}
                      onClick={handleTitleClick}
                      onFocus={handleTitleClick}
                      onKeyPress={handleTitleKeyPress}
                      onChange={handleTitleChange}
                    />

                  </div>
                  <ReactQuill theme="snow" value={quillValue} onChange={setQuillValue}/> 
                  <div className="button-wrapper">
                    <input className="button" type="submit" value="Submit"/>
                  </div>
                </div> 
              {/* </div>   */}
            </form>      
          </div>
      </div>
  );
}

export default StorySubmission;
