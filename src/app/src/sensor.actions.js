import {
    parseRiverGaugeApiData,
    parseRiverGaugeCsvData,
    makeRiverGaugeRequest,
} from './sensorUtils';

import {
    startPollingSensor,
    failPollingSensor,
    completePollingSensor,
    setSensorData,
} from './app.actions';

export function pollSensor(sensor) {
    return async (_, getState) => {

        const { app: { sensorData } } = getState();

        try {
            startPollingSensor();
            const { properties: { Id, ApiAccess }, defaultValues } = sensor;
            // Poll live sensor, if available
            const response = await makeRiverGaugeRequest(Id, ApiAccess);
            let gaugeData = ApiAccess
                ? parseRiverGaugeApiData(Id, response)
                : parseRiverGaugeCsvData(Id, response);
            // Use quarterly data feed if live sensor returns no-value data, -99999
            if (ApiAccess && Object.keys(gaugeData).length === 2) {
                const response = await makeRiverGaugeRequest(Id);
                gaugeData = parseRiverGaugeCsvData(Id, response);
            }
            // Prefer most recent sensor data available, falling back to default values
            if ((gaugeData && !sensorData[Id]) ||
                (gaugeData && sensorData && gaugeData.timestamp >= sensorData[Id].timestamp)) {
                setSensorData(gaugeData);
            } else {
                setSensorData(defaultValues);
            }
            return completePollingSensor();
        } catch (e) {
            // Fall back to default values if no previously set sensor data,
            // and API or quarterly data requests fail
            const { properties: { Id }, defaultValues } = sensor;
            if (!sensorData[Id]) {
                setSensorData(defaultValues);
            }
            return failPollingSensor(e);
        }
    };
};
