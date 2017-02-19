'use strict';

let _ = require('lodash');
let cronUtil = require('./utils/cron');
let request = require('request');
let cron = require('node-cron');

let PingBot = class PingBot {
	constructor(apps, requestMock) {
		if (requestMock) {
			request = requestMock;
		}
		this.apps = apps;
		this.scheduleAll();
	}

	log(log) {
		if (!process.env.silent) {
			console.log(log);
		}
	}

	scheduleAll() {
		this.scheduledJobs = [];

		for (let app of this.apps) {
			this.scheduledJobs.push(this.schedulePing(app));
		}
	}

	schedulePing(app) {
		let endPoint = app.endPoint;
		let cronExpression = cronUtil.getCronFromWakeUpTime(app.wakeUpTime);

		this.log(`scheduling ${endPoint} for ${cronExpression}`);
		this.log('==============');

		try {
			return cron.schedule(cronExpression, () => {
				request.get(endPoint, (err, res, body) => {
					this.log(`------------------------`);
					this.log(`${endPoint} ATTEMPTED`);
					if (!err && res.statusCode == 200) {
						this.log(`${endPoint} SUCCESS`);
					} else {
						this.log(`${endPoint} ERROR: ${err}`);
					}
				});
			});
		} catch (e) {
			this.log('spoof');
			this.log(e);
		}
	}


};
module.exports = PingBot;
