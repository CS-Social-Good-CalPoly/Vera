import React from 'react';
import './HomePage.css';
import bg from '../../components/Banner/bannerBackground.jpg';
import veraLogo from '../../components/Banner/draftLogo.png';
import { Banner, CategoryButtonGroup, ResourcePageTileGroup} from '../../components/components'
import mockFinSupportData from './mockFinSupportData.json';
import mockPreventionData from './mockPreventionData.json';
import mockStressData from './mockStressData.json';

function HomePage() {
    const categorNames = ['Stress', 'Financial Support', 'Suicide Prevention']
    const categorLocs = ['Stress', 'Financial Support', 'Suicide Prevention']
    const resourceSupport = mockFinSupportData;
    const resourceSuicidePrevention = mockPreventionData;
    const resourceStress = mockStressData;

    return (
        <div>
            <Banner imageUrl= {bg} pageTitle = "Resources" tagline1="Created by Calpoly students," tagline2="for Calpoly students" logo={veraLogo}/>
            <CategoryButtonGroup title='Categories' names={categorNames} locations={categorLocs}/>
            <ResourcePageTileGroup id="Stress" title="Stress" resources={resourceStress} />
            <ResourcePageTileGroup id="Financial Support" title="Financial Support" resources={resourceSupport} />
            <ResourcePageTileGroup id="Suicide Prevention" title="Suicide Prevention" resources={resourceSuicidePrevention} />
        </div>
    );
}

export default HomePage;
