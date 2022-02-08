import React from 'react';
import { Banner, IndividualResourceTileGroup} from '../components'

function IndividualResourcePage() {
    const resources = [ { id: 'dog-help', title: 'How My Dog Helps Me Through College', imageUrl: '----------insert an image url here -----------' , studentYear: '4th Year', studentMajor: 'Chemistry Major'}, 
                        { id: 'dog-help', title: 'How My Dog Helps Me Through College', imageUrl: '----------insert an image url here -----------' , studentYear: '4th Year', studentMajor: 'Chemistry Major'},
                        { id: 'dog-help', title: 'How My Dog Helps Me Through College', imageUrl: '----------insert an image url here -----------' , studentYear: '4th Year', studentMajor: 'Chemistry Major'},
                        { id: 'dog-help', title: 'How My Dog Helps Me Through College', imageUrl: '----------insert an image url here -----------' , studentYear: '4th Year', studentMajor: 'Chemistry Major'},
                        { id: 'dog-help', title: 'How My Dog Helps Me Through College', imageUrl: '----------insert an image url here -----------' , studentYear: '4th Year', studentMajor: 'Chemistry Major'},
                        { id: 'dog-help', title: 'How My Dog Helps Me Through College', imageUrl: '----------insert an image url here -----------' , studentYear: '4th Year', studentMajor: 'Chemistry Major'} ]
    
    return (
        <div>
            <Banner imageUrl='https://pyxis.nymag.com/v1/imgs/3d4/0aa/89125115b0e10b94e3378d484712450727-25-thanos.rsquare.w1200.jpg' />
            <IndividualResourceTileGroup id="School" title="School" resources={resources} />
            <IndividualResourceTileGroup id="Community" title="Comunity" resources={resources} />
        </div>
    );
}

export default IndividualResourcePage;
