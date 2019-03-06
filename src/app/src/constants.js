import SENSORS from './sensors';

export const POLLING_INTERVAL = 600000;

export const TEMPERATURE = 'TEMPERATURE';
export const OXYGEN = 'OXYGEN';
export const PH = 'PH';
export const TURBIDITY = 'TURBIDITY';

// Explicitly ordered to match the rigid ordering of the live sensor API response
export const VARIABLES = [TEMPERATURE, OXYGEN, PH, TURBIDITY];

export const VARIABLE_DETAILS = {
    [TEMPERATURE]: {
        name: 'Water Temperature',
        description:
            'Water temperature affects the growth and reproduction of living organisms as well as water density.',
        unit: '°F',
    },
    [OXYGEN]: {
        name: 'Dissolved Oxygen',
        description:
            'A measure of the concentration of oxygen dissolved in a body of water, relative to the maximum concentration.',
        unit: 'mg/L',
    },
    [PH]: {
        name: 'pH',
        description:
            'pH is a quantitative measure of the acidity (below 7.0pH) or basicity (above 7.0pH) in a body of water.',
        unit: 'pH',
    },
    [TURBIDITY]: {
        name: 'Turbidity',
        description:
            'Turbidity is a measurement of the cloudiness in a body of water. This cloudiness is caused by the presense of particles that can be invisible to the human eye.',
        unit: 'NTU',
    },
};

// Variables are rather named by USGS parameter code in the quarterly CSV data
export const VARIABLE_CODES = {
    [TEMPERATURE]: '00010',
    [OXYGEN]: '00300',
    [PH]: '00400',
    [TURBIDITY]: '63680',
};

export const VARIABLE_WITHIN_HEALTHY_RANGE = 1;
export const VARIABLE_NOT_WITHIN_HEALTHY_RANGE = 0;
export const RATING_GOOD = 'GOOD';
export const RATING_FAIR = 'FAIR';
export const RATING_POOR = 'POOR';
export const OVERALL_RATING = 'OVERALL_RATING';

// The selected live sensors last worked on 12/04/2018
export const LAST_LIVE_SENSOR_DATE = '2018-12-04';

// Quarterly data was taken for all surveys on or after 8/01/2018
export const LAST_QUARTERLY_SURVEY_DATE = '2018-08-01';

export const DEFAULT_SENSOR_DATA = SENSORS.features.reduce(
    (acc, sensor) =>
        Object.assign(acc, {
            [sensor.properties.Id]: sensor.defaultValues,
        }),
    {}
);

const msPerSecond = 1000;
export const msPerMinute = msPerSecond * 60;
export const msPerHour = msPerMinute * 60;
export const msPerDay = msPerHour * 24;
export const msPerWeek = msPerDay * 7;
export const msPerMonth = msPerDay * 30; // roughly a month, 30 days
export const msPerYear = msPerWeek * 52;
