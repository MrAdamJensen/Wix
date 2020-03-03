'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ExcelWithFunc = require('./ExcelWithFunc');

var _ExcelWithFunc2 = _interopRequireDefault(_ExcelWithFunc);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _CRUDStore = require('../flux-imm/CRUDStore');

var _CRUDStore2 = _interopRequireDefault(_CRUDStore);

var _CRUDActions = require('../flux-imm/CRUDActions');

var _CRUDActions2 = _interopRequireDefault(_CRUDActions);

var _FormBuilder = require('./FormBuilder');

var _FormBuilder2 = _interopRequireDefault(_FormBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Local schema for testing without server
var schema = [{
  id: 'form_id',
  label: 'Form Id',
  type: 'text',
  show: true,
  sample: '1',
  align: 'left',
  readOnlyGlobal: true
}, {
  id: 'form_name',
  label: 'Form Name',
  type: 'text',
  show: true,
  sample: 'Movie Review'
}, {
  id: 'num_submissions',
  label: '# Submissions',
  type: 'number',
  show: true,
  sample: '0',
  align: 'left',
  readOnlyGlobal: true
}, {
  id: 'submit_page',
  label: 'Submit Page',
  type: 'button',
  show: true,
  sample: "www.google.com"
}, {
  id: 'submissions_page',
  label: 'Submissions Page',
  type: 'button',
  show: true,
  sample: 'www.mako.co.il'
}, {
  id: 'schema',
  label: 'schema Page',
  type: 'data',
  show: false,
  sample: 'sample data',
  'invisible': true
}];

// Initializing the store that will hold all the created forms info
var crudStore = new _CRUDStore2.default({ storeType: 'server', serverURL: window.location.href.concat("database") });
var crudActions = new _CRUDActions2.default(crudStore);

/*
Special properties for FormBuilder
-------------------------------
*/

/*
FormBuilderApp component for giving the functionality to build forms and display
the created forms
*/
var FormBuilderApp = function (_Component) {
  _inherits(FormBuilderApp, _Component);

  /*
  Component constructor
  */
  function FormBuilderApp(props) {
    _classCallCheck(this, FormBuilderApp);

    // Calling meta class constructor
    return _possibleConstructorReturn(this, (FormBuilderApp.__proto__ || Object.getPrototypeOf(FormBuilderApp)).call(this, props));
  }

  /*
  Creating a fresh form ID
  */

  // Setting the default values for the properties 


  _createClass(FormBuilderApp, [{
    key: '_createFormID',
    value: function _createFormID() {
      // Initializing
      var formID = 1;

      // Retrieving all forms from store
      var forms_ids = crudStore.getData().map(function (row) {
        return parseInt(row.form_id, 10);
      });

      console.log(JSON.stringify(forms_ids));

      // Searching for an unused id
      while (forms_ids.indexOf(formID) >= 0) {
        formID++;
      }

      return formID;
    }

    /*
    Adding form
    */

  }, {
    key: '_addForm',
    value: function _addForm(finishActionExecution, action) {
      // Initializing
      var newFormInfo = {};

      // Asserting action was to create the form
      if (action === 'confirm') {
        // Retrieving created form
        var createdForm = this.refs.excelWithFunc.refs.createdForm.getCreatedForm();

        // Creating new created form id
        var createdFormID = this._createFormID();

        // Creating new form info
        newFormInfo.form_id = String(createdFormID);
        newFormInfo.form_name = createdForm.formName;
        newFormInfo.num_submissions = String(0);
        newFormInfo.submit_page = 'submit_page_' + createdFormID;
        newFormInfo.submissions_page = 'submissions_page' + createdFormID;
        newFormInfo.schema = JSON.stringify(createdForm);

        // Creating new form info
        crudActions.create(newFormInfo);

        // Resetting form builder component
        this.refs.excelWithFunc.refs.createdForm.reset();
      }

      // Finishing action
      finishActionExecution();
    }

    /*
    Rendering component
    */

  }, {
    key: 'render',
    value: function render() {
      // Rendering
      return _react2.default.createElement(_ExcelWithFunc2.default
      // Setting ref for easy access
      , { ref: 'excelWithFunc'

        // Setting the component data store and actions from which it will retrieve required
        // data
        , crudStore: crudStore,
        crudActions: crudActions

        // Setting the created form action in the ExcelWithFunc component
        , actions: [this._createCreateFormAction.bind(this)],
        actionsDefs: ["Create Form"]
      });
    }

    /*
    Creating a created form action to give the excel with functionality component
    */

  }, {
    key: '_createCreateFormAction',
    value: function _createCreateFormAction(finishActionExecution) {
      return _react2.default.createElement(
        _Dialog2.default,
        {
          modal: true,
          header: 'Create new form' // Setting title 
          , confirmLabel: 'Create' // Setting confirm button label
          , onAction: this._addForm.bind(this, finishActionExecution) // Setting the add new form callback to call when confirm button is clicked
        },
        _react2.default.createElement(_FormBuilder2.default
        // Setting ref for easy access
        , { ref: 'createdForm'
        })
      );
    }
  }]);

  return FormBuilderApp;
}(_react.Component);

FormBuilderApp.defaultProps = {};
exports.default = FormBuilderApp;