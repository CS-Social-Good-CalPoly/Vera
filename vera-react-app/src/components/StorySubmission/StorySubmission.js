import React, { useState} from 'react';
import { DropDownForm, DropDownOptionalForm } from '../components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './StorySubmission.css';

function StorySubmission() {
  values = []

  const [answers, setAnswers] = useState(values)

  const handleAddAnswers = (input, answer) => {
    setAnswers((prevAnswers) => {
      ...prevAnswers,

    })
  }


  const [quillValue, setQuillValue] = useState('');

  const collegeList = ["Agriculture, Food and Environmental Sciences", 
    "Architecture and Environmental Design",
    "Engineering",
    "Liberal Arts",
    "Science and Mathematics",
    "Business"]
  
  const yearList = ["1st Year", "2nd Year","3rd Year", "4th Year", "5th+ Year"]

  const majorList = ["CSC" ,"SE", "Other"]


  
  function clickMe() {
    alert("You clicked me!");
  }


  function verifySubmission() {
    // if year != "Year"
    // and if college != "College" -> alert , else deny submission
    alert("Thank you for your submission!");

    
    // alert("Your missing some fields");
  }
  return (
      <div>
          <div className="background">
            <form className="story-submission-box">
              {/* <div className="story-submission-box"> */}
                <div className="row1">
                  <DropDownForm fieldTitle="Year" myoptions={yearList} vals={values}/>
                </div>
                <div className="row2">
                  <div className="college-box"> 
                    <DropDownForm fieldTitle="College" myoptions={collegeList} vals={values}/>
                  </div>
                  <div className="major-box"> 
                    <DropDownOptionalForm fieldTitle="Major (optional)" myoptions={majorList} vals={values}/>
                  </div> 
                </div>
                <div className="description-box"> 
                  <div className="title-text">
                    Short Description
                  </div>
                  <ReactQuill theme="snow" value={quillValue} onChange={setQuillValue}/> 
                  <div className="button-wrapper">
                    {/* <div className="button" onClick={clickMe}>Submit</div> */}
                    <input className="button" type="submit" onClick={verifySubmission} value="Submit"/>
                  </div>
                </div> 
              {/* </div>   */}
            </form>      
          </div>
      </div>
  );
}

export default StorySubmission;