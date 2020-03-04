/* @flow */

import CRUDStore from './CRUDStore';
import {List} from 'immutable';
import invariant from 'invariant';

/*
A store actions interface capable of performing action on a store data
*/
class CRUDActions {
  // Properties type definitions
  crudStore: CRUDStore;
  _preSearchData: ?List<Object>

  /*
  Component constructor
  */
  constructor(crudStore: CRUDStore) {
    // Initializing fields
    this.crudStore = crudStore;
    this._preSearchData = null;
  }

  /*
  Adding a record to the store data
  */
  create(newRecord: Object) {
    // Asserting store is a server store
    if (this.crudStore.type === 'server') {
      // Executing record create action to server
      this.crudStore.executeServerDatabaseAction('create', newRecord)
    }
    else {
      // Creating new record in temporary store
      this.crudStore.setData(this.crudStore.getData().unshift(newRecord));
    }
  }

  /*
  Updating record in the store data
  */
  updateRecord(recordId: number, newRecord: Object) {
    // Retrieving old record
    let oldRecord: Object = this.crudStore.getData().get(recordId)

    // Iterating over the new record to update and setting the invisible fields
    // value's so that they cannot change since invisible fields are not editable
    // in any circumstance
    for (let field: any of (this.crudStore.getSchema(): List<Object>)) {
      // Asserting current field invisible, if yes saving the old value
      if (field.invisible) {
        newRecord[field.id] = oldRecord[field.id]
      }
    }
    
    // Asserting store is a server store
    if (this.crudStore.type === 'server') {
      // Executing record update action to server
      this.crudStore.executeServerDatabaseAction('update', newRecord)
    }
    else {
      // Updating record in temporary store
      this.crudStore.setData(this.crudStore.getData().set(recordId, newRecord));
    }
  }

    /*
  Deleting a record from the store data
  */
 delete(recordId: number) {
    // Asserting store is a server store
    if (this.crudStore.type === 'server') {
      // Executing record delete action to server
      this.crudStore.executeServerDatabaseAction('delete', this.crudStore.getData().get(recordId))
    }
    else {
      // Retrieving store data
      let data: List<Object> = this.crudStore.getData();

      // Deleting a record from the store data and updating store data
      this.crudStore.setData(data.remove(recordId));
    }
  }

  /*
  Updating a field on a record in the store data
  */
  updateField(recordId: number, key: string, value: string|number) {
    // Retrieving the record that is requested to go over the field update 
    let record = this.crudStore.getData().get(recordId);

    // Asserting record retrieved successfully
    if (record) {
      // Updating field of record
      record[key] = value;

      // Updating record
      this.updateRecord(recordId, record)
    }
    else {
      throw "CRUDActions.updateField: record wasn't retrieved successfully"
    }
  }

  /*
  Initializing a search on the store data
  */
  startSearching() {
    // Initializing the pre search data so that the data can be recovered when search is finished
    this._preSearchData = this.crudStore.getData();
  }

  /*
  Searching data, i.e, filter the store data to records that have the search string
  */
  search(e: Event) {
    // Retrieving input html element with the search string
    const target = ((e.target: any): HTMLInputElement);

    // Retrieving search string
    const needle: string = target.value.toLowerCase();

    // Asserting search was initialized
    invariant(this._preSearchData && this._preSearchData != null, "CRUDActions.search: search wasn't initialized");

    // If search string wasn't retrieved successfully or it is an empty string, stop search
    if (!needle) {
      this.crudStore.setData(this._preSearchData);
      return;
    }

    // Retrieving fields of data
    const fields: List<string> = this.crudStore.getSchema().map(item => item.id);

    // Retrieving all records that have the search string
    let searchData;
    if (this._preSearchData && this._preSearchData != null) {
      searchData = this._retrieveSearchData(this._preSearchData, fields, needle)

      // Updating data in store without committing since this update is temporary until
      // search in finished
      this.crudStore.setData(searchData);
    }
  }

  /*
  // Retrieving all records that have the search string
  */
  _retrieveSearchData(data: List<Object>, fields: List<string>, needle: string) {
    // Retrieving all records that have the search string
    return data.filter(row => {
      // Searching for search string in all fields
      for (let f = 0; f < fields.size; f++) {
        // Asserting current field has search string, if yes return true and if no 
        // continue searching
        if (row[fields.get(f)].toString().toLowerCase().indexOf(needle) > -1) {
          return true;
        }
      }

      // Declaring search string was not found in any field
      return false;
    });
  }

  /*
  Equality compare between strings or numbers
  */
  _eq(a: (string|number), b: (string|number), descending: boolean): number {
    // Initializing result
    let res: number = 0;

    // If both are numbers, make a number comparision
    if (typeof a === 'number' && typeof b === 'number') {
      res = a - b;
    // If not both are numbers, compare them as strings
    } else {
      res = String(a).localeCompare(String(b));
    }

    // Returning result based on if this is a descending or ascending order
    return descending ? -1 * res : res;
  }

  /*
  Sorting data in store
  */
  sort(key: string, descending: boolean) {
    // Sorting data in store using in the given field
    this.crudStore.setData(this.crudStore.getData().sort(
      (a, b) => this._eq(a[key], b[key], descending)
    ));
  }
}

export default CRUDActions
