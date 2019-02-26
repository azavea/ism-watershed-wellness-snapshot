import times from 'lodash/times';

import { parseRiverGaugeApiData, parseRiverGaugeCsvData } from '../sensorUtils';

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
