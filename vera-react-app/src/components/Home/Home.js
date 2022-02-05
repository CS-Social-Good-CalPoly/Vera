import React from 'react';
import './Home.css';
import { Banner, CategoryButtonGroup, ResourcePageTileGroup} from '../components'

function Home() {
    const categorNames = ['Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.', 'Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.Very long name to test whether or not the text can actually fit inside this box or not.']
    const categorLocs = ['Support', 'Stress']
    const resourceSupport = [ { id: 'general-stress', title: 'General Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, ]
    const resourceStress = [ { id: 'general-stress', title: 'General Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, ]
    return (
        <div>
            <Banner imageUrl='https://pyxis.nymag.com/v1/imgs/3d4/0aa/89125115b0e10b94e3378d484712450727-25-thanos.rsquare.w1200.jpg' />
            <CategoryButtonGroup title='Categories' names={categorNames} locations={categorLocs}/>
            <ResourcePageTileGroup id="Support" title="Support" resources={resourceSupport} />
            <ResourcePageTileGroup id="Stress" title="Stress" resources={resourceStress} />
        </div>
    );
}

export default Home;
