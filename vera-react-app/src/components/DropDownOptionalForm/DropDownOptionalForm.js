import React from 'react';
import { Component } from "react";
import './DropDownOptionalForm.css';

class DropDownOptionalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: ""
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
    this.props.handleChange(e.target.value);
  }

  render() {
    return (
          <div className="wrapper-drop-down">
            <select id="dropdown-optional" onChange={this.handleDropdownChange}>
              <option value="N/A" id="options">{this.props.fieldTitle}</option>
              {this.props.myoptions.map((optionTitle) => (
                 <option value={optionTitle} id="options">{optionTitle}</option>
              ))}
            </select>
          </div>
    );
  }
}



export default DropDownOptionalForm;
