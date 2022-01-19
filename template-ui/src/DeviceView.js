import React from 'react';
import {Ux4iotContextProvider, useTelemetry} from "ux4iot-react";
import 'semantic-ui-css/semantic.css'
import { Statistic } from 'semantic-ui-react'

const UX4IOT_ADMIN_CONNECTION_STRING = "<YOUR ADMIN CONNECTION STRING";

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
      <Ux4iotContextProvider
        options={{ adminConnectionString: UX4IOT_ADMIN_CONNECTION_STRING }}>
        <DeviceView />
      </Ux4iotContextProvider>
    </div>
  );
}

export default App;
