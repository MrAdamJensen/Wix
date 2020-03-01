'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _CRUDActions = require('../flux-imm/CRUDActions');

var _CRUDActions2 = _interopRequireDefault(_CRUDActions);

var _CRUDStore = require('../flux-imm/CRUDStore');

var _CRUDStore2 = _interopRequireDefault(_CRUDStore);

var _Excel = require('./Excel');

var _Excel2 = _interopRequireDefault(_Excel);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
ExcelWithFunc component which renders a excel table with optional functionality
*/


/*
Defining function types to be used for the actions callbacks
*/


/*
Special properties for ExcelWithFunc
-------------------------------
crudStore: the CRUD store from which to retrieve the data
crudActions: the CRUD actions with which to perform actions on the CRUD store
actions: the actions that are available by this component
*/


/*
ExcelWithFunc state fields
-------------------
actionActivated: the index of the activated action
count: number of rows in data
*/
var ExcelWithFunc = function (_Component) {
  _inherits(ExcelWithFunc, _Component);

  /*
  Component constructor
  */
  function ExcelWithFunc(props) {
    _classCallCheck(this, ExcelWithFunc);

    // Retrieving the store and store actions objects
    var _this = _possibleConstructorReturn(this, (ExcelWithFunc.__proto__ || Object.getPrototypeOf(ExcelWithFunc)).call(this, props));
    // Calling meta class constructor


    _this.crudStore = props.crudStore;
    _this.crudActions = props.crudActions;

    // Initializing component state
    _this.state = {
      actionActivated: -1,
      count: _this.crudStore.getCount()
    };

    // Listening for table data change, when notified on a change, update component copy
    _this.crudStore.addListener('change', function () {
      _this.setState({
        count: _this.crudStore.getCount()
      });
    });
    return _this;
  }

  /*
  Asserting a call to render is needed
  */


  // Setting the default values for the properties 

  // Component fields type definitions


  _createClass(ExcelWithFunc, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(newProps, newState) {
      // If current activated action did not change and current number of rows in table did not change
      // don't call render
      return newState.actionActivated !== this.state.actionActivated || newState.count !== this.state.count;
    }

    /*
    Setting action to be activated
    */

  }, {
    key: '_executeAction',
    value: function _executeAction(action) {
      this.setState({ actionActivated: action });
    }

    /*
    Finish action execution
    */

  }, {
    key: '_finishActionExecution',
    value: function _finishActionExecution() {
      this.setState({ actionActivated: -1 });
    }

    /*
    Rendering component
    */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'ExcelWithFunc' },
        '           ',
        _react2.default.createElement(
          'div',
          { className: 'ExcelWithFuncToolbar' },
          '  ',
          this._renderActions(),
          '               ',
          this._renderSearch(),
          '                '
        ),
        _react2.default.createElement(
          'div',
          { className: 'ExcelWithFuncDatagrid' },
          ' ',
          _react2.default.createElement(_Excel2.default, {
            crudStore: this.crudStore,
            crudActions: this.crudActions
          })
        ),
        this._renderAction(),
        '                   '
      );
    }

    /*
    Rendering toolbar
    */

  }, {
    key: '_renderActions',
    value: function _renderActions() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'ExcelWithFuncToolbarAction' },
        '        ',
        this.props.actions.map(function (action, index) {
          // Creating an action button
          return _react2.default.createElement(
            _Button2.default
            // Setting a callback to declare on click which action is activated when button is clicked
            ,
            { onClick: _this2._executeAction.bind(_this2, index)

              // Setting key because react demands it
              , key: index,

              className: 'ExcelWithFuncToolbarButton' },
            _this2.props.actionsDefs[index],
            '              '
          );
        })
      );
    }

    /*
    Rendering search functionality
    */

  }, {
    key: '_renderSearch',
    value: function _renderSearch() {
      return _react2.default.createElement(
        'div',
        { className: 'ExcelWithFuncToolbarSearch' },
        '                   ',
        _react2.default.createElement('input', {
          // Setting the placeholder to declare how many rows there is to search                           
          placeholder: this.state.count === 1 ? 'Search 1 record...' : 'Search ' + this.state.count + ' records...'

          // Setting callback to activate table search upon focus and callback to 
          // initiate a new search upon input change
          , onChange: this.crudActions.search,
          onFocus: this.crudActions.startSearching })
      );
    }

    /*
    Rendering action
    */

  }, {
    key: '_renderAction',
    value: function _renderAction() {
      // Asserting an acton is activated, if so calling given function to render action
      return this.state.actionActivated >= 0 ? this.props.actions[this.state.actionActivated](this._finishActionExecution.bind(this)) : null;
    }
  }]);

  return ExcelWithFunc;
}(_react.Component);

ExcelWithFunc.defaultProps = {
  actions: []
};
exports.default = ExcelWithFunc;