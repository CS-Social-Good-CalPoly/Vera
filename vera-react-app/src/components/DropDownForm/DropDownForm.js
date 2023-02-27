import React from 'react';
import { Component } from "react";
import './DropDownForm.css';

class DropDownForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: ""
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  render() {
    return (
          <div className="wrapper-drop-down">
            <select id="dropdown" onChange={this.handleDropdownChange}>
              <option value="N/A">{this.props.fieldTitle}</option>
              {this.props.myoptions.map((optionTitle) => (
                 <option value="1">{optionTitle}</option>
              ))}
            </select>
          </div>
    );
  }
}



export default DropDownForm;
