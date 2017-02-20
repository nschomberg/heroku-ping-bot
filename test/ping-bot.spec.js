'use strict';

let chai = require('chai');
chai.should();

let sinon = require('sinon');

let PingBot = require('../lib/ping-bot');

process.env.silent = true;

describe('ping-bot', function() {

  let herokuApps = require('./data/heroku-apps');
  let clock;
  let spy;
  let requestStub;
  let queryStub;

  let requestMock = {
    get: (endpoint) => {},
  };

  let queryMock = () => {
    return new Promise((resolve, reject) => {
      resolve(herokuApps);
    });
  };

  function setTime(hour) {
    let now = new Date();
    clock = sinon.useFakeTimers(now.setHours(hour));
  }

 it('should initialize', function(done) {
    // Given
    let bot = new PingBot();
    requestStub = sinon.stub(bot, "getRequest", () => (requestMock));
    queryStub = sinon.stub(bot.database, "queryApps", queryMock);

    // When
    bot.init().then(() => {
      // Then
      bot.scheduler.jobs.should.have.lengthOf(4);
      bot.apps.should.have.lengthOf(4);

      done();
    });


  });

  it('should ping all awake apps', function(done) {
    // Given
    let bot = new PingBot();
    requestStub = sinon.stub(bot, "getRequest", () => {return requestMock;});
    queryStub = sinon.stub(bot.database, "queryApps", queryMock);
    spy = sinon.spy(requestMock, "get");
    setTime(6);

    // When
    bot.init().then(() => {
      clock.tick(1000 * 60 * 5);

      // Then
      spy.calledThrice.should.be.true;
      spy.getCall(0).args[0].should.equal('http://bot-1.herokuapp.com');
      spy.getCall(1).args[0].should.equal('http://bot-3.herokuapp.com');
      spy.getCall(2).args[0].should.equal('http://my-app.herokuapp.com');

      requestStub.restore();
      spy.restore()
      done();
    });
  });
});
