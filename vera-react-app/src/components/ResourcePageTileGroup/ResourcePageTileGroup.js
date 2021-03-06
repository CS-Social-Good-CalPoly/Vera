import React from 'react'
import './ResourcePageTileGroup.css'

function ResourcePageTileGroup({id, title, resources}) {

    /*
    * id: String - section header id
    * title: String - section title
    * resources: Array of objects
    *   -> objects defined as
    *       {
    *        id title imageURL
    *       }
     */

    return (
        <div className="ResourcePageTileGroup">
            <h1 id={id}>{title}</h1>
            <div className="tile-group">
                {
                    resources.map(
                        (resource, index) => (
                            <div className="tiles" key={index}>
                                <p>{resource.id}</p>
                                <p>{resource.title}</p>
                                <p>{resource.imageUrl}</p>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )

}

export default ResourcePageTileGroup;
