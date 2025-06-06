import React, { useState } from 'react'
import IndividualResourceTileCollapsed from './IndividualResourceTileCollapsed.js'
import IndividualResourceTileExpanded from './IndividualResourceTileExpanded.jsx'

function IndividualResourceTile(props) {
    const [expanded, setExpanded] = useState(false)

    const handleChange = () => {
        props.handleChange(expanded, props.id)
        setExpanded(!expanded)
    }

    // if expanded == true, return the expanded tile
    // else, return the collapsed tile
    return expanded ? (
        <IndividualResourceTileExpanded
            title={props.title}
            buildingName={props.buildingName}
            address={props.address}
            description={props.description}
            extraInfo={props.extraInfo}
            phone={props.phone}
            hours={props.hours}
            link={props.link}
            imgUrl={props.imgUrl}
            handleChange={handleChange}
            id={props.id}
        />
    ) : (
        <IndividualResourceTileCollapsed
            title={props.title}
            infoText={props.description}
            imageUrl={props.imgUrl}
            handleChange={handleChange}
            id={props.id}
        />
    )
}

export default IndividualResourceTile
