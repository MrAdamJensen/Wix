'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Rating field component, displaying rating with stars highlighted
*/


/*
Special properties for RatingField
-------------------------------
defaultValue: the default number of stars to highlight 
readOnly: does the number of stars highlighted can be edited
max: number of stars to display
*/


/*
RatingField state fields: 
----------------------------------------------------------------
rating: the number of stars highlighted
tmpRating: the number of stars temporary highlighted
*/
var RatingField = function (_Component) {
  _inherits(RatingField, _Component);

  /*
  Component constructor
  */
  function RatingField(props) {
    _classCallCheck(this, RatingField);

    // If default value is string, convert it to int
    var _this = _possibleConstructorReturn(this, (RatingField.__proto__ || Object.getPrototypeOf(RatingField)).call(this, props));
    // Calling meta class constructor


    if (typeof props.defaultValue === 'string') {
      props.defaultValue = parseInt(props.defaultValue, 10);
    }

    // Asserting default value initialized
    (0, _invariant2.default)(props.defaultValue, "RatingField.constructor: default value not initialized");

    // Initializing component state
    _this.state = {
      rating: props.defaultValue,
      tmpRating: props.defaultValue
    };
    return _this;
  }

  /*
  Returning number of stars highlighted
  */


  // Setting the default values for the properties 

  // Component fields type definitions


  _createClass(RatingField, [{
    key: 'getValue',
    value: function getValue() {
      return this.state.rating;
    }

    /*
    Setting the number of stars temporary highlighted
    */

  }, {
    key: 'setTemp',
    value: function setTemp(rating) {
      this.setState({ tmpRating: rating });
    }

    /*
    Setting the real number of stars highlighted
    */

  }, {
    key: 'setRating',
    value: function setRating(rating) {
      this.setState({
        tmpRating: rating,
        rating: rating
      });
    }

    /*
    Resetting the number of stars highlighted to the real value
    */

  }, {
    key: 'reset',
    value: function reset() {
      this.setTemp(this.state.rating);
    }

    /*
    Executed when new properties are given so that when a new component 
    is created it will receive the new default value
    */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // If default value is string, convert it to int
      if (typeof nextProps.defaultValue === 'string') {
        nextProps.defaultValue = parseInt(nextProps.defaultValue, 10);
      }

      // Asserting default value initialized
      (0, _invariant2.default)(nextProps.defaultValue, "RatingField.constructor: default value not initialized");

      // Updating number of stars highlighted
      this.setRating(nextProps.defaultValue);
    }

    /*
    Rendering component
    */

  }, {
    key: 'render',
    value: function render() {
      // Rendering stars
      var stars = this._renderStars();

      return _react2.default.createElement(
        'div',
        { // Rendering rating
          // Setting classes for styling for when the component is in readOnly mode and edit mode
          className: (0, _classnames2.default)({
            'Rating': true,
            'RatingReadonly': this.props.readOnly
          }),
          onMouseOut: this.reset.bind(this) // Resetting highlighted stars to real value when the mouse is done hovering
        },
        stars,
        '                                 ',

        // If not readOnly mode, render a hidden input so that the component can act like a real input
        this.props.readOnly || !this.props.id ? null : _react2.default.createElement('input', {
          type: 'hidden',
          id: this.props.id,
          value: this.state.rating })
      );
    }

    /*
    Rendering stars
    */

  }, {
    key: '_renderStars',
    value: function _renderStars() {
      // Initializing
      var stars = [];

      // Rendering stars
      for (var i = 1; i <= this.props.max; i++) {
        // Rendering star
        stars.push(_react2.default.createElement(
          'span',
          { // Creating star
            className: i <= this.state.tmpRating ? 'RatingOn' : null // Highlighting star if position is within temp rating
            , key: i // adding key because it is requested by react
            , onClick: this.props.readOnly ? undefined : this.setRating.bind(this, i) // If no readOnly, setting callback for changing real rating on click
            , onMouseOver: this.props.readOnly ? undefined : this.setRating.bind(this, i) // If no readOnly, setting callback for changing temp rating on mouse over 
          },
          '\u2606                                                          '
        ));
      }

      return stars;
    }
  }]);

  return RatingField;
}(_react.Component);

RatingField.defaultProps = {
  defaultValue: 0,
  max: 5,
  readOnly: false
};
exports.default = RatingField;