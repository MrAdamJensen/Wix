'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CRUDStore = require('../flux-imm/CRUDStore');

var _CRUDStore2 = _interopRequireDefault(_CRUDStore);

var _FormInput = require('./FormInput');

var _FormInput2 = _interopRequireDefault(_FormInput);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Form component which displays a form
*/


/*
Special properties for Form
-------------------------------
readOnly: true if the form should be editable
recordId: the id of data to be displayed in the form
crudStore: the CRUD store from which to retrieve the data
disabled: set the input to be disabled if true
readOnlyGlobalOverride: if used, can override the current value of this prop
*/
var Form = function (_Component) {
  _inherits(Form, _Component);

  /*
  Component constructor
  */
  function Form(props) {
    _classCallCheck(this, Form);

    // Calling meta class constructor
    return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));
  }

  /*
  Returning form data
  */

  // Setting the default values for the properties 


  _createClass(Form, [{
    key: 'getData',
    value: function getData() {
      var _this2 = this;

      // Initializing data to be returned
      var data = {};

      // Retrieving each form field data and setting it in data to be returned
      this.props.crudStore.getSchema().forEach(function (field) {
        return data[field.id] = _this2.refs[field.id].getValue();
      });
      return data;
    }

    /*
    Rendering form
    */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { className: 'Form' },
        this.props.crudStore.getSchema().map(this._renderFormField, this),
        ' '
      );
    }

    /*
    Rendering a form field
    */

  }, {
    key: '_renderFormField',
    value: function _renderFormField(field) {
      // Initializing
      var initialData = void 0;

      // Asserting field is not invisible, if yes not rendering it
      if (field.invisible) {
        return null;
      }

      // Copying field so that nothing will change it
      field = _extends({}, field);

      // If a record id for the form is being given, initializing form with the data
      // that belongs to the record id
      if (this.props.recordId !== -1) {
        initialData = this.props.crudStore.getRecord(this.props.recordId);
      }

      // Retrieving field prefilled data
      var prefilled = initialData && initialData[field.id];

      // If the field is read only globally but this component is requested to
      // override it , override it
      if (field.readOnlyGlobal && typeof this.props.readOnlyGlobalOverride !== 'undefined') {
        field.readOnlyGlobal = this.props.readOnlyGlobalOverride;
      }

      // Rendering form field
      return _react2.default.createElement(
        'div',
        {
          className: 'FormRow' // Adding class for styling of form field
          , key: field.id },
        '                       ',
        _react2.default.createElement(
          'label',
          { // Setting form field label                            
            className: 'FormLabel' // Setting form field label class for styling
            , htmlFor: field.id },
          '                 ',
          field.label,
          ':                    '
        ),
        _react2.default.createElement(_FormInput2.default // Setting form field as an editable field
        , _extends({ readOnly: this.props.readOnly // Setting field readonly or not based on properties
          , disabled: this.props.disabled // Setting field disable or not based on properties
        }, field, { // Setting field properties
          ref: field.id // Setting field ref so that it can be accessed easily
          , defaultValue: prefilled })),
        '         '
      );
    }
  }]);

  return Form;
}(_react.Component);

Form.defaultProps = {
  readOnly: false,
  recordId: -1,
  disabled: false
};
exports.default = Form;