import './App.css';
import React from 'react';
//import {initux4iot, Ux4iotContext} from "ux4iot-react";
import 'semantic-ui-css/semantic.css'
import { Statistic } from 'semantic-ui-react'

// Usually this would go through custom backend, not directly to ux4iot
//const CUSTOM_BACKEND = 'http://ux4iot-a7j2kf3n47mmg.westeurope.azurecontainer.io/admin/token';
const UX4IOT_URL = 'http://ux4iot-a7j2kf3n47mmg.westeurope.azurecontainer.io';
//const CUSTOM_BACKEND = 'http://127.0.0.1:8081/admin/token';
//const UX4IOT_URL = 'http://127.0.0.1:8081';


/*
const ux4iot = initux4iot(UX4IOT_URL, localAccessRequest => {
  return axios.put(CUSTOM_BACKEND, localAccessRequest, {
    headers: {
      //Authorization: "Bearer 4322923"
    }
  })
});
 */

//const ux4iot = initux4iot(UX4IOT_URL, null, 'rt-123456789');

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
  </>
}

function App() {

  return (
    <div className="App">
{/*
      <Ux4iotContext.Provider value={ux4iot}>
*/}
        <DeviceView />
{/*
      </Ux4iotContext.Provider>
*/}
    </div>
  );
}

export default App;
