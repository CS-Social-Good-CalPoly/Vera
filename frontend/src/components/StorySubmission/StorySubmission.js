import React, { useState, useEffect } from 'react'
import { DropDownForm, DropDownOptionalForm } from '../components'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './StorySubmission.css'
import axios from 'axios'
import cheerio from 'cheerio'
import URL_PATH from '../../links'
import Select from 'react-select';

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
    //use for put
    const [storyId, setStoryId] = useState([])

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
        const cat = categories.find((c) => c.Title === categoryName);
        return cat ? cat._id : null;
    };

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
        console.log("selected:", categoryIds)
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

    // useEffect(() => {
    //     axios
    //         .get('https://www.calpoly.edu/colleges-departments-and-majors')
    //         .then((res) => {
    //             const $ = cheerio.load(res.data)
    //             const college_dict = {}

    //             // Select each h2 tag
    //             $('h2').each((index, element) => {
    //                 // Get the text content of the h2 tag
    //                 const college_name = $(element).text().trim()
    //                 if (college_name.toLowerCase().includes('college')) {
    //                     // Get the section, stopping at the next h2 which should be the college
    //                     const $collegeSection = $(element).nextUntil('h2')

    //                     // Iterate over each HTML a element within this section
    //                     $collegeSection.find('a').each((index, element) => {
    //                         // Get the text content of the a tag
    //                         const major_name = $(element).text().trim()

    //                         if (
    //                             major_name.toLowerCase().includes('major') &&
    //                             major_name !== 'Find a major'
    //                         ) {
    //                             // Create key/value pair; keys = majors, values = colleges
    //                             // Note: keys are unique, colleges duplicate
    //                             college_dict[
    //                                 major_name.replace('Major', '').trim()
    //                             ] = college_name
    //                         }
    //                     })
    //                 }
    //             })
    //             setCollegeDict(college_dict)
    //         })
    //         .catch((err) => console.error(err))
    // }, [])

    useEffect(() => {
        axios
            .get(URL_PATH + '/stories/generalstorycat')
            .then((res) => {
                const category_names_lst = res.data.map((item) => item.Title)
                const category_lst = res.data.map((item) => item)
                console.log(category_names_lst)
                console.log(category_lst)
                setCategoryNamesList(category_names_lst)
                setCategoryList(category_lst)
            })
            .catch((err) => console.error(err))
    }, [])

    // react-select Select takes value and label objects as category options
    const categoryOptions = categoryList.map(category => ({
        value: category._id,
        label: category.Name
    }));

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
            e.preventDefault()

            // Create token if the story successfully submits
            axios.get(URL_PATH + '/stories/generate-token').then((res) => {
                const newToken = res.data
                console.log(res.data)
                setTokenValue(newToken)

                alert(
                    'Thank you for your submission!\nYour token is: ' +
                        newToken,
                )
                console.log(categoryIds)
                const postData = {
                    Title: values.Title,
                    ParagraphText: values.Description,
                    Date: new Date(),
                    StudentMajor: values.Major,
                    StudentCollege: values.College,
                    StudentYear: values.Year,
                    RelevantCategoryList: categoryIds.flatMap(innerArray =>
                        innerArray.map(category => category.value)),
                }

                console.log(postData)
                const subdirectory = '/stories/storysubmission'
                fetch(URL_PATH + subdirectory, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData),
                })
                    .then((postResponse) => postResponse.json())
                    .then((postRes) => {
                        const storyId = postRes._id;
                        const categoryList = postRes.RelevantCategoryList;
                      
                        // Create an array of promises for each PUT request
                        const putPromises = categoryList.map(categoryId => {
                          const putData = { categoryId, storyId };
                          return fetch(URL_PATH + '/stories/generalstorycat', {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(putData),
                          })
                          .then(putResponse => putResponse.json())
                          .catch(err => console.error(err));
                        });
                      
                        // Wait for all PUT requests to complete
                        Promise.all(putPromises)
                          .then(() => {
                            // All PUT requests completed successfully
                            // Refresh the page after all asynchronous operations are complete
                            window.location.reload();
                            window.scrollTo(0, 0);
                          })
                            .catch((err) => console.error(err))
                    })
                    .catch((err) => console.error(err))
            })
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
                                    key={major}
                                    fieldTitle={college ? college : 'College'}
                                    myoptions={[
                                        ...new Set(Object.values(collegeDict)),
                                    ]}
                                    handleChange={handleCollegeChange}
                                    disabled={isCollegeDropdownDisabled}
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
                                {/* <DropDownForm
                                    fieldTitle="Category"
                                    myoptions={categoryNamesList}
                                    handleChange={handleCategoryChange}
                                /> */}
                                <Select
                                    options={categoryOptions}
                                    isMulti
                                    onChange={(selectedOptions) => {
                                        const selectedIds = selectedOptions.map(option => option.value);
                                        handleCategoryChange(selectedOptions);
                                    }}
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
export default StorySubmission;
