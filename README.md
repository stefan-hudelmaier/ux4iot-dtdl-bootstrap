## Usage

Run this via npx:

```
ux4iot-dtdl-bootstrap --input my-dtdl-model.json --output DeviceView.js
```

You can find samples for DTDL models here: https://github.com/Azure/opendigitaltwins-dtdl/tree/master/DTDL/v2/samples

For a list of DTDL models of actual hardware look here: https://github.com/Azure/iot-plugandplay-models/tree/main/dtmi

## Workflow for updating template

* Work on the React application in `template-ui`. You can work on it using: `npm run start` (with Hot-Reload)
* Once you are satisfied, merge your changes of `template-ui/src/DeviceView.js` *manually* into `Device.ejs`, e.g. using 
  `vimdiff DeviceView.ejs template-ui/src/DeviceView.js`
* Publish a new version of the bootstrap app which bundles `DeviceView.ejs`

## Planned Features

* Not only support `Telemetry`, but also `Property`. At first read-only properties, later read-write properties.
  See https://docs.microsoft.com/en-us/azure/iot-develop/concepts-digital-twin?WT.mc_id=IoT-MVP-5004034#read-only-property 
  and https://docs.microsoft.com/en-us/azure/iot-develop/concepts-convention for the mapping between DTDL and Device Twin.
* Also support commands
* Support URLs for DTDL models
