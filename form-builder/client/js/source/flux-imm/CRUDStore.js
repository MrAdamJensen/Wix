/* @flow */

import {EventEmitter} from 'fbemitter';
import {List} from 'immutable';

/*
Defining the type of the store type, either a local storage store or a server store
*/
type storeType = 'local' | 'server'

/*
Defining the type of a local store
-----------------------------------
storeType: the type of the store, in this case it is local
schema: in a local store, a schema must be provided
*/
type storeInitLocal = {
  storeType: 'local';
  schema: Array<Object>;
}

/*
Defining the type of a server store
-----------------------------------
storeType: the type of the store, in this case it is server
serverURL: in a server store, a server url must be provided
*/
type storeInitServer = {
  storeType: 'server';
  serverURL: 'string';
}

/*
Defining type of a store init object, it must have the required data
to initialize the store
*/
type storeInit = storeInitLocal | storeInitServer

/*
A store of data where one can listen for changes
*/
class CRUDStore {
  // Properties type definitions
  data: List<Object>;
  schema: List<Object>;
  emitter: EventEmitter;
  type: storeType;
  serverURL: string

  /*
  Component constructor
  */
  constructor(initObj: storeInit) {
    // Initializing fields
    this.type = initObj.storeType

    // Initializing store emitter to inform on store changes
    this.emitter = new EventEmitter();

    // Initializing store
    this._init(initObj)
  }

  /*
  Initializing store
  */
  _init(initObj: storeInit) {
    // Asserting init object is for a local store
    if (initObj.storeType === 'local') {
      // Initializing local store
      this._initLocalStore(initObj)
    } // Asserting init object is for a server store
    else if (initObj.storeType === 'server') {
      // Initializing server store 
      this._initServerStore(initObj)
    }
    else {
      // Declaring unrecognized store type
      throw `CRUDStore._init: unknown store type ${initObj.storeType}`
    }
  }

  /*
  Initializing local store
  */
  _initLocalStore(initObj: storeInitLocal) {
    // Retrieving schema
    this.schema = List(initObj.schema);

    // Retrieving data if it is available in local storage
    const storage = 'localStorage' in window
      ? localStorage.getItem('data')
      : null;
    
    // If storage not available, initializing it
    if (!storage) {
      // Initializing initial record
      let initialRecord = {};
      this.schema.forEach(item => initialRecord[item.id] = item.sample);

      // Adding initial record to data
      this.data = List([initialRecord]);
    } else {
      // If storage available, retrieve it
      this.data = List(JSON.parse(storage));
    }
  }

  /*
  Initializing server store
  */
  _initServerStore(initObj: storeInitServer) {
    throw 'CRUDStore._initServerStore: Not implemented'
  }

  /*
  Returning data
  */
  getData(): List<Object> {
    return this.data;
  }
  
  /*
  Returning schema
  */
  getSchema(): List<Object> {
    return this.schema;
  }
  
  /*
  Setting the data with a new data
  */
  setData(newData: List<Object>, commit: boolean = true) {
    // Updating data
    this.data = newData;

    // If a commit is requested, commit the change
    // Assert this is a local store, if so update local storage
    if (commit && this.type === 'local' && 'localStorage' in window) {
      localStorage.setItem('data', JSON.stringify(newData));      
    }
    // Assert this is a server store, if so update server storage
    else if (commit && this.type === 'server') {
      throw 'CRUDStore.setData: not implemented'
    }
    else {
      // Declaring unrecognized store type
      throw `CRUDStore.setData: unknown store type ${this.type}`
    }

    // Informing all listeners to the change in data
    this.emitter.emit('change');
  }
  
  /*
  Adding listener for data change
  */
  addListener(eventType: string, fn: Function) {
   this. emitter.addListener(eventType, fn);
  }
  
  /*
  Returning number of rows in data
  */
  getCount(): number {
    return this.data.count();
  }
  
  /*
  Returning a record
  */
  getRecord(recordId: number): ?Object {
    return this.data.get(recordId);
  }
}

export default CRUDStore
