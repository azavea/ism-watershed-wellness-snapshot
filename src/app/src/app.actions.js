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

            // Live sensor data parsing will returns {id, timestamp} if the response
            // has no data. In that case, check if quarterly CSV data exists
            if (ApiAccess && Object.keys(sensorResponseData).length === 2) {
                const response = await makeRiverGaugeRequest(Id);
                sensorResponseData = parseRiverGaugeCsvData(Id, response);
            }

            // Prefer most recent sensor data available
            if (
                sensorResponseData &&
                sensorData &&
                sensorResponseData.timestamp >= sensorData[Id].timestamp
            ) {
                completePollingSensor(sensorResponseData);
                updateSensorRatings(
                    transformSensorDataToRatings(sensorResponseData)
                );
            }
        } catch (e) {
            // The app will always show data, albeit dummy initial data or stale sensor data,
            // if on-going sensor requests fail
            failPollingSensor(e);
        }
    };
}
