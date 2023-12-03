import React from 'react'
import {
    TileGroupDiv,
    TitleContainer,
    Heading,
    TileGroup
} from '../Shared/TileGroup'
import {ResourcePageTile} from '../components'

function ResourcePageTileGroup({ id, title, resources }) {
    
    // return (

    //     <div className="row">
    //         {resources.map((resource, index) => (
    //             <div className="col-6" style={{paddingLeft: 0, paddingRight: 0}}>
    //             <ResourcePageTile
    //                 key={index}
    //                 infoText={resource?.LongDescription || 'No description available'}
    //                 title={resource?.Title || 'Untitled'}
    //                 imageUrl={resource?.ImageURL || ''}
    //             />
    //             </div>
    //         ))}
    //     </div>

    // );

    return (
        <TileGroupDiv>
            <TitleContainer>
                <Heading id={id}>{title}</Heading>
            </TitleContainer>
            <TileGroup>
                {resources.map((resource, index) => 
                    
                     <ResourcePageTile key={index}
                        infoText={resource.LongDescription}
                        title={resource.Title}
                        imageUrl={resource.ImageURL}
                        individualIDs={resource.ResourceIDList}
                    />
                )}
            </TileGroup>
        </TileGroupDiv>
    );
}

export default ResourcePageTileGroup;
