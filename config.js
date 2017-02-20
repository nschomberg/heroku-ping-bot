'use strict';

let db = process.env.DB;
module.exports.db = db;

let frequency = process.env.FREQ || '*/5';
module.exports.frequency = frequency;

let silent = process.env.SILENT;
module.exports.silent = silent;
