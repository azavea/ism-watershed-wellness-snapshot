import { createAction } from 'redux-act';

export const hideIntro = createAction('Hide intro screen');
export const selectSensor = createAction('Select sensor');
export const deselectSensor = createAction('Deselect sensor');
export const showSensorModal = createAction('Show sensor modal');
export const hideSensorModal = createAction('Hide sensor modal');
export const setSensorData = createAction('Set sensor data');
export const startPollingSensor = createAction('Start polling sensor for data');
export const failPollingSensor = createAction('Failed polling sensor for data');
export const completePollingSensor = createAction('Complete polling sensor for data');
