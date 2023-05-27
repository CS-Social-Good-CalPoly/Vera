import React, { useState, useEffect} from "react";
import IndividualResourceTileCollapsed from "./IndividualResourceTileCollapsed";
import IndividualResourceTileExpanded from "./IndividualResourceTileExpanded";

import TruncateText from "./TruncateText";

function IndividualResourceTile(props) {
    const [maxContainerWidthPx, setMaxContainerWidthPx] = useState(0)

    useEffect(() => {
        let width = 0
        const handleResize = () => {
            width = window.innerWidth;
            if (width < 0) {
                setMaxContainerWidthPx(0);
            } else if (width > 0 && width < 769) {
                setMaxContainerWidthPx(46);
            } else if (width >= 769 && width < 2000) {
                setMaxContainerWidthPx(90);
            } else {
                setMaxContainerWidthPx(2000);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    });

    const [expanded, setExpanded] = useState(false);

    const handleChange = () => setExpanded(!expanded);

    // if expanded == true, return the expanded tile
    // else, return the collapsed tile
    return expanded ? (
        <IndividualResourceTileExpanded
            title={props.title}
            buildingName={props.buildingName}
            address={props.address}
            description={props.description}
            toExpect={props.toExpect}
            phone={props.phone}
            hours={props.hours}
            link={props.link}
            imgUrl={props.imgUrl}
            handleChange={handleChange}
        />
    ) : (
        <IndividualResourceTileCollapsed
            title={props.title}
            infoText=
            {<TruncateText text={props.description} factor={3.1} maxLines={4} containerWidth={maxContainerWidthPx} />}
            imageUrl={props.imgUrl}
            handleChange={handleChange}
        />
    );
}

export default IndividualResourceTile;
