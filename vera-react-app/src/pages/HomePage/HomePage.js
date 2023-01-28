import React from 'react';
import './HomePage.css';
import bg from '../../components/Banner/bannerBackground.jpg';
import { Banner, CategoryButtonGroup, ResourcePageTileGroup} from '../../components/components'

function HomePage() {
    const categorNames = ['Support', 'Stress']
    const categorLocs = ['Support', 'Stress']
    const resourceSupport = [ { id: 'general-stress', title: 'General Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, ]
    const resourceStress = [ { id: 'general-stress', title: 'General Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, { id: 'chronic-stress', title: 'Chronic Stress', imageUrl: '----------insert an image url here -----------' }, ]
    return (
        <div>
            <Banner imageUrl= {bg} words = "bruh"/>
            <CategoryButtonGroup title='Categories' names={categorNames} locations={categorLocs}/>
            <ResourcePageTileGroup id="Support" title="Support" resources={resourceSupport} />
            <ResourcePageTileGroup id="Stress" title="Stress" resources={resourceStress} />
        </div>
    );
}

export default HomePage;
