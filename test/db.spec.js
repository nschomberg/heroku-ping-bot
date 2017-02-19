'use strict';

let chai = require('chai');
chai.should();

let sinon = require('sinon');

let db = require('../lib/db');
let GoogleSpreadsheetMock = require('./data/google-spreadsheet').GoogleSpreadsheet;

process.env.silent = true;

describe('db', function() {

  let stub;
  let getDocStub;

  before(function() {
    // runs before all tests in this block
  });

  after(function() {
    // runs after all tests in this block
  });

  beforeEach(function() {
    // runs before each test in this block
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
    db.getApps().then((apps) => {
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
