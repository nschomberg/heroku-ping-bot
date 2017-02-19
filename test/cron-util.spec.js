'use strict';

let chai = require('chai');
chai.should();

let sinon = require('sinon');

process.env.silent = true;

describe('cron-util', function() {

  let cron;

  before(function() {
    // runs before all tests in this block
    process.env.FREQ = '*/3';
    cron = require('../lib/ping-bot/utils/cron');
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

  it('should generate the right cron expression vanilla', function() {
    // Given

    // When
    let expression = cron.getCronFromWakeUpTime(0);

    // Then
    expression.should.equal('*/3 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17 * * *');
  });

  it('should generate the right cron expression spanning 2 days', function() {
    // Given

    // When
    let expression = cron.getCronFromWakeUpTime(18);

    // Then
    expression.should.equal('*/3 18,19,20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11 * * *');
  });

});
