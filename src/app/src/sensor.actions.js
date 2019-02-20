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
    return async () => {
        try {
            startPollingSensor();
            const { properties: { Id, ApiAccess } } = sensor;
            const response = await makeRiverGaugeRequest(Id, ApiAccess);
            const sensorData = ApiAccess
                ? parseRiverGaugeApiData(Id, response)
                : parseRiverGaugeCsvData(Id, response);
            setSensorData(sensorData);
            return completePollingSensor();
        } catch (e) {
            return failPollingSensor(e);
        }
    };
};
