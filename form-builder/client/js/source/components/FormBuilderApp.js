/* @flow */

import React, {Component} from 'react';
import ExcelWithFunc from './ExcelWithFunc'
import Dialog from './Dialog'
import CRUDStore from '../flux-imm/CRUDStore';
import CRUDActions from '../flux-imm/CRUDActions';
import type {VoidMethod} from './ExcelWithFunc'
import FormBuilder from './FormBuilder'

// Local schema for testing without server
let schema =  [
  {
    id: 'form_id',
    label: 'Form Id',
    type: 'text',
    show: true,
    sample: '1',
    align: 'left',
    readOnlyGlobal: true,
  },
  {
    id: 'form_name',
    label: 'Form Name',
    type: 'text',
    show: true,
    sample: 'Movie Review',
  },
  {
    id: 'num_submissions',
    label: '# Submissions',
    type: 'number',
    show: true,
    sample: '0',
    align: 'left',
    readOnlyGlobal: true,
  },
  {
    id: 'submit_page',
    label: 'Submit Page',
    type: 'button',
    show: true,
    sample: "www.google.com",
  },
  {
    id: 'submissions_page',
    label: 'Submissions Page',
    type: 'button',
    show: true,
    sample: 'www.mako.co.il',
  },
  {
    id: 'schema',
    label: 'schema Page',
    type: 'data',
    show: false,
    sample: 'sample data',
    invisible: true,
  },
]

// Initializing the store that will hold all the created forms info
let crudStore = new CRUDStore({storeType: 'server', serverURL: window.location.href.concat("database/")})
let crudActions = new CRUDActions(crudStore)

/*
Special properties for FormBuilder
-------------------------------
*/
type Props = {
};

/*
FormBuilderApp component for giving the functionality to build forms and display
the created forms
*/
class FormBuilderApp extends Component<Props> {
  // Setting the default values for the properties 
  static defaultProps = {
  };
  
  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);
  }
  
  /*
  Creating a fresh form ID
  */
  _createFormID() {
    // Initializing
    let formID = 1;

    // Retrieving all forms from store
    let forms_ids = crudStore.getData().map((row) => parseInt(row.form_id, 10))

    console.log(JSON.stringify(forms_ids))

    // Searching for an unused id
    while (forms_ids.indexOf(formID) >= 0) {
      formID++
    }

    return formID
  }

  /*
  Adding form
  */
 _addForm(finishActionExecution: VoidMethod, action: string) {
    // Initializing
    let newFormInfo = {}

    // Asserting action was to create the form
    if (action === 'confirm') {
      // Retrieving created form
      let createdForm = this.refs.excelWithFunc.refs.createdForm.getCreatedForm()
      
      // Creating new created form id
      let createdFormID = this._createFormID()

      // Creating new form info
      newFormInfo.form_id = String(createdFormID)
      newFormInfo.form_name = createdForm.formName
      newFormInfo.num_submissions = String(0)
      newFormInfo.submit_page = `submit_page_${createdFormID}`
      newFormInfo.submissions_page = `submissions_page${createdFormID}`
      newFormInfo.schema = JSON.stringify(createdForm)

      // Creating new form info
      crudActions.create(newFormInfo)

      // Resetting form builder component
      this.refs.excelWithFunc.refs.createdForm.reset()
    }

    // Finishing action
    finishActionExecution()
  }

  /*
  Rendering component
  */
  render() {
    // Rendering
    return <ExcelWithFunc
            // Setting ref for easy access
            ref="excelWithFunc"           
            
            // Setting the component data store and actions from which it will retrieve required
            // data
            crudStore={crudStore}
            crudActions={crudActions}

            // Setting the created form action in the ExcelWithFunc component
            actions={[this._createCreateFormAction.bind(this)]}
            actionsDefs={["Create Form"]}
          /> 
  }
  
  /*
  Creating a created form action to give the excel with functionality component
  */
  _createCreateFormAction(finishActionExecution: VoidMethod) {
    return <Dialog 
              modal={true}                                                 
              header="Create new form"                                     // Setting title 
              confirmLabel="Create"                                        // Setting confirm button label
              onAction={this._addForm.bind(this, finishActionExecution)}   // Setting the add new form callback to call when confirm button is clicked
            >  

              {/*Setting the form builder to provide the ability to create a form */}
              <FormBuilder 
                // Setting ref for easy access
                ref="createdForm" 
              />
            </Dialog>
  }
}

export default FormBuilderApp

