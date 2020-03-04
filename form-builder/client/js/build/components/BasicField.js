'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

  // Component fields type definitions
  function BasicField(props) {
    _classCallCheck(this, BasicField);

    // Initializing component state
    var _this = _possibleConstructorReturn(this, (BasicField.__proto__ || Object.getPrototypeOf(BasicField)).call(this, props));
    // Calling meta class constructor


    if (typeof props.defaultValue !== 'undefined' && props.defaultValue != null) {
      _this.state = { value: props.defaultValue.toString() };
    } else {
      _this.state = { value: "" };
    }
    return _this;
  }

  /*
  Updating state on props change
  */


  _createClass(BasicField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // If props change, update state required fields based on new props
      if (nextProps.defaultValue !== this.props.defaultValue) {
        this.setState({ value: nextProps.defaultValue.toString() });
      }
    }

    /*
    Callback for change in input to update state
    */

  }, {
    key: '_onChange',
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
            this.state.value,
            '                            '
          ),
          _react2.default.createElement('input', {
            id: this.props.id // Setting id for label
            , disabled: this.props.disabled // Setting disabled to disable input field if requested
            , defaultValue: this.props.defaultValue // Setting input default value
            , type: 'hidden'
          })
        );
      } else {
        return notReadOnlyComp;
      }
    }
  }]);

  return BasicField;
}(_react.Component);

exports.default = BasicField;