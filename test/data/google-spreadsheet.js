'use strict';

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
    return [ new Worksheet() ];
  }
}

class Worksheet {
  constructor() {}

  getRows(options, callback) {
    let err;
    let rows = [
      {
        domain: 'spoof-org',
        wakeuptime: '7',
      },
      {
        domain: 'doof-org',
        wakeuptime: '4',
      },
    ];

    callback(err, rows);
  }
}
