'use strict';

let App = class App {

	constructor(row) {
		this.domainName = row.domain;
		this.wakeUpTime = parseInt(row.wakeuptime);
	}

};
module.exports = App;
