'use strict';

let App = class App {

	constructor(row) {
		this.domainName = row.domain;
		this.wakeUpTime = parseInt(row.wakeuptime);
	}

	get endPoint() {
		return `http://${this.domainName}.com`;
	}

};
module.exports = App;
