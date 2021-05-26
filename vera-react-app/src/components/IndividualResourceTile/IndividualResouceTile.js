import React, { useState } from "react";
import IndividualResourceTileCollapsed from "./IndividualResourceTileCollapsed";
import IndividualResourceTileExpanded from "./IndividualResourceTileExpanded";

function IndividualResourceTile(props) {

    const [expanded, setExpanded] = useState(false);

    const handleChange = () => setExpanded(!expanded);

    // if expanded == true, return the expanded tile
    // else, return the collapsed tile
    return expanded ? (
        <IndividualResourceTileExpanded
            title={props.resource.title}
            buildingName={props.resource.buildingName}
            address={props.resource.address}
            description={props.resource.description}
            toExpect={props.resource.toExpect}
            phone={props.resource.phone}
            hours={props.resource.hours}
            link={props.resource.link}
            imgUrl={props.resource.imgUrl}
            handleChange={handleChange}
        />
    ) : (
        <IndividualResourceTileCollapsed
            title={props.resource.title}
            infoText={props.resource.description}
            imageUrl={props.resource.imgUrl}
            handleChange={handleChange}
        />
    );
}

export default IndividualResourceTile;
