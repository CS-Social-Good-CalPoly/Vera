import './LandingPage.css'
import cp from '../../components/LandingBanner/calpoly.jpg'
import resource_img from '../../components/PhotoBanner/plant_hand.jpg'
import stories from '../../components/PhotoBanner/stories.jpg'

import { 
    LandingBanner,
    PhotoBanner,
    TextBanner
} from '../../components/components.js'
import '../../links.js'

function LandingPage(){

  return (
    <div className='landing-page'>
      <LandingBanner
      imageUrl={cp}
      pageTitle="A Student-driven Hub for Mental Wellness."
      />
      <TextBanner 
        background='#48858D'
        color='white'
        title='Our Mission'
        bodyText="We're dedicated to improving accessibility by providing a comprehensive directory of campus resources, ensuring that every student can easily access the support they need. Further, we aim to foster a culture of openness and understanding through our shared stories platform to ultimately break the stigma around mental health."
        buttonTitles= {['LEARN MORE','STORIES']}
        buttonLinks={{'LEARN MORE':'/resources', 'STORIES':'/stories'}}
        buttonColor='#48858D'
        buttonBackground='white'
      />
      <PhotoBanner 
        background='#728D95'
        color='#DCE3E7'
        title='RESOURCES'
        bodyText="Discover the diverse array of resources readily available through Cal Poly, providing you with up-to-date and valuable information for your needs."
        buttonTitles= {['RESOURCES']}
        buttonLinks={{'RESOURCES':'/resources'}}
        buttonColor='#728D95'
        buttonBackground='#DCE3E7'
        imageUrl={resource_img}
        bannerOrder={['text', 'photo']}
      />
      <PhotoBanner 
        background='#DCE3E7'
        color='#48858D'
        title='STORIES'
        bodyText="Dive into a collection of inspiring experiences, empowering users to contribute their stories and find solace in the shared narratives of others."
        buttonTitles= {['STORIES', 'SHARE YOUR STORY']}
        buttonLinks={{'STORIES':'/stories', 'SHARE YOUR STORY':'/storySubmission'}}
        buttonColor='#DCE3E7'
        buttonBackground='#48858D'
        imageUrl={stories}
        bannerOrder={['photo','text']}
      />
    </div>
  )
}

export default LandingPage