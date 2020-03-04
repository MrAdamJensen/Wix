/* @flow */

import {EventEmitter} from 'fbemitter';
import {List} from 'immutable';

/*
Defining the type of the store type, either a server store or a temp store
*/
type storeType = 'server' | 'temp'

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
Defining the type of a temp store
-----------------------------------
storeType: the type of the store, in this case it is temporary, i.e in memory
schema: in a temporary store, a schema must be provided
*/
type storeInitTemp = {
  storeType: 'temp';
  schema: Array<Object>;
}

/*
Defining type of a store init object, it must have the required data
to initialize the store
*/
type storeInit = storeInitServer | storeInitTemp

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
    // Asserting init object is for a server store
    if (initObj.storeType === 'server') {
      // Initializing server store 
      this._initServerStore(initObj)
    }
    // Asserting temp store
    else if (initObj.storeType === 'temp') {
      // Initializing temp 
      this._initTempStore(initObj)
    }
    else {
      // Declaring unrecognized store type
      throw `CRUDStore._init: unknown store type ${initObj.storeType}`
    }
  }

  /*
  Initializing server store
  */
  _initServerStore(initObj: storeInitServer) {
    // Initializing store
    this.data = List()
    this.schema = List()
    this.serverURL = initObj.serverURL

    // Fetching data from server
    this.executeServerDatabaseAction('refresh', {})
  }

  /*
  Initializing temp store
  */
 _initTempStore(initObj: storeInitTemp) {
    // Retrieving schema
    this.schema = List(initObj.schema);

    // Initializing data from schema
    this._initializeDataFromSchema()
  }

  /*
  Initializing data from schema
  */
  _initializeDataFromSchema() {
    // Initializing initial record
    let initialRecord = {};
    this.schema.forEach(item => initialRecord[item.id] = item.sample);

    // Adding initial record to data
    this.data = List([initialRecord]);
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
  setData(newData: List<Object>) {
    // Updating data
    this.data = newData;

    // Informing all listeners to the change in data
    this.emitter.emit('change');
  }

  /*
  Executing a server database action
  */
  executeServerDatabaseAction(actionType: ('create' | 'update' | 'delete' | 'refresh'), databaseRecord: Object) {
    // Initializing form data object to store the post request data
    let formData = new FormData();

    // Initializing a xml http request object to prepare for server
    // interaction to send the new record to the server
    let oReq = new XMLHttpRequest();

    // Insert the database record and action type to the post data
    formData.append("data", JSON.stringify(databaseRecord));
    formData.append("action", actionType); 

    // Adding an event listeners to receive server response for success and failure
    oReq.addEventListener("load", function (evt: any) {
      // Parsing server response
      let parsedServerResponse = JSON.parse(oReq.responseText)

      // Updating local schema
      this.schema = List(parsedServerResponse.schema)
      
      // Updating local store data
      this.setData(List(parsedServerResponse.data))
    }.bind(this));
    oReq.addEventListener("error", function (evt: any) { 
      // Declaring error occurred
      console.log(`CRUDStore.executeServerDatabaseAction: Error has occurred !!!!`)
    }.bind(this));
    
    // Sending a request to the server to execute the database action
    oReq.open("POST", this.serverURL);
    oReq.send(formData);
  }
  
  /*
  Setting schema with a new schema
  */
  setSchema(newSchema: (Array<Object> | List<Object>)) {
    // Asserting this is a temp store since schema update is only possible for 
    // this type of store 
    if (this.type === 'temp') {
      // Changing schema
      this.schema = List(newSchema)

      // Resetting data since schema and current data might be incompatible
      // also, this line is responsible for alerting any listeners for change in store
      this.setData(this.data.clear())
    }
    else {
      throw `CRUDStore.setSchema: Schema update only possible for 
             temp store type where the current type is ${this.type}`
    }
  }

  /*
  Adding listener for data change
  */
  addListener(eventType: string, fn: Function) {
   return this.emitter.addListener(eventType, fn);
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
