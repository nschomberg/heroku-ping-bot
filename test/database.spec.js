'use strict';

process.env.SILENT = true;

let chai = require('chai');
chai.should();

let sinon = require('sinon');

let Database = require('../lib/ping-bot/database');
let GoogleSpreadsheetMock = require('./data/google-spreadsheet')
  .GoogleSpreadsheet;

describe('database', function() {

  let db;
  let getDocStub;

  beforeEach(function() {
    // runs before each test in this block
    db = new Database();

    getDocStub = sinon.stub(db, "getGoogleSpreadsheet", () => {
      return new GoogleSpreadsheetMock();
    });
  });

  afterEach(function() {
    // runs after each test in this block
    getDocStub.restore();
  });

  it('should map rows to objects', function(done) {
    // Given

    // When
    db.init()
      .then((HerokuApp) => {
        HerokuApp.query({})
          .then((apps) => {
            // Then
            apps.length.should.equal(4);

            apps[0].wakeUpTime.should.equal(0);
            apps[0].domainName.should.equal('bot-1');
            apps[0].endPoint.should.equal('http://bot-1.herokuapp.com');

            apps[1].wakeUpTime.should.equal(8);
            apps[1].domainName.should.equal('bot-2');
            apps[1].endPoint.should.equal('http://bot-2.herokuapp.com');

            apps[2].wakeUpTime.should.equal(16);
            apps[2].domainName.should.equal('bot-3');
            apps[2].endPoint.should.equal('http://bot-3.herokuapp.com');

            apps[3].wakeUpTime.should.equal(5);
            apps[3].domainName.should.equal('my-app');
            apps[3].endPoint.should.equal('http://my-app.herokuapp.com');

            done();
          });
      });
  });
});
