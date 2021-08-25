#!/usr/bin/env node

'use strict';

import * as fs from 'fs';
import ejs from 'ejs';
import yargs from 'yargs/yargs';

import {hideBin} from 'yargs/helpers';
import * as path from "path";

const argv = yargs(hideBin(process.argv))
    .help()
    .options({
        o: {
            alias: 'output',
            default: 'src/DeviceView.js',
            description: 'the React output'
        },
        i: {
            alias: 'input',
            default: 'dtdl.json',
            description: 'the JSON file containing the DTDL model'
        }
    }).parseSync();

console.log(argv.output);

const isTelemetry = (item: any) => {
    const type = item['@type'];
    return type === 'Telemetry' || (Array.isArray(type) && type[0] === 'Telemetry');
};

async function main() {
    console.log(`Generating the React file ${argv.output} from the DTDL model ${argv.input}`);
    const model = JSON.parse(fs.readFileSync(argv.input as string, {encoding: 'utf-8'}));
	const telemetryItems = model.contents.filter((item: any) => isTelemetry(item));

    const template = fs.readFileSync(path.resolve(__dirname, '../DeviceView.ejs'), {encoding: 'utf-8'});
    const output = ejs.render(template, {
        telemetryItems: [
            {
                telemetryKey: 'temperature'
            }
        ]
    }, {});

    fs.writeFileSync(argv.output as string, output);
    argv.output
}

main().catch(err => {
    console.log(`Error occurred: ${err}`);
    process.exit(1);
});
