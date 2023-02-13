import React from 'react';
import { StoryBanner, StorySubmission } from '../../components/components'

function StorySubmissionPage() {
    
    return (
        <div>
            <StoryBanner displayButton='false' imageUrl='https://pyxis.nymag.com/v1/imgs/3d4/0aa/89125115b0e10b94e3378d484712450727-25-thanos.rsquare.w1200.jpg' />
            <StorySubmission/>
        </div>
    );
}

export default StorySubmissionPage;
