'use strict';

// Modules
let GoogleSpreadsheet = require('google-spreadsheet');
let HerokuApp = require('./models/heroku-app');
let _ = require('lodash');

let Database = class Database {
	constructor(config) {
		this.key = config.key;
	}

	getDoc() {
		return new GoogleSpreadsheet(this.key);
	}

	getRowsFromSheet() {
		// Spin up promise
		let promise = new Promise((resolve, reject) => {

			// Init
			let doc = this.getDoc();
			let sheet;

			// Get doc
			doc.getInfo((err, info) => {
				// Handle error
				if (err) {
					reject(err);
				}

				// Grab first sheet
				try {
					sheet = info.worksheets[0];
				} catch (e) {
					reject(e);
					return;
				}

				// Grab rows
				sheet.getRows({
					offset: 1,
					limit: 100,
					orderby: 'col1'
				}, (err, rows) => {
					// Handle Error
					if (err) {
						reject(err);
					}

					// Resolve Promise
					resolve(rows);
				});
			});
		});
		return promise;
	}

	queryApps() {
		return this.getRowsFromSheet()
			.then((rows) => {
				let apps = [];
				_.map(rows, (row => {
					let app = new HerokuApp(row);
					apps.push(app);
				}));
				return apps;
			});
	}
};
module.exports = Database;
