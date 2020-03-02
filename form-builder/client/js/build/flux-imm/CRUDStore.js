'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fbemitter = require('fbemitter');

var _immutable = require('immutable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
A store of data where one can listen for changes
*/


/*
Defining the type of the store type, either a local storage store or a server store
*/


/*
Defining the type of a local store
-----------------------------------
storeType: the type of the store, in this case it is local
schema: in a local store, a schema must be provided
*/


/*
Defining the type of a server store
-----------------------------------
storeType: the type of the store, in this case it is server
serverURL: in a server store, a server url must be provided
*/


/*
Defining the type of a temp store
-----------------------------------
storeType: the type of the store, in this case it is temporary, i.e in memory
schema: in a temporary store, a schema must be provided
*/


/*
Defining type of a store init object, it must have the required data
to initialize the store
*/
var CRUDStore = function () {

  /*
  Component constructor
  */
  function CRUDStore(initObj) {
    _classCallCheck(this, CRUDStore);

    // Initializing fields
    this.type = initObj.storeType;

    // Initializing store emitter to inform on store changes
    this.emitter = new _fbemitter.EventEmitter();

    // Initializing store
    this._init(initObj);
  }

  /*
  Initializing store
  */

  // Properties type definitions


  _createClass(CRUDStore, [{
    key: '_init',
    value: function _init(initObj) {
      // Asserting init object is for a local store
      if (initObj.storeType === 'local') {
        // Initializing local store
        this._initLocalStore(initObj);
      } // Asserting init object is for a server store
      else if (initObj.storeType === 'server') {
          // Initializing server store 
          this._initServerStore(initObj);
        }
        // Asserting temp store
        else if (initObj.storeType === 'temp') {
            // Initializing temp 
            this._initTempStore(initObj);
          } else {
            // Declaring unrecognized store type
            throw 'CRUDStore._init: unknown store type ' + initObj.storeType;
          }
    }

    /*
    Initializing local store
    */

  }, {
    key: '_initLocalStore',
    value: function _initLocalStore(initObj) {
      // Retrieving schema
      this.schema = (0, _immutable.List)(initObj.schema);

      // Retrieving data if it is available in local storage
      var storage = 'localStorage' in window ? localStorage.getItem('data') : null;

      // If storage not available, initializing it
      if (!storage || initObj.reset) {
        // Initializing data from schema
        this._initializeDataFromSchema();
      } else {
        // If storage available, retrieve it
        this.data = (0, _immutable.List)(JSON.parse(storage));
      }
    }

    /*
    Initializing server store
    */

  }, {
    key: '_initServerStore',
    value: function _initServerStore(initObj) {
      throw 'CRUDStore._initServerStore: Not implemented';
    }

    /*
    Initializing temp store
    */

  }, {
    key: '_initTempStore',
    value: function _initTempStore(initObj) {
      // Retrieving schema
      this.schema = (0, _immutable.List)(initObj.schema);

      // Initializing data from schema
      this._initializeDataFromSchema();
    }

    /*
    Initializing data from schema
    */

  }, {
    key: '_initializeDataFromSchema',
    value: function _initializeDataFromSchema() {
      // Initializing initial record
      var initialRecord = {};
      this.schema.forEach(function (item) {
        return initialRecord[item.id] = item.sample;
      });

      // Adding initial record to data
      this.data = (0, _immutable.List)([initialRecord]);
    }

    /*
    Returning data
    */

  }, {
    key: 'getData',
    value: function getData() {
      return this.data;
    }

    /*
    Returning schema
    */

  }, {
    key: 'getSchema',
    value: function getSchema() {
      return this.schema;
    }

    /*
    Setting the data with a new data
    */

  }, {
    key: 'setData',
    value: function setData(newData) {
      var commit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // Updating data
      this.data = newData;

      // If a commit is requested, commit the change
      // Assert this is a local store, if so update local storage
      if (commit && this.type === 'local' && 'localStorage' in window) {
        localStorage.setItem('data', JSON.stringify(newData));
      }
      // Assert this is a server store, if so update server storage
      else if (commit && this.type === 'server') {
          throw 'CRUDStore.setData: not implemented';
        } else if (!(this.type === 'local' || this.type === 'server' || this.type === 'temp')) {
          // Declaring unrecognized store type
          throw 'CRUDStore.setData: unknown store type ' + this.type;
        }

      // Informing all listeners to the change in data
      this.emitter.emit('change');
    }

    /*
    Setting schema with a new schema
    */

  }, {
    key: 'setSchema',
    value: function setSchema(newSchema) {
      // Asserting this is a temp store since schema update is only possible for 
      // this type of store 
      if (this.type === 'temp') {
        // Changing schema
        this.schema = (0, _immutable.List)(newSchema);

        // Resetting data since schema and current data might be incompatible
        // also, this line is responsible for alerting any listeners for change in store
        this.setData(this.data.clear());
      } else {
        throw 'CRUDStore.setSchema: Schema update only possible for \n             temp store type where the current type is ' + this.type;
      }
    }

    /*
    Adding listener for data change
    */

  }, {
    key: 'addListener',
    value: function addListener(eventType, fn) {
      this.emitter.addListener(eventType, fn);
    }

    /*
    Returning number of rows in data
    */

  }, {
    key: 'getCount',
    value: function getCount() {
      return this.data.count();
    }

    /*
    Returning a record
    */

  }, {
    key: 'getRecord',
    value: function getRecord(recordId) {
      return this.data.get(recordId);
    }
  }]);

  return CRUDStore;
}();

exports.default = CRUDStore;