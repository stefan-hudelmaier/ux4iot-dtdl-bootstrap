#!/usr/bin/env node

'use strict';

import * as fs from 'fs';
import ejs from 'ejs';
import yargs from 'yargs/yargs';

import {hideBin} from 'yargs/helpers';
import * as path from "path";
import needle from "needle";

const argv = yargs(hideBin(process.argv))
    .help()
    .example('$0 -i https://.../Thermostat.json', 'Use a remote DTDL model')
    .example('$0 -i Thermostat.json', 'Use a DTDL model from the filesystem')
    .options({
        o: {
            alias: 'output',
            default: 'src/DeviceView.js',
            description: 'the React output file'
        },
        i: {
            alias: 'input',
            default: 'dtdl.json',
            description: 'the JSON file containing the DTDL model. Can be a local file or a remote URL.'
        },
        d: {
            alias: 'device-id',
            default: 'simulated-device',
            description: 'the IoT Hub device ID to use.'
        }
    }).parseSync();

console.log(argv.output);

const isTelemetry = (item: any) => {
    const type = item['@type'];
    return type === 'Telemetry' || (Array.isArray(type) && type[0] === 'Telemetry');
};
const isSupportedSchema = (item: any) => {
    const schema = item['schema'];
    return ["double", "boolean", "float", "integer", "long", "string"].includes(schema);
};


async function main() {
    const input: string = argv.input as string;
    console.log(`Generating the React file ${argv.output} from the DTDL model ${input}`);

    let modelString;
    if (input.startsWith('http')) {
        const resp = await needle("get", input);
        if (resp.statusCode !== 200) {
            throw new Error(`Error retrieving model from ${input}, got HTTP ${resp.statusCode}`);
        }
        modelString = resp.body
    } else {
        modelString = fs.readFileSync(input, {encoding: 'utf-8'});
    }

    const deviceId = argv.deviceId;

    const model = JSON.parse(modelString);
    const telemetryItems = model.contents
        .filter((item: any) => isTelemetry(item))
        .filter((item: any) => isSupportedSchema(item));

    const template = fs.readFileSync(path.resolve(__dirname, '../DeviceView.ejs'), {encoding: 'utf-8'});
    const output = ejs.render(template, {
        telemetryItems,
        deviceId
    }, {});

    fs.writeFileSync(argv.output as string, output);
    argv.output
}

main().catch(err => {
    console.log(`Error occurred: ${err}`);
    process.exit(1);
});
