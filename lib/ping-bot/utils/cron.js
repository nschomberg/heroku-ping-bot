'use strict';

function getCronMinutes() {
	return process.env.FREQ || '*/5';
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
