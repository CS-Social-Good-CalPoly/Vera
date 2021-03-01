import React from 'react'
import './ResourcePageTileGroup.css'

function ResourcePageTileGroup({sectionTitle, id, imageUrls, titles, bodyText, links}) {

    /*
    * sectionTitle: String
    * id: String - section header id
    * imageUrls: [String]
    * titles: [String]
    * bodyText: [String]
    * links: [String] */

    return (
        <div className="ResourcePageTileGroup">
            <h1 id={id}>{sectionTitle}</h1>
            <div className='tile-group'>
                {
                    titles.map((title, index) => (
                            <div className='tiles' key={index}>
                                <p>{imageUrls[index]}</p>
                                <p>{title}</p>
                                <p>{bodyText[index]}</p>
                                <p>{links[index]}</p>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )

}

export default ResourcePageTileGroup;
