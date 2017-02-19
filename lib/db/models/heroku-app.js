'use strict';

let App = require('./app');

let HerokuApp = class HerokuApp extends App {

	constructor(row) {
		super(row);
	}

	get endPoint() {
		return `http://${this.domainName}.herokuapp.com`;
	}
};
module.exports = HerokuApp;
