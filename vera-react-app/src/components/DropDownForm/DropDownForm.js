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
          <div>
            <select className="dropdown" onChange={this.handleDropdownChange}>
              <option value="N/A">{this.props.fieldTitle}</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              <option value="4">5th Year</option>
            </select>
          </div>

    );
  }
}

export default DropDownForm;
