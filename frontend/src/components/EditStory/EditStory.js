import React, { useState, useEffect } from 'react';
import URL_PATH from '../../links.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import { DropDownForm, DropDownOptionalForm } from '../components.js';
import axios from 'axios';
import '../StorySubmission/StorySubmission.css';

function EditStoryPopUp({ onClose, onPost, story }) {
    const [title, setTitle] = useState((story?.Title || '').toUpperCase());
    const [quillValue, setQuillValue] = useState(story?.ParagraphText || '');
    const [year, setYear] = useState(story?.StudentYear || '');
    const [college, setCollege] = useState(story?.StudentCollege || '');
    const [major, setMajor] = useState(story?.StudentMajor || '');
    const [categories, setCategories] = useState([]);
    const [collegeDict, setCollegeDict] = useState({});
    const [categoryList, setCategoryList] = useState([]);

    // Fetch college/major and category data on mount
    useEffect(() => {
        axios
            .get(URL_PATH + '/stories/colleges-and-majors')
            .then((res) => setCollegeDict(res.data))
            .catch((err) => console.error(err));

        axios
            .get(URL_PATH + '/stories/generalstorycat')
            .then((res) => {
                setCategoryList(res.data);
                // Map existing story categories to react-select format
                if (story?.RelevantCategoryList?.length > 0) {
                    const selectedCategories = res.data
                        .filter((cat) =>
                            story.RelevantCategoryList.includes(cat._id)
                        )
                        .map((cat) => ({ value: cat._id, label: cat.Title }));
                    setCategories(selectedCategories);
                }
            })
            .catch((err) => console.error(err));
    }, [story]);

    // Dropdown options
    const yearList = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th+ Year'];
    const collegeOptions = [...new Set(Object.values(collegeDict))];
    const majorOptions = Object.keys(collegeDict).sort();
    const categoryOptions = categoryList.map((category) => ({
        value: category._id,
        label: category.Title,
    }));

    // Custom styles matching StorySubmission
    const customStyles = {
        control: (provided) => ({
            ...provided,
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
        }),
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !quillValue) {
            alert('Title and story content are required.');
            return;
        }
        const updatedStory = {
            Title: title,
            ParagraphText: quillValue,
            StudentYear: year,
            StudentCollege: college,
            StudentMajor: major,
            RelevantCategoryList: categories.map((cat) => cat.value),
            Token: story.Token, // Preserve existing token
        };
        onPost(updatedStory);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value.toUpperCase());
    };

    return (
        <div
            className="popup-overlay"
            style={{
                position: 'fixed',  // Ensures the blur covers the full screen
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backdropFilter: 'blur(3px)',  // Stronger blur
                backgroundColor: 'rgba(255, 255, 255, 0.7)', // Lighter white
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div
                className="popup-container story-submission-box"
                style={{
                    borderRadius: '20px',
                    maxHeight: '80vh',
                    width: '90vw',
                    maxWidth: '1200px',
                    minWidth: '300px',
                    padding: '30px',
                    overflowY: 'auto',
                    position: 'relative',
                }}
            >
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-outer-container">
                        <div className="inner-container-box">
                            <DropDownForm
                                fieldTitle="Year"
                                myoptions={yearList}
                                handleChange={setYear}
                                value={year}
                                disabled={true} // Read-only
                            />
                            <DropDownForm
                                fieldTitle="College"
                                myoptions={collegeOptions}
                                handleChange={setCollege}
                                value={college}
                                disabled={true} // Read-only
                            />
                        </div>
                        <div className="inner-container-box">
                            <DropDownOptionalForm
                                fieldTitle="Major (optional)"
                                myoptions={majorOptions}
                                handleChange={setMajor}
                                value={major}
                                disabled={true} // Read-only
                            />
                            <Select
                                styles={customStyles}
                                options={categoryOptions}
                                placeholder="Categories"
                                isMulti
                                value={categories}
                                isDisabled={true} // Read-only
                            />
                        </div>
                    </div>

                    <div className="description-box">
                        <input
                            className="inputBar"
                            placeholder="Enter title"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />
                        <ReactQuill
                            theme="snow"
                            value={quillValue}
                            onChange={setQuillValue}
                        />
                        <div className="button-wrapper">
                            <button
                                type="button"
                                className="button"
                                onClick={onClose}
                                style={{
                                    backgroundColor: '#B7CAD4',
                                    marginRight: '10px',
                                }}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="button">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditStoryPopUp;