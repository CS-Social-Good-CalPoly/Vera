import React from 'react';
import { Banner, CategoryButtonGroup, StoryTileGroup} from '../components'

function StoryPage() {
    const categorNames = ['Family', 'School']
    const categorLocs = ['Family', 'School']
    const storyFamily = [ { id: 'dog-help', title: 'How My Dog Helps Me Through College', imageUrl: '----------insert an image url here -----------' , studentYear: '4th Year', studentMajor: 'Chemistry Major'}, 
                        { id: 'dog-help', title: 'How My Dog Helps Me Through College', imageUrl: '----------insert an image url here -----------' , studentYear: '4th Year', studentMajor: 'Chemistry Major'},
                        { id: 'dog-help', title: 'How My Dog Helps Me Through College', imageUrl: '----------insert an image url here -----------' , studentYear: '4th Year', studentMajor: 'Chemistry Major'},
                        { id: 'dog-help', title: 'How My Dog Helps Me Through College', imageUrl: '----------insert an image url here -----------' , studentYear: '4th Year', studentMajor: 'Chemistry Major'},
                        { id: 'dog-help', title: 'How My Dog Helps Me Through College', imageUrl: '----------insert an image url here -----------' , studentYear: '4th Year', studentMajor: 'Chemistry Major'},
                        { id: 'dog-help', title: 'How My Dog Helps Me Through College', imageUrl: '----------insert an image url here -----------' , studentYear: '4th Year', studentMajor: 'Chemistry Major'} ]
    const resourceStress = [{ id: '', title: '', imageUrl: '', studentYeaer: '', studentMajor: ''}, { id: '', title: '', imageUrl: '', studentYeaer: '', studentMajor: ''},
    { id: '', title: '', imageUrl: '', studentYeaer: '', studentMajor: ''}]
    
    return (
        <div>
            <Banner imageUrl='https://pyxis.nymag.com/v1/imgs/3d4/0aa/89125115b0e10b94e3378d484712450727-25-thanos.rsquare.w1200.jpg' />
            <CategoryButtonGroup title='Categories' names={categorNames} locations={categorLocs}/>
            <StoryTileGroup id="Family" title="Family" stories={storyFamily} />
            <StoryTileGroup id="School" title="School" stories={resourceStress} />
        </div>
    );
}

export default StoryPage;
