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
        const {
            properties: { Id, ApiAccess },
            defaultValues
        } = sensor;

        const {
            app: { sensorData },
        } = getState();

        try {
            startPollingSensor();

            const response = await makeRiverGaugeRequest(Id, ApiAccess);
            let sensorResponseData = ApiAccess
                ? parseRiverGaugeApiData(Id, response.data.value.timeSeries)
                : parseRiverGaugeCsvData(Id, parseCsvString(response.data));

            // Use quarterly data feed if live sensor returns no-value data, -99999
            if (ApiAccess && Object.keys(sensorResponseData).length === 2) {
                const response = await makeRiverGaugeRequest(Id);
                sensorResponseData = parseRiverGaugeCsvData(Id, response);
            }

            // Prefer most recent sensor data available, falling back to default values
            if ((sensorResponseData && !sensorData[Id]) ||
                (sensorResponseData && sensorData && sensorResponseData.timestamp >= sensorData[Id].timestamp)) {
                completePollingSensor(sensorResponseData);
                updateSensorRatings(transformSensorDataToRatings(sensorResponseData));
            } else {
                completePollingSensor(defaultValues);
                updateSensorRatings(transformSensorDataToRatings(defaultValues));
            }
        } catch (e) {
            // Fall back to default values if no previously set sensor data,
            // and API or quarterly data requests fail
            if (!sensorData[Id]) {
                completePollingSensor(defaultValues);
                updateSensorRatings(transformSensorDataToRatings(defaultValues));
            }
            failPollingSensor(e);
        }
    };
}
