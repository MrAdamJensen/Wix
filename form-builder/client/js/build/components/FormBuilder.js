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

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _CRUDStore = require('../flux-imm/CRUDStore');

var _CRUDStore2 = _interopRequireDefault(_CRUDStore);

var _CRUDActions = require('../flux-imm/CRUDActions');

var _CRUDActions2 = _interopRequireDefault(_CRUDActions);

var _immutable = require('immutable');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Listing all possible form field user can create in the editor form
var editorPossibleFormFields = ['Color', 'Date', 'Email', 'Number', 'Rating', 'Tel', 'Text'];

// Setting schema for editor form
var editorFormSchema = [{
  id: 'field_type',
  label: 'Field Type',
  type: 'suggest',
  show: true,
  sample: '',
  align: 'left',
  options: editorPossibleFormFields
}, {
  id: 'field_label',
  label: 'Field Label',
  type: 'text',
  show: true,
  sample: ''
}];

/*
Special properties for FormBuilder
-------------------------------
*/


/*
FormBuilder state fields
-------------------
createdFormSchema: the created form schema
*/

/*
FormBuilder component for giving the functionality to build forms
*/
var FormBuilder = function (_Component) {
  _inherits(FormBuilder, _Component);

  /*
  Component constructor
  */
  function FormBuilder(props) {
    _classCallCheck(this, FormBuilder);

    // Initializing component state
    var _this = _possibleConstructorReturn(this, (FormBuilder.__proto__ || Object.getPrototypeOf(FormBuilder)).call(this, props));
    // Calling meta class constructor


    _this.state = {
      createdFormSchema: (0, _immutable.List)()
    };

    // Initializing component
    _this._initializeComponent();
    return _this;
  }

  /*
  Initializing component
  */


  // Setting the default values for the properties 

  // Component fields type definitions


  _createClass(FormBuilder, [{
    key: '_initializeComponent',
    value: function _initializeComponent() {
      var _this2 = this;

      // Initializing the editor store for this component
      this.editorFormCrudStore = new _CRUDStore2.default({ storeType: 'temp', schema: editorFormSchema });
      this.editorFormCrudActions = new _CRUDActions2.default(this.editorFormCrudStore);

      // Initializing the created form store for this component
      this.createdFormCrudStore = new _CRUDStore2.default({ storeType: 'temp', schema: [] });
      this.createdFormCrudActions = new _CRUDActions2.default(this.createdFormCrudStore);

      // Listening for changes in the created form so that it can re-render the changes in the 
      // created form
      this.createdFormCrudStore.addListener('change', function () {
        _this2.setState({ createdFormSchema: _this2.createdFormCrudStore.getSchema() });
      });
    }

    /*
    Updating the created form
    */

  }, {
    key: '_updateCreatedForm',
    value: function _updateCreatedForm() {
      // Initializing
      var newField = {
        id: 'not filled',
        type: 'not filled',
        label: 'not filled',
        show: true,
        sample: '',
        align: 'left'

        // Retrieving current schema
      };var currentSchema = this.createdFormCrudStore.getSchema();

      // Retrieving user input to the editor form
      var editorFormData = this.refs.editorForm.getData();

      // Creating new field for created form
      newField['id'] = String(currentSchema.size);
      newField['type'] = editorFormData[editorFormSchema[0].id].toLowerCase();
      newField['label'] = editorFormData[editorFormSchema[1].id];

      // Asserting given type is legal
      if (editorPossibleFormFields.map(function (type) {
        return type.toLowerCase();
      }).indexOf(newField['type']) < 0) {
        window.alert("Bad input type, please choose a type from the options");
        return;
      }

      // Creating new schema
      var newSchema = currentSchema.push(newField);

      // Updating schema with new schema 
      this.createdFormCrudStore.setSchema(newSchema);
    }
    /*
    Returning created form
    */

  }, {
    key: 'getCreatedForm',
    value: function getCreatedForm() {
      return this.state.createdFormSchema;
    }

    /*
    Resetting component, after finish use of component this method must be called
    */

  }, {
    key: 'reset',
    value: function reset() {
      this._initializeComponent();
    }

    /*
    Rendering component
    */

  }, {
    key: 'render',
    value: function render() {
      // Rendering
      return _react2.default.createElement(
        'div',
        { className: 'FormBuilder' },
        _react2.default.createElement(
          'div',
          { className: 'EditorForm' },
          _react2.default.createElement(_Form2.default, {
            ref: 'editorForm' // ref attribute for easy access to the element
            , crudStore: this.editorFormCrudStore // editor store that will manage the form data and schema
          }),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              _Button2.default,
              { className: 'Button', onClick: this._updateCreatedForm.bind(this) },
              'Created Field'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'CreatedForm' },
          _react2.default.createElement(
            'div',
            { className: 'CreatedFormHeader' },
            'New Form:'
          ),
          _react2.default.createElement(_Form2.default, {
            ref: 'createdForm' // ref attribute for easy access to the element

            // created form store that will manage the form data and schema that will update when a new field is added to the 
            // created form
            , crudStore: this.createdFormCrudStore,
            disabled: true
          })
        )
      );
    }
  }]);

  return FormBuilder;
}(_react.Component);

FormBuilder.defaultProps = {};
exports.default = FormBuilder;