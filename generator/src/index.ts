'use strict';

import * as fs from 'fs';
import ejs from 'ejs';

const isTelemetry = (item: any) => {
	const type = item['@type'];
	console.log(type);
	return type === 'Telemetry' || (Array.isArray(type) && type[0] === 'Telemetry');
};

async function main() {
	console.log('Hello world');
	const model = JSON.parse(fs.readFileSync('./Thermostat.json', { encoding: 'utf-8' }));
	console.dir(model);

	const telemetryItems = model.contents.filter((item: any) => isTelemetry(item)); // map((contentsItem: any) => console.log(contentsItem));
	console.dir(telemetryItems);
	console.log(await ejs.renderFile('test.ejs', {}, {}));
}

main().catch(err => {
	console.log(`Error occurred: ${err}`);
	process.exit(1);
});
