'use strict';

let db = process.env.DB;
module.exports.db = db;

console.dir(process.env.FREQ);

let frequency = process.env.FREQ || '*/5';
module.exports.frequency = frequency;
