import React, { Component } from 'react';
import './DropDownOptionalForm.css';

class DropDownOptionalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: props.value || '',
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({ selectValue: this.props.value });
        }
    }

    handleDropdownChange = (e) => {
        this.setState({ selectValue: e.target.value });
        this.props.handleChange(e.target.value);
    };

    render() {
        return (
            <div className="wrapper-drop-down">
                <select
                    id="dropdown-optional"
                    onChange={this.handleDropdownChange}
                    value={this.state.selectValue}
                >
                    <option value="">{this.props.fieldTitle}</option>
                    {this.props.myoptions.map((optionTitle) => (
                        <option key={optionTitle} value={optionTitle}>
                            {optionTitle}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export default DropDownOptionalForm;
