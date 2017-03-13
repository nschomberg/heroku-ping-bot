'use strict';

let appRows = require('./app-rows');

let GoogleSpreadsheet = class GoogleSpreadsheet {
  constructor(sheetKey) {
    this.sheetKey = sheetKey;
  }

  getInfo(callback) {
    let err;
    let info = new Info();

    callback(err, info);
  }
};
module.exports.GoogleSpreadsheet = GoogleSpreadsheet;

class Info {
  constructor() {}

  get worksheets() {
    return [new Worksheet()];
  }
}

class Worksheet {
  constructor() {
    this.title = 'test-worksheet';
    this.id = 'worksheet-1234';
  }

  getRows(options, callback) {
    let err;
    let rows = appRows;

    callback(err, rows);
  }
}
