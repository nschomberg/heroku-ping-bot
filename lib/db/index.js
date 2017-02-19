'use strict';

// Modules
let GoogleSpreadsheet = require('google-spreadsheet');
let HerokuApp = require('./models/heroku-app');
let config = require('../../config.js');
let _ = require('lodash');


let getRowsFromSheet = function(sheetKey, orderby) {
	// Spin up promise
	let promise = new Promise(function(resolve, reject) {

		// Init
		let doc = new GoogleSpreadsheet(sheetKey);
		let sheet;

		// Get doc
		doc.getInfo(function(err, info) {

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
				orderby: orderby
			}, function(err, rows) {

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
};

let getApps = function() {
	return getRowsFromSheet(config.db, 'col1')
		.then((rows) => {
			let apps = [];
			_.map(rows, (row => {
				let app = new HerokuApp(row);
				apps.push(app);
			}));
			return apps;
		});
};
module.exports.getApps = getApps;
