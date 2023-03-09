import React, { useState} from 'react';
import { DropDownForm } from '../components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './StorySubmission.css';

function StorySubmission() {
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

  return (
      <div>
          <div className="background">
            <div className="story-submission-box">
              <div className="row1">
                <DropDownForm fieldTitle="Year" myoptions={yearList} />
              </div>
              <div className="row2">
                <div className="college-box"> 
                  <DropDownForm fieldTitle="College" myoptions={collegeList}/>
                </div>
                <div className="major-box"> 
                  <DropDownForm fieldTitle="Major" myoptions={majorList}/>
                </div> 
              </div>
              <div className="description-box"> 
                <div className="title-text">
                  Short Description
                </div>
                <ReactQuill theme="snow" value={quillValue} onChange={setQuillValue}/> 
                <div className="button-wrapper">
                  <div className="button" onClick={clickMe}>Submit</div>
                </div>
              </div> 
            </div>        
          </div>
      </div>
  );
}

export default StorySubmission;