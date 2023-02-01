import React from 'react'
import './CategoryButton.css'

import { Anchor } from 'antd'

const {Link} = Anchor

function CategoryButton(props) {

    // Only issue with this solution is that
    // scrollIntoView is not optimized for
    // safari. It still works, but it is not
    // as smooth as chrome.
    function scrollToElement() {
        const element =  document.getElementById(props.location); 
        element.scrollIntoView({ behavior: 'smooth'})
    }

    return (
        <button className="CategoryButton" onClick={scrollToElement}>
            <span className="button-text">{props.category}</span>
        </button>

        // Notes about using Anchor:
        // - Link: https://www.youtube.com/watch?v=7mZ4yguae9Q
        // - You might need to download (use this command in terminal): npm i antd
        // - You can easily move between sections
        // - Styling is not correct
        // - Offset exists, but it might differ between mobile and desktop

        // <button className="CategoryButton">
        //     {/* <Anchor targetOffset='45'> */}
        //         <Link href={'#'+props.location} title={props.category}/>
        //     {/* </Anchor> */}
        // </button>
    )

}

export default CategoryButton;
