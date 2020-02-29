"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Actions component to allow info, edit and delete actions
callback will be called with a string argument identifying 
the action requested: 'info', 'edit' and 'delete'
*/


/*
Special properties for Actions
-------------------------------
onAction: callback to execute when an action button is clicked
*/
var Actions = function Actions(props) {
  return _react2.default.createElement(
    "div",
    { className: "Actions" },
    _react2.default.createElement(
      "span",
      {
        tabIndex: "0",
        className: "ActionsInfo",
        title: "More info",
        onClick: props.onAction.bind(null, 'info') },
      "\u2139"
    ),
    _react2.default.createElement(
      "span",
      {
        tabIndex: "0",
        className: "ActionsEdit",
        title: "Edit",
        onClick: props.onAction.bind(null, 'edit') },
      "\u2710"
    ),
    _react2.default.createElement(
      "span",
      {
        tabIndex: "0",
        className: "ActionsDelete",
        title: "Delete",
        onClick: props.onAction.bind(null, 'delete') },
      "x"
    )
  );
};

Actions.defaultProps = {
  onAction: function onAction() {}
};

exports.default = Actions;