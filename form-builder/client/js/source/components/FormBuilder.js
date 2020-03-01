/* @flow */

import React, {Component} from 'react';
import ExcelWithFunc from './ExcelWithFunc'
import Dialog from './Dialog'
import Form from './Form'
import CRUDStore from '../flux-imm/CRUDStore';
import CRUDActions from '../flux-imm/CRUDActions';
import type {VoidMethod} from './ExcelWithFunc'
import {List} from 'immutable';
import Button from './Button'

// Listing all possible form field user can create in the editor form
let editorPossibleFormFields =  ['Color', 'Date', 'Email', 'Number', 'Rating', 'Tel', 'Text']

// Setting schema for editor form
let editorFormSchema =  [
  {
    id: 'field_type',
    label: 'Field Type',
    type: 'suggest',
    show: true,
    sample: '',
    align: 'left',
    options: editorPossibleFormFields
  },
  {
    id: 'field_label',
    label: 'Field Label',
    type: 'text',
    show: true,
    sample: '',
  },
]

/*
Special properties for FormBuilder
-------------------------------
*/
type Props = {
};

/*
FormBuilder state fields
-------------------
createdFormSchema: the created form schema
*/
type State = {
  createdFormSchema: List<Object>,
};

/*
FormBuilder component for giving the functionality to build forms
*/
class FormBuilder extends Component<Props, State> {
  // Component fields type definitions
  editorFormCrudStore: CRUDStore;
  editorFormCrudActions: CRUDActions;
  createdFormCrudStore: CRUDStore;
  createdFormCrudActions: CRUDActions;
  
  // Setting the default values for the properties 
  static defaultProps = {
  };
  
  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);

    // Initializing component state
    this.state = {
      createdFormSchema: List(),
    };
    
    // Initializing component
    this._initializeComponent()
  }
  
  /*
  Initializing component
  */
  _initializeComponent() {
    // Initializing the editor store for this component
    this.editorFormCrudStore = new CRUDStore({storeType: 'temp', schema:editorFormSchema})
    this.editorFormCrudActions = new CRUDActions(this.editorFormCrudStore)

    // Initializing the created form store for this component
    this.createdFormCrudStore = new CRUDStore({storeType: 'temp', schema:[]})
    this.createdFormCrudActions = new CRUDActions(this.createdFormCrudStore)

    // Listening for changes in the created form so that it can re-render the changes in the 
    // created form
    this.createdFormCrudStore.addListener('change', () => {
      this.setState({ createdFormSchema: this.createdFormCrudStore.getSchema()});
    });
  }

  /*
  Updating the created form
  */
  _updateCreatedForm(){
    // Initializing
    let newField = {
      id: 'not filled',
      type: 'not filled',
      label: 'not filled',
      show: true,
      sample: '',
      align: 'left',
    }

    // Retrieving current schema
    let currentSchema = this.createdFormCrudStore.getSchema()

    // Retrieving user input to the editor form
    let editorFormData = this.refs.editorForm.getData()

    // Creating new field for created form
    newField['id'] = String(currentSchema.size)
    newField['type'] = editorFormData[editorFormSchema[0].id].toLowerCase()
    newField['label'] = editorFormData[editorFormSchema[1].id]  
    
    // Asserting given type is legal
    if (editorPossibleFormFields.map(type => type.toLowerCase()).indexOf(newField['type']) < 0){
      window.alert("Bad input type, please choose a type from the options");
      return
    }
    
    // Creating new schema
    let newSchema = currentSchema.push(newField)

    // Updating schema with new schema 
    this.createdFormCrudStore.setSchema(newSchema)
  }
  /*
  Returning created form
  */
  getCreatedForm(){
    return this.state.createdFormSchema;
  }

  /*
  Resetting component, after finish use of component this method must be called
  */
  reset(){
    this._initializeComponent()
  }

  /*
  Rendering component
  */
  render() {
    // Rendering
    return <div className="FormBuilder">
              <div className="EditorForm">

                {/*Creating the editor form that will manage the form creation*/}
                <Form                                                 
                  ref="editorForm"                      // ref attribute for easy access to the element
                  crudStore={this.editorFormCrudStore}  // editor store that will manage the form data and schema
                />

                <div>
                
                  {/*
                    Creating the button that will control a new field submission,
                    when the button is clicked, it will trigger the update of the 
                    created form schema
                  */}
                  <Button className="Button" onClick={this._updateCreatedForm.bind(this)}>Created Field</Button>

                </div>

              </div>

              <div className="CreatedForm">
                
                {/*Created form header */}  
                <div className="CreatedFormHeader">New Form:</div>
                
                {/*Creating the created form*/}
                <Form                                   
                  ref="createdForm"                     // ref attribute for easy access to the element

                  // created form store that will manage the form data and schema that will update when a new field is added to the 
                  // created form
                  crudStore={this.createdFormCrudStore} 
                  disabled={true}
                />

              </div>
          </div>
  }
}

export default FormBuilder

