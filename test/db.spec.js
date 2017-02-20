'use strict';

let chai = require('chai');
chai.should();

let sinon = require('sinon');

let Database = require('../lib/ping-bot/db');
let GoogleSpreadsheetMock = require('./data/google-spreadsheet').GoogleSpreadsheet;

process.env.silent = true;

describe('db', function() {

  let db;
  let stub;
  let getDocStub;

  beforeEach(function() {
    // runs before each test in this block
    db = new Database('test-key');

    getDocStub = sinon.stub(db, "getDoc", () => {
      return new GoogleSpreadsheetMock();
    });
  });

  afterEach(function() {
    // runs after each test in this block
    getDocStub.restore();
  });

  it('should get rows from spreadsheet', function(done) {
    // Given

    // When
    db.getRowsFromSheet().then((rows) => {
      // Then
      rows.length.should.equal(2);

      rows[0].wakeuptime.should.equal('7');
      rows[0].domain.should.equal('spoof-org');

      rows[1].wakeuptime.should.equal('4');
      rows[1].domain.should.equal('doof-org');

      done();
    });

  });

  it('should map rows to objects', function(done) {
    // Given

    // When
    db.queryApps().then((apps) => {
      // Then
      apps.length.should.equal(2);

      apps[0].wakeUpTime.should.equal(7);
      apps[0].domainName.should.equal('spoof-org');
      apps[0].endPoint.should.equal('http://spoof-org.herokuapp.com');

      apps[1].wakeUpTime.should.equal(4);
      apps[1].domainName.should.equal('doof-org');
      apps[1].endPoint.should.equal('http://doof-org.herokuapp.com');

      done();
    });
  });
});
