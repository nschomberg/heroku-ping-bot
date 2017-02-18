'use strict';

let HerokuApp = class HerokuApp {

	constructor(row) {
		this.domainName = row.domain;
		this.wakeUpTime = parseInt(row.wakeuptime);
	}

	get endPoint() {
		return `http://${this.domainName}.herokuapp.com`;
	}
};
module.exports = HerokuApp;
