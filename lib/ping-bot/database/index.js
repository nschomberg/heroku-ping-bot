'use strict';

let config = require('../../../config');
let Tanuki = require('tanuki');

let GoogleSpreadsheet = Tanuki.GoogleSpreadsheet;
let Mapping = Tanuki.Mapping;
let Model = Tanuki.Model;
let Schema = Tanuki.Schema;
let Spreadsheet = Tanuki.Spreadsheet;

let Database = class Database {
  constructor() {
    this.db = new Tanuki();
  }

  init() {
    return this.db.loadSpreadsheet(this.getGoogleSpreadsheet())
      .then(() => {
        return new Model(this.herokuAppSchema, this.db, this.db.worksheets[0].id);
      });
  }

  getGoogleSpreadsheet() {
    return new GoogleSpreadsheet(config.db);
  }

  get herokuAppSchema() {
    return new Schema([
      new Mapping('domain', 'domainName'),
      new Mapping('domain', 'endPoint', (domain) => (`http://${domain}.herokuapp.com`)),
      new Mapping('Wake Up Time', 'wakeUpTime', parseInt),
    ]);
  }
};
module.exports = Database;
