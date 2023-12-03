import React from 'react'

import {ResourcePageTile} from '../components'

function ResourcePageTileGroup({ id, title, resources }) {
    
    return (

        <div className="row">
            {resources.map((resource, index) => (
                <div className="col-6" style={{paddingLeft: 0, paddingRight: 0}}>
                <ResourcePageTile
                    key={index}
                    infoText={resource?.LongDescription || 'No description available'}
                    title={resource?.Title || 'Untitled'}
                    imageUrl={resource?.ImageURL || ''}
                />
                </div>
            ))}
        </div>

    );
}

export default ResourcePageTileGroup;
