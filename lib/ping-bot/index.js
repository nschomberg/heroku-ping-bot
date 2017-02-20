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
			let pingTask = new Ping(app, {
				frequency: config.frequency,
				request: this.getRequest(),
			});

			this.log('==================');
			this.log(`scheduling ${pingTask.app.endPoint} ${pingTask.cronExpression}`);

			this.scheduler.schedule(pingTask);
		});
	}

	getRequest() {
		return request;
	}

	log(message) {
		console.dir(message);
	}
};
module.exports = PingBot;
