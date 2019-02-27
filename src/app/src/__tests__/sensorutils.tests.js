import times from 'lodash/times';

import {
    parseRiverGaugeApiData,
    parseRiverGaugeCsvData,
    transformSensorDataToRatings,
    calculateOverallSensorRating,
} from '../sensorUtils';

import {
    VARIABLE_WITHIN_HEALTHY_RANGE,
    VARIABLE_NOT_WITHIN_HEALTHY_RANGE,
    RATING_GOOD,
    RATING_FAIR,
    RATING_POOR,
} from '../constants';

it('parses real-time sensor data', () => {
    const createTestSensorReading = () => {
        return {
            values: [
                {
                    value: [
                        {
                            value: 1,
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
    };

    const actualParsedSensorData = parseRiverGaugeApiData('0', testSensorData);

    expect(actualParsedSensorData).toEqual(expectedParsedSensorData);
});

it('parses quarterly sensor data', () => {
    const testSensorData = [
        {},
        {
            p00010: 5.2,
            p00300: 12.4,
            p00400: 7.3,
            p63680: 3.3,
            sample_dt: '2018-12-04',
            sample_start_time_datum_cd: 'EST',
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
