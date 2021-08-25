import './App.css';
import React from 'react';
//import * as ux4iot from "ux4iot-react";
import * as ux4iot from "./fake-ux4iot.js";
import 'semantic-ui-css/semantic.css'
import { Statistic } from 'semantic-ui-react'

const UX4IOT_ADMIN_CONNECTION_STRING = "<YOUR ADMIN CONNECTION STRING";
const ux4iotClient = ux4iot.initDevMode(UX4IOT_ADMIN_CONNECTION_STRING);

const useTelemetry = () => {
  return 42.0
}

const TelemetryValue = props => {
  const value = useTelemetry(props.deviceId, props.telemetryKey);
  return <Statistic>
    <Statistic.Value>{value}</Statistic.Value>
    <Statistic.Label>{props.label}</Statistic.Label>
  </Statistic>;
}

const DeviceView = () => {
  return <>
    <TelemetryValue deviceId='simulated-device' label="temp" telemetryKey="temperature" />
    <TelemetryValue deviceId='simulated-device' label="pressure" telemetryKey="pressure" />
  </>;
}

function App() {

  return (
    <div className="App">
      <ux4iot.Context.Provider value={ux4iotClient}>
        <DeviceView />
      </ux4iot.Context.Provider>
    </div>
  );
}

export default App;
