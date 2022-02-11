import React, { useState } from 'react';
import { StoryBanner, DropDownForm } from '../components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './StorySubmission.css';

function StorySubmission() {
  const body_text = "There’s a ton of ways to share your story. The most important thing is that you feel safe and comfortable with however you choose to do it. If you’re nervous, try to think beforehand about what you’d like to say, or bang out a draft before you hit ‘post’. If you feel the need to get personal stuff off your chest, find someone you trust to share it with and give yourself as much time as you need.";
  const image_url = "https://res.cloudinary.com/stealthman22/image/upload/v1586308024/new-portfolio/hero/time-lapse-photography-of-waterfalls-during-sunset-210186.jpg"
  const [quillValue, setQuillValue] = useState('');
  

  return (
      <div>
          <StoryBanner bodyText={body_text} imageUrl={image_url}/>
          <DropDownForm fieldTitle="Year"/>
          <DropDownForm fieldTitle="College"/>
          <DropDownForm fieldTitle="Major"/>
          <ReactQuill theme="snow" value={quillValue} onChange={setQuillValue}/>          
      </div>
  );
}

export default StorySubmission;