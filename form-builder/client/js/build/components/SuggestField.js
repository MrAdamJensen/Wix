'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
SuggestField component which is a regular input field with suggestions
*/


/*
Special properties for SuggestField
-------------------------------
id: component id
defaultValue: initial value
options: the options to suggest
*/


/*
SuggestField state fields:
----------------------------------------------------------------
value: current given value in input
*/
var SuggestField = function (_Component) {
  _inherits(SuggestField, _Component);

  /*
  Component constructor
  */
  function SuggestField(props) {
    _classCallCheck(this, SuggestField);

    // Initializing component state
    var _this = _possibleConstructorReturn(this, (SuggestField.__proto__ || Object.getPrototypeOf(SuggestField)).call(this, props));
    // Calling meta class constructor


    _this.state = { value: props.defaultValue || '' };
    return _this;
  }

  /*
  Returning input value
  */


  // Setting the default values for the properties 

  // Component fields type definitions


  _createClass(SuggestField, [{
    key: 'getValue',
    value: function getValue() {
      return this.state.value;
    }

    /*
    Updating state on props change
    */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // If props change, update state required fields based on new props
      if (nextProps.defaultValue !== this.props.defaultValue) {
        this.setState({ value: nextProps.defaultValue });
      }
    }

    /*
    Rendering component
    */

  }, {
    key: 'render',
    value: function render() {
      // Asserting field is read only, if yes render it as a simple span with a hidden input for the label,
      // otherwise, render it as input
      if (this.props.readOnly) {
        return this._renderReadOnly();
      } else {
        return this._renderInput();
      }
    }

    /*
    Rendering component as readonly
    */

  }, {
    key: '_renderReadOnly',
    value: function _renderReadOnly() {
      // Render as a simple span with a hidden input for the label because readonly
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'span',
          null,
          this.state.value
        ),
        _react2.default.createElement('input', _extends({}, this.props, {
          type: 'hidden'
        }))
      );
    }

    /*
    Rendering component as input
    */

  }, {
    key: '_renderInput',
    value: function _renderInput() {
      var _this2 = this;

      // Generating id for the suggest part
      var randomID = Math.random().toString(16).substring(2);

      // Rendering as input because not read only
      return _react2.default.createElement(
        'div',
        null,
        '                                                            ',
        _react2.default.createElement('input', {
          // Setting the id of the suggest field so that it will
          // receive the input text as it is entered so that it can suggest                                                  
          list: randomID,
          defaultValue: this.props.defaultValue // Setting the default value of the input field part

          // Setting callback to update the state of the component as user types
          , onChange: function onChange(e) {
            return _this2.setState({ value: e.target.value });
          },
          id: this.props.id // Setting the id of the input part as the component id
        }),
        _react2.default.createElement(
          'datalist',
          {
            id: randomID // Setting id to connect the input part to the suggest part
          },

          // Creating all possible suggested options                            
          this.props.options.map(function (item, idx) {
            return _react2.default.createElement('option', { value: item, key: idx });
          })
        )
      );
    }
  }]);

  return SuggestField;
}(_react.Component);

SuggestField.defaultProps = {
  defaultValue: "",
  readOnly: false
};
exports.default = SuggestField;