import React from 'react'
import './CategoryButton.css'

import { Anchor } from 'antd'

const {Link} = Anchor

function CategoryButton(props) {

    // Only issue with this is that offset seems to not be possible
    // If this can be figured out, this would be an optimal solution...
    function scrollToElement() {
        const element =  document.getElementById(props.location);
        element.scrollIntoView({ behavior: 'smooth'})
    }

    return (
        <button className="CategoryButton" onClick={scrollToElement}>
            {/* <span className="button-text">{props.category}</span> */}
            <Anchor targetOffset='45'>
                <Link href={'#' + props.className} title={props.category} />
            </Anchor>
        </button>

        // Notes about using Anchor:
        // - Link: https://www.youtube.com/watch?v=7mZ4yguae9Q
        // - You might need to download (use this command in terminal): npm i antd
        // - You can easily move between sections
        // - Styling looks bad
        // - Offset exists, but it might differ between mobile and desktop

        // <Anchor targetOffset='15'>
        //     <Link href={'#'+props.location} title={props.category}/>
        // </Anchor>
    )

}

export default CategoryButton;
