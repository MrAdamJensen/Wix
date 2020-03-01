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
BasicField component for basic input field
*/


/*
Special properties for BasicField
-------------------------------
defaultValue: the default value
readOnly: does the value can be edited
*/


/*
BasicField state fields:
------------------------
value: current given value in input
*/
var BasicField = function (_Component) {
  _inherits(BasicField, _Component);

  /*
  Component constructor
  */
  function BasicField(props) {
    _classCallCheck(this, BasicField);

    // Initializing component state
    var _this = _possibleConstructorReturn(this, (BasicField.__proto__ || Object.getPrototypeOf(BasicField)).call(this, props));
    // Calling meta class constructor


    if (typeof props.defaultValue !== 'undefined') {
      _this.state = { value: props.defaultValue.toString() };
    }
    return _this;
  }

  /*
  Updating state on props change, not recommended but no time to change model
  */


  // Setting the default values for the properties 

  // Component fields type definitions


  _createClass(BasicField, [{
    key: '_onChange',


    /*
    Callback for change in input to update state
    */
    value: function _onChange(e) {
      this.setState({ value: e.target.value });
    }

    /*
    Returning value
    */

  }, {
    key: 'getValue',
    value: function getValue() {
      return this.state.value;
    }

    /*
    If field is in read only mode, render it as a simple span and a hidden input for the label,
    otherwise, render the given element
    */

  }, {
    key: '_renderWithReadOnlyCheck',
    value: function _renderWithReadOnlyCheck(notReadOnlyComp) {
      // Asserting field is read only, if yes render it as a simple span with a hidden input for the label,
      // otherwise, render it as input
      if (this.props.readOnly) {
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
      } else {
        return notReadOnlyComp;
      }
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      // Hack, asserting this call happened upon props change
      // if yes, update state, if not don't update
      if (nextProps.defaultValue !== "") {
        return { value: nextProps.defaultValue };
      } else {
        return null;
      }
    }
  }]);

  return BasicField;
}(_react.Component);

BasicField.defaultProps = {
  defaultValue: "",
  readOnly: false
};
exports.default = BasicField;