import React from 'react';
import { StoryBanner, CategoryButtonGroup, StoryTileGroup} from '../../components/components'
import mockStoryFamily from './mockStoryFamily.json';

function StoriesPage() {
    const categorNames = ['Family', 'School']
    const categorLocs = ['Family', 'School']
    const storyFamily = mockStoryFamily
    const resourceStress = [{ id: '', title: '', imageUrl: '', studentYeaer: '', studentMajor: ''}, { id: '', title: '', imageUrl: '', studentYeaer: '', studentMajor: ''},
    { id: '', title: '', imageUrl: '', studentYeaer: '', studentMajor: ''}]
    
    return (
        <div>
            <StoryBanner imageUrl='https://pyxis.nymag.com/v1/imgs/3d4/0aa/89125115b0e10b94e3378d484712450727-25-thanos.rsquare.w1200.jpg' displayButton='true'/>
            <CategoryButtonGroup title='Categories' names={categorNames} locations={categorLocs}/>
            <StoryTileGroup id="Family" title="Family" stories={storyFamily} />
            <StoryTileGroup id="School" title="School" stories={resourceStress} />
        </div>
    );
}

export default StoriesPage;
