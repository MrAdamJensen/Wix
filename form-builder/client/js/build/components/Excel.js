'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var Immutable = _interopRequireWildcard(_immutable);

var _Actions = require('./Actions');

var _Actions2 = _interopRequireDefault(_Actions);

var _CRUDActions = require('../flux-imm/CRUDActions');

var _CRUDActions2 = _interopRequireDefault(_CRUDActions);

var _CRUDStore = require('../flux-imm/CRUDStore');

var _CRUDStore2 = _interopRequireDefault(_CRUDStore);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormInput = require('./FormInput');

var _FormInput2 = _interopRequireDefault(_FormInput);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Excel component which displays a table given data
*/


/*
Edit state fields: the state of a cell being edited
----------------------------------------------------
row: the cell being edited row
key: cell identifier
*/


/*
Dialog state fields: the state of a row being opened in a dialog
----------------------------------------------------------------
idx: the row being opened in a dialog
type: dialog type:(info, edit and delete)
*/


/*
Special properties for Form
-------------------------------
crudStore: the CRUD store from which to retrieve the data
crudActions: the CRUD actions with which to perform actions on the CRUD store
verbose: dictating if to show all fields even if they are set to not show
*/


/*
Excel state fields
-------------------
data: excel table data
sortby: the column id to sort the table by
descending: sort in descending order
edit: table edit state
dialog: table dialog state
*/
var Excel = function (_Component) {
  _inherits(Excel, _Component);

  /*
  Component constructor
  */
  function Excel(props) {
    _classCallCheck(this, Excel);

    // Retrieving the store and store actions objects
    var _this = _possibleConstructorReturn(this, (Excel.__proto__ || Object.getPrototypeOf(Excel)).call(this, props));
    // Calling meta class constructor


    _this.crudStore = props.crudStore;
    _this.crudActions = props.crudActions;

    // Initializing component state
    _this.state = {
      data: _this.crudStore.getData(),
      schema: _this.crudStore.getSchema(),
      sortby: null,
      descending: false,
      edit: null,
      dialog: null
    };

    // Listening for table data change, when notified on a change, update component copy
    _this.crudStoreListenToken = _this.crudStore.addListener('change', function () {
      _this.setState({
        data: _this.crudStore.getData(),
        schema: _this.crudStore.getSchema()
      });
    });
    return _this;
  }

  /*
  Executed when the component is disconnecting from the DOM
  */


  // Setting the default values for the properties 

  // Component fields type definitions


  _createClass(Excel, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Since component is un mounting, remove listeners for data change
      this.crudStoreListenToken.remove();
    }

    /*
    Sorting table
    */

  }, {
    key: '_sort',
    value: function _sort(key) {
      // Asserting sorting in descending order
      var descending = this.state.sortby === key && !this.state.descending;

      // Sorting table
      this.crudActions.sort(key, descending);

      // Saving sorting type
      this.setState({
        sortby: key,
        descending: descending
      });
    }

    /*
    Setting cell editing mode
    */

  }, {
    key: '_showEditor',
    value: function _showEditor(e) {
      // Retrieving the cell that was clicked for entering editing mode
      var target = e.target;

      // Saving editing mode cell identity
      this.setState({ edit: {
          row: parseInt(target.dataset.row, 10),
          key: target.dataset.key
        } });
    }

    /*
    Updating table data with cell data that was edited
    */

  }, {
    key: '_save',
    value: function _save(e) {
      // Attempting to prevent default behaviour from any callback that will
      // be called with this event
      e.preventDefault();

      // Asserting edit mode was enabled, if not this is probably our fault
      (0, _invariant2.default)(this.state.edit, 'Messed up edit state');

      // Updating table data with cell data that was edited
      this.crudActions.updateField(this.state.edit.row, this.state.edit.key, this.refs.input.getValue());

      // Declaring cell edit mode is disabled
      this.setState({
        edit: null
      });
    }

    /*
    Opening requested dialog since an action was clicked
    */

  }, {
    key: '_actionClick',
    value: function _actionClick(rowidx, action) {
      this.setState({ dialog: { type: action, idx: rowidx } });
    }

    /*
    Retrieving delete dialog user request
    */

  }, {
    key: '_deleteConfirmationClick',
    value: function _deleteConfirmationClick(action) {
      // Closing dialog
      this.setState({ dialog: null });

      // Checking if user cancel delete request, if yes, don't do anything
      if (action === 'dismiss') {
        return;
      }

      // Retrieving dialog row(the row that was the dialog click origin) index
      var index = this._retrieve_dialog_row_origin_index();

      // Executing delete
      this.crudActions.delete(index);
    }

    /*
    Retrieving edit dialog user request
    */

  }, {
    key: '_saveDataDialog',
    value: function _saveDataDialog(action) {
      // Closing dialog
      this.setState({ dialog: null });

      // Checking if user cancel edit request, if yes, don't do anything
      if (action === 'dismiss') {
        return;
      }

      // Retrieving dialog row(the row that was the dialog click origin) index
      var index = this._retrieve_dialog_row_origin_index();

      // Executing edit
      this.crudActions.updateRecord(index, this.refs.form.getData());
    }

    /*
    Rendering component
    */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'Excel' },
        this._renderTable(),
        this._renderDialog()
      );
    }

    /*
    Rendering component dialog
    */

  }, {
    key: '_renderDialog',
    value: function _renderDialog() {
      // Asserting dialog is open, if not don't render dialog
      if (!this.state.dialog) {
        return null;
      }

      // Retrieving dialog type
      var type = this.state.dialog.type;

      // Rendering requested dialog
      switch (type) {
        case 'delete':
          return this._renderDeleteDialog();
        case 'info':
          return this._renderFormDialog(true);
        case 'edit':
          return this._renderFormDialog();
        default:
          throw Error('Unexpected dialog type ' + type);
      }
    }

    /*
    Rendering delete dialog
    */

  }, {
    key: '_renderDeleteDialog',
    value: function _renderDeleteDialog() {
      // Retrieving dialog row(the row that was the dialog click origin) index
      var index = this._retrieve_dialog_row_origin_index();

      // Retrieving dialog row
      var row = this.state.data.get(index);

      // Asserting row retrieved successfully
      (0, _invariant2.default)(row, 'Excel._renderDeleteDialog: failed retrieving dialog row');

      // Rendering dialog
      return _react2.default.createElement(
        _Dialog2.default,
        {
          modal: true // Setting it to be a modal dialog, meaning above body
          , header: 'Confirm deletion' // Setting title
          , confirmLabel: 'Delete' // Setting confirm button label
          , onAction: this._deleteConfirmationClick.bind(this) // Setting the callback to call when confirm button is clicked
        },
        'Are you sure you want to delete?',
        '   '
      );
    }

    /*
    Rendering form dialog
    */

  }, {
    key: '_renderFormDialog',
    value: function _renderFormDialog(readOnly) {
      // Retrieving dialog row(the row that was the dialog click origin) index
      var index = this._retrieve_dialog_row_origin_index();

      // Rendering dialog
      return _react2.default.createElement(
        _Dialog2.default,
        {
          modal: true // Setting it to be a modal dialog, meaning above body
          , header: readOnly ? 'Item info' : 'Edit item' // Setting title
          , confirmLabel: readOnly ? 'ok' : 'Save' // Setting confirm button label
          , hasCancel: !readOnly // Setting a cancel button only if the dialog is editable
          , onAction: this._saveDataDialog.bind(this) // Setting the callback to call when confirm button is clicked
        },
        _react2.default.createElement(_Form2.default // Creating dialog body as a form
        , { crudStore: this.crudStore // Setting form CRUD store from which to retrieve from the data
          , ref: 'form' // Setting reference for this form so that later it will be easily reachable
          , recordId: index // Setting the dialog row index so that the form can access the correct table row
          , readOnly: !!readOnly }),
        '                           '
      );
    }

    /*
    Retrieving dialog row(the row that was the dialog click origin) index
    */

  }, {
    key: '_retrieve_dialog_row_origin_index',
    value: function _retrieve_dialog_row_origin_index() {
      // Retrieving dialog row(the row that was the dialog click origin) index
      var index = this.state.dialog && this.state.dialog.idx;

      // Asserting that the dialog row index retrieved successfully
      (0, _invariant2.default)(typeof index === 'number', 'Unexpected dialog state');

      return index;
    }

    /*
    Rendering table
    */

  }, {
    key: '_renderTable',
    value: function _renderTable() {
      return _react2.default.createElement(
        'table',
        null,
        this._renderTableHead(),
        '  ',
        this._renderTableBody(),
        '  '
      );
    }

    /*
    Rendering table head
    */

  }, {
    key: '_renderTableHead',
    value: function _renderTableHead() {
      var _this2 = this;

      return _react2.default.createElement(
        'thead',
        null,
        _react2.default.createElement(
          'tr',
          null,

          // Creating each table column title from the schema
          this.state.schema.map(function (item) {
            // Asserting current column is set to be displayed, if not don't create a 
            // column title for it
            if (!item.show && !_this2.props.verbose) {
              return null;
            }

            // Retrieving column title from schema
            var title = item.label;

            // If the table is sorted by current column then add sort symbol
            if (_this2.state.sortby === item.id) {
              // Add sort symbol based on if the sorting is descending or otherwise
              title += _this2.state.descending ? ' \u2191' : ' \u2193';
            }

            // Returning column title
            return _react2.default.createElement(
              'th',
              {
                className: 'schema-' + item.id // adding class for css styling of this current header
                , key: item.id // adding key because it is requested by react

                // adding callback for sorting the table in the event that a user clicks a column header
                , onClick: _this2._sort.bind(_this2, item.id)
              },
              title,
              '                                     '
            );
          }, this),
          _react2.default.createElement(
            'th',
            { className: 'ExcelNotSortable' },
            'Actions'
          ),
          '       '
        )
      );
    }

    /*
    Rendering table body
    */

  }, {
    key: '_renderTableBody',
    value: function _renderTableBody() {
      var _this3 = this;

      return _react2.default.createElement(
        'tbody',
        { onDoubleClick: this._showEditor.bind(this) },
        ' ',
        this.state.data.map(function (row, rowidx) {
          return (
            // Creating table row
            _react2.default.createElement(
              'tr',
              {
                key: rowidx },
              '                                      ',

              // Creating row cells
              _this3.state.schema.map(function (field) {
                return field.id;
              }).map(_this3._renderTableBodyCell.bind(_this3, row, rowidx)),
              _react2.default.createElement(
                'td',
                { className: 'ExcelDataCenter' },
                _react2.default.createElement(_Actions2.default, { onAction: _this3._actionClick.bind(_this3, rowidx) }),
                ' '
              )
            )
          );
        }, this)
      );
    }

    /*
    Rendering table body cell
    */

  }, {
    key: '_renderTableBodyCell',
    value: function _renderTableBodyCell(row, rowidx, cell, idx) {
      var _this4 = this,
          _classNames;

      // Retrieving table schema
      var column_schema = this.state.schema.get(idx);

      // If schema failed to be retrieved or current column is not to be displayed then 
      // don't render column
      if (!column_schema || !column_schema.show && !this.props.verbose) {
        return null;
      }

      // Retrieving table edit state and current cell content
      var edit = this.state.edit;
      var content = row[cell];

      // Asserting current cell is editable
      // if yes then creating cell content as an editable cell
      if (edit && edit.row === rowidx && edit.key === column_schema.id) {
        // Creating form reference string
        var refStr = '$Form_{rowidx}_' + idx;

        content =
        /*Setting callback to be called when the user finished editing cell*/
        _react2.default.createElement(
          'form',
          { ref: refStr, onSubmit: this._save.bind(this) },
          _react2.default.createElement(_FormInput2.default, _extends({ getForm: function getForm() {
              return _this4.refs[refStr];
            }, ref: 'input' }, column_schema, { defaultValue: content }))
        );
      }
      // Otherwise, creating a readonly input cell
      else {
          content = _react2.default.createElement(_FormInput2.default, _extends({ ref: 'input' }, column_schema, { defaultValue: content, readOnly: true }));
        }

      // Creating cell
      return _react2.default.createElement(
        'td',
        {
          //Setting cell classes for styling
          className: (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, 'schema-' + column_schema.id, true), _defineProperty(_classNames, 'ExcelEditable', true), _defineProperty(_classNames, 'ExcelDataLeft', column_schema.align === 'left'), _defineProperty(_classNames, 'ExcelDataRight', column_schema.align === 'right'), _defineProperty(_classNames, 'ExcelDataCenter', column_schema.align !== 'left' && column_schema.align !== 'right'), _classNames)),
          key: idx // adding key because it is requested by react
          , 'data-row': rowidx // adding dataset row to be able to identify cell identity
          , 'data-key': column_schema.id },
        '    ',
        content,
        '                       '
      );
    }
  }]);

  return Excel;
}(_react.Component);

Excel.defaultProps = {
  verbose: false
};
exports.default = Excel;