import React from "react";
import "./TextBlock.css";

function TextBlock(props) {


    return <div className="TextBox">  
    <p className="Text">
       {props.text}
        </p>

        </div>

 }


 export default TextBlock;