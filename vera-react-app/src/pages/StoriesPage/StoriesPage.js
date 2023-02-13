import React from 'react';
import { StoryBanner, CategoryButtonGroup, StoryTileGroup} from '../../components/components'
import mockStoryFamily from './mockStoryFamily.json';
import mockStorySchool from './mockStorySchool.json';

function StoriesPage() {
    const categorNames = ['Family', 'School', 'Food', 'Clubs']
    const categorLocs = ['Family', 'School']
    const storyFamily = mockStoryFamily
    const resourceStress = mockStorySchool
    
    return (
        <div>
            <StoryBanner imageUrl='https://images.unsplash.com/photo-1506962240359-bd03fbba0e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2065&q=80' displayButton='true'/>
            <CategoryButtonGroup title='Categories' names={categorNames} locations={categorLocs}/>
            <StoryTileGroup id="Family" title="Family" stories={storyFamily} />
            <StoryTileGroup id="School" title="School" stories={resourceStress} />
        </div>
    );
}

export default StoriesPage;
