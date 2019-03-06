import times from 'lodash/times';

import {
    parseRiverGaugeApiData,
    parseRiverGaugeCsvData,
    transformSensorDataToRatings,
    calculateOverallSensorRating,
    getElapsedTimeLabel,
} from '../sensorUtils';

import {
    VARIABLE_WITHIN_HEALTHY_RANGE,
    VARIABLE_NOT_WITHIN_HEALTHY_RANGE,
    RATING_GOOD,
    RATING_FAIR,
    RATING_POOR,
    msPerHour,
    msPerYear,
    msPerDay,
    msPerMinute,
} from '../constants';

it('parses real-time sensor data', () => {
    const date = '2018-12-04T14:30:00.000-05:00';
    const createTestSensorReading = () => {
        return {
            values: [
                {
                    value: [
                        {
                            value: 1,
                            dateTime: date,
                        },
                    ],
                },
            ],
            variable: {
                noDataValue: -999999,
            },
        };
    };

    const testSensorData = times(4, createTestSensorReading);

    const expectedParsedSensorData = {
        id: '0',
        TEMPERATURE: 1,
        OXYGEN: 1,
        PH: 1,
        TURBIDITY: 1,
        timestamp: new Date(date),
    };

    const actualParsedSensorData = parseRiverGaugeApiData('0', testSensorData);

    expect(actualParsedSensorData).toEqual(expectedParsedSensorData);
});

it('parses quarterly sensor data', () => {
    const date = '2018-12-04';
    const timezone = 'EST';

    const testSensorData = [
        {},
        {
            p00010: 5.2,
            p00300: 12.4,
            p00400: 7.3,
            p63680: 3.3,
            sample_dt: date,
            sample_start_time_datum_cd: timezone,
            sample_tm: '12:00',
            site_no: 1438500,
        },
    ];

    const actualParsedSensorData = parseRiverGaugeCsvData('0', testSensorData);

    const expectedParsedSensorData = {
        id: '0',
        TEMPERATURE: 5.2,
        OXYGEN: 12.4,
        PH: 7.3,
        TURBIDITY: 3.3,
        timestamp: new Date(`${date} ${timezone}`),
    };

    expect(actualParsedSensorData).toEqual(expectedParsedSensorData);
});

it('calculates an overall sensor rating', () => {
    const expectedGoodSensorRatings = {
        TEMPERATURE: VARIABLE_WITHIN_HEALTHY_RANGE,
        OXYGEN: VARIABLE_WITHIN_HEALTHY_RANGE,
        PH: VARIABLE_WITHIN_HEALTHY_RANGE,
        TURBIDITY: VARIABLE_WITHIN_HEALTHY_RANGE,
    };

    const expectedFairSensorRatings = {
        TEMPERATURE: VARIABLE_NOT_WITHIN_HEALTHY_RANGE,
        OXYGEN: VARIABLE_NOT_WITHIN_HEALTHY_RANGE,
        PH: VARIABLE_WITHIN_HEALTHY_RANGE,
        TURBIDITY: VARIABLE_WITHIN_HEALTHY_RANGE,
    };

    const expectedPoorSensorRatings = {
        TEMPERATURE: VARIABLE_NOT_WITHIN_HEALTHY_RANGE,
        OXYGEN: VARIABLE_NOT_WITHIN_HEALTHY_RANGE,
        PH: VARIABLE_NOT_WITHIN_HEALTHY_RANGE,
        TURBIDITY: VARIABLE_NOT_WITHIN_HEALTHY_RANGE,
    };

    expect(RATING_GOOD).toEqual(
        calculateOverallSensorRating(expectedGoodSensorRatings)
    );
    expect(RATING_FAIR).toEqual(
        calculateOverallSensorRating(expectedFairSensorRatings)
    );
    expect(RATING_POOR).toEqual(
        calculateOverallSensorRating(expectedPoorSensorRatings)
    );
});

it('transforms sensor data to sensor ratings', () => {
    const testParsedSensorData = {
        id: '01438500',
        TEMPERATURE: 5.2,
        OXYGEN: 12.4,
        PH: 7.3,
        TURBIDITY: 3.3,
        timestamp: new Date(),
    };

    const expectedSensorRatings = {
        TEMPERATURE: VARIABLE_NOT_WITHIN_HEALTHY_RANGE,
        OXYGEN: VARIABLE_NOT_WITHIN_HEALTHY_RANGE,
        PH: VARIABLE_WITHIN_HEALTHY_RANGE,
        TURBIDITY: VARIABLE_WITHIN_HEALTHY_RANGE,
        OVERALL_RATING: RATING_FAIR,
    };

    const actualSensorRatings = transformSensorDataToRatings(
        testParsedSensorData
    );

    expect(actualSensorRatings.sensorRatings).toEqual(expectedSensorRatings);
});

it('transforms sensor data timestamps to the expected message', () => {
    // time in milliseconds (ms)
    const overOneYearAgo = msPerYear + 1;
    const oneYearAgo = msPerYear;
    const oneDayAgo = msPerDay;
    const twoDaysAgo = msPerDay * 2;
    const tenDaysAgo = msPerDay * 10;
    const tenHoursAgo = msPerHour * 10;
    const minutesAgo = msPerMinute * 59;

    expect(getElapsedTimeLabel(overOneYearAgo)).toEqual('over a year ago');
    expect(getElapsedTimeLabel(oneYearAgo)).toEqual('in the past year');
    expect(getElapsedTimeLabel(tenDaysAgo)).toEqual('in the past month');
    expect(getElapsedTimeLabel(twoDaysAgo)).toEqual('in the past week');
    expect(getElapsedTimeLabel(oneDayAgo)).toEqual('yesterday');
    expect(getElapsedTimeLabel(tenHoursAgo)).toEqual('10 hours ago');
    expect(getElapsedTimeLabel(minutesAgo)).toEqual('59 minutes ago');
    expect(getElapsedTimeLabel(0)).toEqual('0 minutes ago');
    expect(getElapsedTimeLabel(null)).toEqual(false);
});
