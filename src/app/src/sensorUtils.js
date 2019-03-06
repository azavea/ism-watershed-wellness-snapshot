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
    LAST_LIVE_SENSOR_DATE,
    LAST_QUARTERLY_SURVEY_DATE,
    msPerHour,
    msPerMonth,
    msPerWeek,
    msPerYear,
} from './constants';
import sensors from './sensors.json';
import positiveFishIcon from './img/fish_positive.svg';
import positiveBackground from './img/health_background_positive.svg';
import warningFishIcon from './img/fish_warning.svg';
import warningBackground from './img/health_background_warning.svg';
import negativeFishIcon from './img/fish_negative.svg';
import negativeBackground from './img/health_background_negative.svg';

export function makeRiverGaugeRequest(id, isApiRequest) {
    const commaSeparatedCodes = Object.keys(VARIABLE_CODES).reduce(
        (acc, key) => acc.concat(`${VARIABLE_CODES[key]},`),
        ''
    );
    // trailing commas break the request
    const cleanedCodes = commaSeparatedCodes.slice(0, -1);

    const url = isApiRequest
        ? `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${id}&param=${cleanedCodes}&startDT=${LAST_LIVE_SENSOR_DATE}`
        : `https://nwis.waterdata.usgs.gov/nwis/qwdata/?site_no=${id}&agency_cd=USGS&inventory_output=retrieval&rdb_inventory_output=value&begin_date=${LAST_QUARTERLY_SURVEY_DATE}&TZoutput=0&pm_cd_compare=Greater%20than&radio_parm_cds=all_parm_cds&qw_attributes=0&format=rdb&qw_sample_wide=wide&rdb_qw_attributes=0&date_format=YYYY-MM-DD&rdb_compression=value&submitted_form=brief_list`;
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
    // API data sends variable data in the same order mirrored in VARIABLES
    const extractedVariableData = VARIABLES.reduce(
        (acc, variable, idx) => {
            const apiVariableData = data[idx];
            if (apiVariableData) {
                // Step backwards in time until we find actual live sensor readings
                const descendingTimeApiVariableData = Array.from(
                    apiVariableData.values[0].value
                ).reverse();
                const sensorReading = descendingTimeApiVariableData.find(
                    sensorReading =>
                        Number(sensorReading.value) !==
                        apiVariableData.variable.noDataValue
                );
                return Object.assign(acc, {
                    [variable]: Number(sensorReading.value),
                    timestamp: new Date(sensorReading.dateTime),
                });
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
    const timestamp = new Date(
        `${dataRow.sample_dt} ${dataRow.sample_start_time_datum_cd}`
    );

    const extractedVariableData = VARIABLES.reduce(
        (acc, variable) => {
            const code = `p${VARIABLE_CODES[variable]}`;
            return Object.assign(acc, { [variable]: dataRow[code] || 0 });
        },
        { id, timestamp }
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

export function getFishIconForVariableRating(rating) {
    // TODO #69: Figure out how the warning state is defined
    if (rating === VARIABLE_WITHIN_HEALTHY_RANGE) {
        return positiveFishIcon;
    } else if (rating === VARIABLE_NOT_WITHIN_HEALTHY_RANGE) {
        return negativeFishIcon;
    } else {
        return warningFishIcon;
    }
}

export function getFishBackgroundForVariableRating(rating) {
    // TODO #69: Figure out how the warning state is defined
    if (rating === VARIABLE_WITHIN_HEALTHY_RANGE) {
        return positiveBackground;
    } else if (rating === VARIABLE_NOT_WITHIN_HEALTHY_RANGE) {
        return negativeBackground;
    } else {
        return warningBackground;
    }
}

export function getClassNameFromVariableRating(rating) {
    // TODO #69: Figure out how the warning state is defined
    return rating === 0 ? 'negative' : 'positive';
}

export function getFishIconForOverallRating(rating) {
    if (rating === RATING_GOOD) {
        return positiveFishIcon;
    } else if (rating === RATING_POOR) {
        return negativeFishIcon;
    } else {
        return warningFishIcon;
    }
}

export function getClassNameFromOverallRating(rating) {
    if (rating === RATING_GOOD) {
        return 'positive';
    } else if (rating === RATING_POOR) {
        return 'negative';
    } else {
        return 'warning';
    }
}

export function msToHours(ms) {
    return Math.round(ms / (1000 * 60 * 60));
}

export function msToMins(ms) {
    return Math.round(ms / (1000 * 60));
}

export function getElapsedTimeLabel(elapsedTimeInMS) {
    // Live sensors data can become stale
    // Return a sensible message around elapsed time since last data update

    if (elapsedTimeInMS === null) {
        return false;
    }

    const now = new Date();
    const midnightToday = new Date(new Date().setHours(0, 0, 0, 0));
    const midnightYesterday = new Date(
        new Date().setDate(now.getDate() - 1)
    ).setHours(0, 0, 0, 0);

    if (elapsedTimeInMS > msPerYear) {
        return 'over a year ago';
    } else if (elapsedTimeInMS > msPerMonth) {
        return 'in the past year';
    } else if (elapsedTimeInMS > msPerWeek) {
        return 'in the past month';
    } else if (elapsedTimeInMS > now - midnightYesterday) {
        return 'in the past week';
    } else if (elapsedTimeInMS > now - midnightToday) {
        return 'yesterday';
    } else if (elapsedTimeInMS > msPerHour) {
        return `${msToHours(elapsedTimeInMS)} hours ago`;
    } else if (elapsedTimeInMS >= 0) {
        return `${msToMins(elapsedTimeInMS)} minutes ago`;
    } else {
        return false;
    }
}

export function getMostRecentDateFromList(dates) {
    return Math.max(...dates);
}

export function getElapsedTimeSince(date) {
    return date === 0 ? null : new Date().getTime() - date;
}
