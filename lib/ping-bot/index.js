'use strict';

let db = require('./db');
let _ = require('lodash');
let cronUtil = require('./utils/cron');
let request = require('request');
let cron = require('node-cron');

let PingBot = class PingBot {
	constructor() {
		let bot = this;
		db.getApps()
			.then((apps) => {
				bot.apps = apps;
				bot.scheduleAll();
			});
	}

	scheduleAll() {
		this.scheduledJobs = [];

		for (let app of this.apps) {
			this.schedulePing(app);
		}
	}

	schedulePing(app) {
		let endPoint = app.endPoint;
		let cronExpression = cronUtil.getCronFromWakeUpTime(app.wakeUpTime);

		console.dir(`scheduling ${endPoint} for ${cronExpression}`);
		console.dir('==============');
		try {
			this.scheduledJobs.push(
				cron.schedule(cronExpression, function() {
					request.get(endPoint, function(err, res, body) {
						console.dir(`------------------------`);
						console.dir(`${endPoint} ATTEMPTED`);
						if (!err && res.statusCode == 200) {
							console.dir(`${endPoint} SUCCESS`);
						} else {
							console.dir(`${endPoint} ERROR: ${err}`);
						}
					});
				})
			);
		} catch (e) {
			console.dir('spoof');
			console.dir(e);
		}
		//

		//);
	}


};
module.exports = PingBot;
