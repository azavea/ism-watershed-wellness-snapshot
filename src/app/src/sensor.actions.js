
import {
    parseRiverGaugeApiData,
    parseRiverGaugeCsvData,
    makeRiverGaugeRequest,
} from './sensorUtils';

import {
    startPollingSensor,
    failPollingSensor,
    setSensorData,
} from './app.actions';

export function pollSensor(sensor) {
    return async (dispatch) => {
        dispatch(startPollingSensor);
        try {
            const { properties: { Id, ApiAccess } } = sensor;
            const response = await makeRiverGaugeRequest(Id, ApiAccess);
            const sensorData = ApiAccess
                ? parseRiverGaugeApiData(Id, response)
                : parseRiverGaugeCsvData(Id, response);
            return dispatch(setSensorData(sensorData));
        } catch (e) {
            window.console.log(e);
            return dispatch(failPollingSensor());
        }
    };
};