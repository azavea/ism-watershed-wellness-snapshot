import axios from 'axios';
import Papa from 'papaparse';
import find from 'lodash/find';
import values from 'lodash/values';

import {
    VARIABLES,
    VARIABLE_CODES,
    VARIABLE_WITHIN_HEALTHY_RANGE,
    VARIABLE_NOT_WITHIN_HEALTHY_RANGE,
    OVERALL_RATING,
    RATING_GOOD,
    RATING_FAIR,
    RATING_POOR,
} from './constants';
import sensors from './sensors.json';

export function makeRiverGaugeRequest(id, isApiRequest) {
    const commaSeparatedCodes = Object.keys(VARIABLE_CODES).reduce(
        (acc, key) => acc.concat(`${VARIABLE_CODES[key]},`),
        ''
    );
    // trailing commas break the request
    const cleanedCodes = commaSeparatedCodes.slice(0, -1);

    const url = isApiRequest
        ? `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${id}&param=${cleanedCodes}`
        : `https://nwis.waterdata.usgs.gov/nwis/qwdata/?site_no=${id}&agency_cd=USGS&inventory_output=retrieval&rdb_inventory_output=value&begin_date=2018-08-01&TZoutput=0&pm_cd_compare=Greater%20than&radio_parm_cds=all_parm_cds&qw_attributes=0&format=rdb&qw_sample_wide=wide&rdb_qw_attributes=0&date_format=YYYY-MM-DD&rdb_compression=value&submitted_form=brief_list`;
    return axios.get(url);
}

export function parseCsvString(csvString) {
    const data = Papa.parse(csvString, {
        header: true,
        comments: '#',
        dynamicTyping: true,
        skipEmptyLines: true,
    });

    return data.data;
}

export function parseRiverGaugeApiData(id, data) {
    const extractedVariableData = VARIABLES.reduce(
        (acc, variable, idx) => {
            const apiVariableData = data[idx];
            if (apiVariableData) {
                const sensorValue = Number(
                    apiVariableData.values[0].value[0].value
                );
                return sensorValue !== apiVariableData.variable.noDataValue
                    ? Object.assign(acc, { [variable]: sensorValue })
                    : acc;
            }
            return acc;
        },
        { id }
    );

    return extractedVariableData;
}

export function parseRiverGaugeCsvData(id, data) {
    if (!data.length) {
        return false;
    }
    const dataRow = data.slice(-1)[0];

    const extractedVariableData = VARIABLES.reduce(
        (acc, variable) => {
            const code = `p${VARIABLE_CODES[variable]}`;
            return Object.assign(acc, { [variable]: dataRow[code] || 0 });
        },
        { id }
    );

    return extractedVariableData;
}

export const getSensorByProp = (prop, value) =>
    find(sensors.features, ({ properties }) => properties[prop] === value);

export function calculateOverallSensorRating(sensorRatings) {
    const totalValue = values(sensorRatings).reduce((acc, r) => acc + r, 0);

    if (totalValue >= 4) {
        return RATING_GOOD;
    } else if (totalValue >= 2) {
        return RATING_FAIR;
    } else {
        return RATING_POOR;
    }
}

export function transformSensorDataToRatings(sensorData) {
    const sensor = getSensorByProp('Id', sensorData.id).properties;
    const sensorRatings = VARIABLES.reduce((acc, variable) => {
        const { lower, upper } = sensor.HealthyRanges[variable];
        const variableValue = sensorData[variable];
        const isVariableWithinHealthyRange =
            lower <= variableValue && variableValue <= upper;

        return Object.assign(acc, {
            [variable]: isVariableWithinHealthyRange
                ? VARIABLE_WITHIN_HEALTHY_RANGE
                : VARIABLE_NOT_WITHIN_HEALTHY_RANGE,
        });
    }, {});

    return {
        id: sensorData.id,
        sensorRatings: {
            ...sensorRatings,
            [OVERALL_RATING]: calculateOverallSensorRating(sensorRatings),
        },
    };
}
