'use strict';

let db = require('./db');
let _ = require('lodash');

let PingBot = class PingBot {
	constructor() {
		db.getApps()
			.then((apps) => {
				_.forEach(apps, (app) => {
					app.schedulePing();
				});
			});
	}
};
module.exports = PingBot;
