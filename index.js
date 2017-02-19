'use strict';

let express = require('express');
let app = express();

let PingBot = require('./lib/ping-bot');
let db = require('./lib/db');


db.getApps()
	.then((apps) => {
		return new PingBot(apps);
	})
	.then((bot) => {
		app.set('port', (process.env.PORT || 5000));

		app.use(express.static(__dirname + '/public'));

		// views is directory for all template files
		app.set('views', __dirname + '/views');
		app.set('view engine', 'ejs');

		app.get('/', function(request, response) {
			response.render('pages/index', {
				bot: bot,
			});
		});

		app.listen(app.get('port'), function() {
			console.log('Node app is running on port', app.get('port'));
		});
	});
