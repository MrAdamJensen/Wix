/* @flow */

import React, {Component} from 'react';
import ExcelWithFunc from './ExcelWithFunc'
import Dialog from './Dialog'
import CRUDStore from '../flux-imm/CRUDStore';
import CRUDActions from '../flux-imm/CRUDActions';
import type {VoidMethod} from './ExcelWithFunc'
import FormBuilder from './FormBuilder'

let schema =  [
  {
    id: 'form_id',
    label: 'Form Id',
    type: 'text',
    show: true,
    sample: '1',
    align: 'left',
    readOnly: true,
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
    readOnly: true,
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
]

// Initializing the store that will hold all the created forms info
let crudStore = new CRUDStore({storeType: 'local', schema:schema, reset: true})
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

      // Creating new form info
      crudActions.create(newFormInfo)

      // TODO: send created form schema to server

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
            ref="excelWithFunc"
            crudStore={crudStore}
            crudActions={crudActions}
            actions={[this._createCreateFormAction.bind(this)]}
            actionsDefs={["Create Form"]}
          /> 
  }
  
  _createCreateFormAction(finishActionExecution: VoidMethod) {
    return <Dialog 
              modal={true}
              header="Create new form"
              confirmLabel="Create"
              onAction={this._addForm.bind(this, finishActionExecution)}>
              <FormBuilder 
                ref="createdForm" 
              />
            </Dialog>
  }
}

export default FormBuilderApp

