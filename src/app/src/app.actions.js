import { createAction } from 'redux-act';

import {
    parseRiverGaugeApiData,
    parseRiverGaugeCsvData,
    makeRiverGaugeRequest,
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

export function pollSensor(sensor) {
    return async () => {
        try {
            startPollingSensor();

            const {
                properties: { Id, ApiAccess },
            } = sensor;

            const response = await makeRiverGaugeRequest(Id, ApiAccess);
            const sensorData = ApiAccess
                ? parseRiverGaugeApiData(Id, response)
                : parseRiverGaugeCsvData(Id, response);

            completePollingSensor(sensorData);
        } catch (e) {
            failPollingSensor(e);
        }
    };
}
