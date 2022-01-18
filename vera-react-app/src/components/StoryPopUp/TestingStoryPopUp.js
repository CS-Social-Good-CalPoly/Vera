import React from 'react';
import { StoryPopUp} from '../components'

function TestingStoryPopUp() {
    const relevantResourcesBlank = [ { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, ]
    

    const resourcePageTile = {imageUrl:"https://pyxis.nymag.com/v1/imgs/3d4/0aa/89125115b0e10b94e3378d484712450727-25-thanos.rsquare.w1200.jpg",
     title: 'Suicide Prevention',  info: 'Mock info for an example resource', resourcePageLink: "example.com"}

    const relevantResources = [{resourcePageTile }, {resourcePageTile }, {resourcePageTile }]

    const imageUrl = 'https://pyxis.nymag.com/v1/imgs/3d4/0aa/89125115b0e10b94e3378d484712450727-25-thanos.rsquare.w1200.jpg'
    const altText = "image for story"
    const category = "Family"
    const studentYear = "4th Year"
    const studentMajor = "Chemistry Major"
    const studentCollege = "College of Math & Science"
    const date = "Dec 11, 2020"
    const title = "How My Dog Helps me Through College"
    const storyText = "Some quick example text to build on the card title and make up the bulk ofthe card's content.Some quick example text to build on the card title and make up the bulk ofthe card's content.Some quick example text to build on the card title and make up the bulk ofthe card's content.Some quick example text to build on the card title and make up the bulk ofthe card's content.Some quick example text to build on the card title and make up the bulk ofthe card's content.Some quick example text to build on the card title and make up the bulk ofthe card's content."
    
    return (
        <div>
            <StoryPopUp imageUrl={imageUrl} category={category} altText={altText} studentYear = {studentYear}
            studentMajor = {studentMajor} studentCollege={studentCollege} date = {date} title={title} storyText={storyText} resources={relevantResourcesBlank} />
        </div>
    );
}

export default TestingStoryPopUp;
