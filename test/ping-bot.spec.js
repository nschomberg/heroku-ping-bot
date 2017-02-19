'use strict';

let chai = require('chai');
chai.should();

let sinon = require('sinon');

let PingBot = require('../lib/ping-bot');

process.env.silent = true;

describe('ping-bot', function() {

  let herokuApps;
  let clock;

  function setTime(hour) {
    let now = new Date();
    clock = sinon.useFakeTimers(now.setHours(hour));
  }

  before(function() {
    // runs before all tests in this block
  });

  after(function() {
    // runs after all tests in this block
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });


  it('should instantiate', function() {
    // Given
    herokuApps = require('./data/heroku-apps');

    // When
    let bot = new PingBot(herokuApps);

    // Then
    bot.scheduledJobs.should.have.lengthOf(herokuApps.length);
    bot.apps.should.have.lengthOf(herokuApps.length);
  });

  it('should ping all awake apps', function() {
    // Given
    process.env.FREQ = '* *';
    setTime(1);
    let requestMock = {
      get: () => {},
    };
    let spy = sinon.spy(requestMock, "get");

    // When
    let bot = new PingBot(herokuApps, requestMock);
    clock.tick(1000);

    // Then
    spy.calledThrice.should.be.true;
    spy.getCall(0).args[0].should.equal('http://bot-1.herokuapp.com');
    spy.getCall(1).args[0].should.equal('http://bot-2.herokuapp.com');
    spy.getCall(2).args[0].should.equal('http://bot-3.herokuapp.com');

  });

  it('should leave sleeping apps alone', function() {
    // Given
    process.env.FREQ = '* *';
    setTime(6);
    let requestMock = {
      get: () => {},
    };
    let spy = sinon.spy(requestMock, "get");
    // When
    let bot = new PingBot(herokuApps, requestMock);
    clock.tick(1000);

    // Then
    spy.calledThrice.should.be.true;
    spy.getCall(0).args[0].should.equal('http://bot-1.herokuapp.com');
    spy.getCall(1).args[0].should.equal('http://bot-3.herokuapp.com');
    spy.getCall(2).args[0].should.equal('http://my-app.herokuapp.com');
  });


});
