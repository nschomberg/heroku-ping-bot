'use strict';

let _ = require('lodash');
let request = require('request');
let cron = require('node-cron');

let config = require('../../config');

let Database = require('./db');
let Scheduler = require('./scheduler');
let Ping = require('./tasks/ping');

let PingBot = class PingBot {

	constructor() {
		this.database = new Database({
			key: config.db,
		});

		this.scheduler = new Scheduler();
	}

	init() {
		return this.database.queryApps()
			.then((apps) => {
				this.apps = apps;
				this.scheduleApps();
			});
	}

	scheduleApps() {
		_.forEach(this.apps, (app) => {
			this.scheduler.schedule(
				new Ping(app, {
					frequency: config.frequency,
					request: this.getRequest(),
					verbose: !config.silent
				})
			);
		});
	}

	getRequest() {
		return request;
	}
};
module.exports = PingBot;
