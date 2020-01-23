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
            'Water temperature affects the growth and reproduction of plants and animals in the water.',
        unit: '°F',
    },
    [OXYGEN]: {
        name: 'Dissolved Oxygen',
        description:
            'Dissolved oxygen is a measure of the concentration of oxygen in a body of water. Plants and animals need oxygen to breath underwater.',
        unit: 'mg/L',
    },
    [PH]: {
        name: 'pH',
        description:
            'pH tells us how acidic (below 7.0pH) or basic (above 7.0pH) the water is. This determines if the water is healthy enough to support plants and animals.',
        unit: 'pH',
    },
    [TURBIDITY]: {
        name: 'Turbidity',
        description:
            'Turbidity is a measure of the cloudiness of the water. Particles, sediment and pollution may raise turbidity levels.',
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
export const VARIABLE_NEAR_EDGE_OF_HEALTHY_RANGE = 0.5;
export const VARIABLE_NOT_WITHIN_HEALTHY_RANGE = 0;
export const RATING_GOOD = 'GOOD';
export const RATING_FAIR = 'FAIR';
export const RATING_POOR = 'POOR';
export const OVERALL_RATING = 'OVERALL_RATING';
export const RATING_DESCRIPTIONS = Object.freeze({
    [RATING_GOOD]:
        'This means that conditions are ideal for wildlife to thrive. These areas should be protected to preserve this condition.',
    [RATING_FAIR]:
        'This means that conditions are declining. Conditions indicate that wildlife could be becoming stressed. These areas could be restored to GOOD status.',
    [RATING_POOR]:
        'This means that conditions might be harmful to wildlife. The conditions are not normal compared to other surrounding areas. Conditions could be improved through restoration and protection.',
});

// The nwis.waterservices endpoint was intended for historic data (> 120 days ago)
// If updating, only use a date > 120 days from the time of writing
export const LAST_LIVE_SENSOR_DATE = '2019-09-22';

// Quarterly data was taken for all surveys on or after 08/20/2019
export const LAST_QUARTERLY_SURVEY_DATE = '2019-08-20';

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

export const mapOverviewViewport = Object.freeze({
    zoom: 9,
    bearing: -30,
    pitch: 60,
    latitude: 40.2161,
    longitude: -75.0726,
    transitionDuration: 1500,
});

export const initialMapViewport = Object.freeze({
    zoom: 8,
    bearing: -25,
    pitch: 0,
    latitude: 40.2161,
    longitude: -75.0726,
});

export const primaryMapStyle =
    'mapbox://styles/azavea/cjrky7g714qpy2spmyk5u9llq';
