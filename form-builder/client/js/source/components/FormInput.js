/* @flow */

import RatingField from './RatingField';
import NumberField from './NumberField';
import SuggestField from './SuggestField';
import ColorField from './ColorField';
import DateField from './DateField';
import EmailField from './EmailField';
import TelField from './TelField';
import TextField from './TextField';
import React, {Component} from 'react';

// Declaring form input field type, i.e, all the different kinds of forms
type FormInputFieldType = 'rating' | 'number' | 'suggest' | 'color' | 'date' | 'email' | 'tel' |  'text' | 'input';

// Declaring form input field values, i.e, all the different kinds of values a form can receive
export type FormInputFieldValue = string | number;

/*
Declaring form input field
-----------------------------
type: the type of the form field
defaultValue: the default value of the form field
id: the id of the form field, used to identify it with ref
options: the options for a form field that accept a set of options
label: the form field label
*/
export type FormInputField = {
  type: FormInputFieldType,
  defaultValue: FormInputFieldValue,
  id: string,
  options: Array<string>,
  label: string,
};

/*
Form Input component which displays a form input of certain types
*/
class FormInput extends Component<FormInputField> {
  // Component fields type definitions
  props: FormInputField;
  
  // Setting the default values for the properties 
  static defaultProps = {
    type: 'input',
  };
  
  /*
  Returning field value
  */
  getValue(): FormInputFieldValue {
    return this.refs.input.getValue();
  }

  /*
  Rendering component
  */
  render() {
    // Setting the common properties each componenet need to have 
    // in this rendering
    const commonProps: Object = {
      id: this.props.id,
      ref: 'input',
      defaultValue: this.props.defaultValue,
    };

    // Creating field based on the form field type
    switch (this.props.type) {
      case 'rating':
        return (
          <RatingField                             // Creating a rating field type, a field with stars to pick a rating
            {...commonProps}                       // Inserting common properties
            defaultValue={this.props.defaultValue} // Setting field default value, if it was not given, the field should handle it
          />
        );
      case 'number':
        return (
          <NumberField                             // Creating a number field type, which is a filed that accept only numbers
            {...commonProps}                       // Inserting common properties
            defaultValue={this.props.defaultValue} // Setting field default value, if it was not given, the field should handle it
          />
        );
      case 'suggest':
        return <SuggestField                       // Creating a suggest field type, a field with options to select from
                {...commonProps}                   // Inserting common properties
                options={this.props.options}       // Setting options to select from
              />;  
      case 'color':
        return (         
          <ColorField                              // Creating a color field type, which is a filed that accept only colors
            {...commonProps}                       // Inserting common properties
            defaultValue={this.props.defaultValue} // Setting field default value, if it was not given, the field should handle it
            />
        );
      case 'date':
        return (
          <DateField                               // Creating a date field type, which is a filed that accept only dates
            {...commonProps}                       // Inserting common properties
            defaultValue={this.props.defaultValue} // Setting field default value, if it was not given, the field should handle it
            />
        );
      case 'email':
        return (
          <EmailField                               // Creating a email field type, which is a filed that accept only emails
            {...commonProps}                        // Inserting common properties
            defaultValue={this.props.defaultValue}  // Setting field default value, if it was not given, the field should handle it
            />
        );
      case 'tel':
        return (
          <TelField                                 // Creating a telephone type, which is a filed that accept only telephones
            {...commonProps}                        // Inserting common properties*/}
            defaultValue={this.props.defaultValue}  // Setting field default value, if it was not given, the field should handle it
            />
        );
      case 'text':
        return (
          <TextField                                // Creating a text type, which is a filed that accept only text
            {...commonProps}                        // Inserting common properties
            defaultValue={this.props.defaultValue}  // Setting field default value, if it was not given, the field should handle it
            />
        );
      case 'input':
        return <input                               // Creating default field type, which is regular field for text
              {...commonProps}                      // Inserting common properties
              type="text"                           // default field type accepts text
              />;
      default:
        // Declaring unrecognized input type
        throw "FormInput.render: bad input type";
    }
  }
}

export default FormInput
