'use strict';

let config = require('../../../config');

function getCronMinutes() {
	return config.frequency;
}

function getCronHours(wakeUpTime) {
	let hours = '';
	for (let i = 0; i < 18; i++) {
		hours += `${(wakeUpTime + i) % 24}`;
		hours += `${i < 17 ? ',' : ''}`;
	}
	return hours;
}

let getCronFromWakeUpTime = (wakeUpTime) => {
	return `${getCronMinutes()} ${getCronHours(wakeUpTime)} * * *`;
};
module.exports.getCronFromWakeUpTime = getCronFromWakeUpTime;
