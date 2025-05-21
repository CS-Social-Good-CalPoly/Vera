import React from 'react'
import { Component } from 'react'
import Select from 'react-select'

class DropDownSelectForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectValue: '',
            selectedValues: [],
        }
        this.handleDropdownChange = this.handleDropdownChange.bind(this)
    }

    handleDropdownChange(e) {
        if (this.props.isMulti) {
            this.setState({ selectedValues: e })
            this.props.handleChange(e)
        } else {
            this.setState({ selectValue: e.value })
            this.props.handleChange(e.value)
        }
    }

    mergeStyles(defaultStyles, customStyles) {
        return {
            control: (provided, state) => ({
                ...defaultStyles.control(provided, state),
                ...customStyles,
            }),
        }
    }

    render() {
        const defaultStyles = {
            control: (provided) => ({
                ...provided,
                padding: '3px',
                paddingLeft: '20px',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '16px',
                letterSpacing: '0.05em',
                textTransform: 'capitalize',
                color: '#534D49',
                borderColor: 'white',
                background: 'white',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '20px',
                border: '.5px solid rgba(0, 0, 0, 0.25)',
                textOverflow: 'ellipsis',
            }),
        }

        // Merge default styles with the styles passed as a prop
        const mergedStyles = this.props.customStyles
            ? this.mergeStyles(defaultStyles, this.props.customStyles)
            : defaultStyles

        return (
            <Select
                styles={mergedStyles}
                options={this.props.myoptions}
                disabled={this.props.disabled}
                placeholder={this.props.fieldTitle}
                onChange={this.handleDropdownChange}
                isMulti={this.props.isMulti}
                value={
                    this.props.isMulti
                        ? this.props.value || this.state.selectedValues
                        : this.props.myoptions.find(
                              (option) =>
                                  option.value ===
                                  (this.props.value ?? this.state.selectValue),
                          )
                }
            />
        )
    }

    //     render() {
    //         return (
    //             <div className="wrapper-drop-down">
    //                 <select
    //                     id="dropdown"
    //                     onChange={this.handleDropdownChange}
    //                     disabled={this.props.disabled}
    //                     defaultValue={''}
    //                 >
    //                     <option
    //                         key="N/A"
    //                         value=""
    //                         className={`${this.state.selectValue == '' ? 'select-option' : ''} `}
    //                     >
    //                         {this.props.fieldTitle}
    //                     </option>
    //                     {this.props.myoptions.map((optionTitle, index) => (
    //                         <option
    //                             className={`${this.state.selectValue == optionTitle ? 'select-option' : ''} `}
    //                             key={optionTitle}
    //                             value={optionTitle}
    //                             index={index}
    //                         >
    //                             {optionTitle}
    //                         </option>
    //                     ))}
    //                 </select>
    //             </div>
    //         )
    //     }
}

export default DropDownSelectForm
