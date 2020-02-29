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
class CRUDStore{
  // Properties type definitions
  data: List<Object>;
  schema: List<Object>;
  emitter: EventEmitter;
  type: storeType;
  serverURL: string

  /*
  Component constructor
  */
  constructor(storeInit: storeInit) {
    // Initializing fields
    this.type = storeInit.storeType

    // Initializing store emitter to inform on store changes
    this.emitter = new EventEmitter();

    // Initializing store
    this._init()
  }

  _init() {
    schema = initialSchema;
    const storage = 'localStorage' in window
      ? localStorage.getItem('data')
      : null;
    if (!storage) {
      let initialRecord = {};
      schema.forEach(item => initialRecord[item.id] = item.sample);
      data = List([initialRecord]);
    } else {
      data = List(JSON.parse(storage));
    }
  }

  getData(): List<Object> {
    return data;
  }
  
  getSchema(): Array<Object> {
    return schema;
  }
  
  setData(newData: List<Object>, commit: boolean = true) {
    data = newData;
    if (commit && 'localStorage' in window) {
      localStorage.setItem('data', JSON.stringify(newData));      
    }
    emitter.emit('change');
  }
  
  addListener(eventType: string, fn: Function) {
    emitter.addListener(eventType, fn);
  }
  
  getCount(): number {
    return data.count();
  }
  
  getRecord(recordId: number): ?Object {
    return data.get(recordId);
  }
  
};

export default CRUDStore
