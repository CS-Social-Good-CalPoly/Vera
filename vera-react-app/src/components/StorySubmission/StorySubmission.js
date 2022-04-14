import React, { useState} from 'react';
import { StoryBanner, DropDownForm } from '../components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './StorySubmission.css';
import {
  PageTitle,
} from '../Shared/Fonts/PageTitle'

function StorySubmission() {
  const body_text = "There’s a ton of ways to share your story. The most important thing is that you feel safe and comfortable with however you choose to do it. If you’re nervous, try to think beforehand about what you’d like to say, or bang out a draft before you hit ‘post’. If you feel the need to get personal stuff off your chest, find someone you trust to share it with and give yourself as much time as you need.";
  const image_url = "https://res.cloudinary.com/stealthman22/image/upload/v1586308024/new-portfolio/hero/time-lapse-photography-of-waterfalls-during-sunset-210186.jpg"
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
          <StoryBanner bodyText={body_text} imageUrl={image_url}/>
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