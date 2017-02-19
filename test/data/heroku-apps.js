'use strict';

let HerokuApp = require('../../lib/db/models/heroku-app');

let appRows = require('./app-rows');

let apps = [];

for (let row of appRows){
  apps.push(
    new HerokuApp(row)
  );
}
module.exports = apps;
