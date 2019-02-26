import { createAction } from 'redux-act';

import {
    parseCsvString,
    parseRiverGaugeApiData,
    parseRiverGaugeCsvData,
    makeRiverGaugeRequest,
    transformSensorDataToRatings,
} from './sensorUtils';

export const hideIntro = createAction('Hide intro screen');
export const selectSensor = createAction('Select sensor');
export const deselectSensor = createAction('Deselect sensor');
export const showSensorModal = createAction('Show sensor modal');
export const hideSensorModal = createAction('Hide sensor modal');
export const startPollingSensor = createAction('Start polling sensor for data');
export const failPollingSensor = createAction('Failed polling sensor for data');
export const completePollingSensor = createAction(
    'Complete polling sensor for data'
);
export const updateSensorRatings = createAction('Update sensor ratings');

export function pollSensor(sensor) {
    return async (_, getState) => {
        try {
            startPollingSensor();

            const {
                properties: { Id, ApiAccess },
            } = sensor;

            const response = await makeRiverGaugeRequest(Id, ApiAccess);
            let sensorData = ApiAccess
                ? parseRiverGaugeApiData(Id, response.data.value.timeSeries)
                : parseRiverGaugeCsvData(Id, parseCsvString(response.data));

            // Use quarterly data feed if live sensors send back throw away values -99999
            if (Object.keys(sensorData).length === 1) {
                const response = await makeRiverGaugeRequest(Id);
                sensorData = parseRiverGaugeCsvData(Id, response);
            }
            completePollingSensor(sensorData);
            return updateSensorRatings(transformSensorDataToRatings(sensorData));
        } catch (e) {
            // Fall back to default values if no previously set sensor data,
            // and API or quarterly data requests fail
            const {
                properties: { Id },
                defaultValues
            } = sensor;

            const {
                app: { sensorData },
            } = getState();

            if (!sensorData[Id]) {
                completePollingSensor(defaultValues);
            }
            return failPollingSensor(e);
        }
    };
}
