'use strict';

let cron = require('node-cron');
let request = require('request');

let HerokuApp = class HerokuApp {

	constructor(row) {
		this.domainName = row.domain;
		this.wakeUpTime = parseInt(row.wakeuptime);
	}

	get endPoint() {
		return `http://${this.domainName}.herokuapp.com`;
	}

	get cronMinutes() {
		return process.env.FREQ || '*/5';
	}

	get cronHours() {
		let hours = '';
		for (let i = 0; i < 18; i++) {
			hours += `${(this.wakeUpTime + i) % 24}`;
			hours += `${i < 17 ? ',' : ''}`;
		}
		return hours;
	}

	get cron() {
		return `${this.cronMinutes} ${this.cronHours} * * *`;
	}

	schedulePing() {
		let endPoint = this.endPoint;

		console.dir('==============');
		console.dir(`scheduling ${endPoint} for ${this.cron}`);
		console.dir('==============');

		cron.schedule(this.cron, function() {
			request.get(endPoint, function(err, res, body) {
				console.dir(`------------------------`);
				console.dir(`${endPoint} ATTEMPTED`);
				if (!err && res.statusCode == 200) {
					console.dir(`${endPoint} SUCCESS`);
				} else {
					console.dir(`${endPoint} ERROR: ${err}`);
				}
			});
		});
	}
};
module.exports = HerokuApp;
