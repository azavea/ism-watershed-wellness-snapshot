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
    return async (dispatch, getState) => {

        const { app: { sensorData } } = getState();

        try {
            startPollingSensor();
            const { properties: { Id, ApiAccess } } = sensor;
            const response = await makeRiverGaugeRequest(Id, ApiAccess);
            let gaugeData = ApiAccess
                ? parseRiverGaugeApiData(Id, response)
                : parseRiverGaugeCsvData(Id, response);
            // Use quarterly data feed if live sensors send back throw away values -99999
            if (Object.keys(gaugeData).length === 1) {
                const response = await makeRiverGaugeRequest(Id);
                gaugeData = parseRiverGaugeCsvData(Id, response);
            }
            setSensorData(gaugeData);
            return completePollingSensor();
        } catch (e) {
            // Fall back to default values if no previously set sensor data,
            // and API or quarterly data requests fail
            const { Id, defaultValues } = sensor;
            if (!sensorData[Id]) {
                setSensorData(defaultValues);
            }
            return failPollingSensor(e);
        }
    };
};
