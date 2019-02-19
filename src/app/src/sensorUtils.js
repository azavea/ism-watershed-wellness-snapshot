import axios from 'axios';
import Papa from 'papaparse';

import {
    VARIABLES,
    VARIABLE_CODES,
} from './constants';

export function makeRiverGaugeRequest(id, isApiRequest) {
    let commaSeparatedCodes = '';
    Object.keys(VARIABLE_CODES).forEach(key => commaSeparatedCodes += `${VARIABLE_CODES[key]},`);
    // trailing commas break the request
    const cleanedCodes = commaSeparatedCodes.slice(0, -1);

    const url = isApiRequest
        ? `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${id}&param=${cleanedCodes}`
        : `https://nwis.waterdata.usgs.gov/nwis/qwdata/?site_no=${id}&agency_cd=USGS&inventory_output=retrieval&rdb_inventory_output=value&begin_date=2018-11-01&TZoutput=0&pm_cd_compare=Greater%20than&radio_parm_cds=all_parm_cds&qw_attributes=0&format=rdb&qw_sample_wide=wide&rdb_qw_attributes=0&date_format=YYYY-MM-DD&rdb_compression=value&submitted_form=brief_list`;
    return axios.get(url);
}

function parseCsvString(csvString) {
    const data = Papa.parse(csvString, { header: true, comments: "#", dynamicTyping: true, skipEmptyLines: true });
    return data;
}

export function parseRiverGaugeApiData(id, apiData) {
    const {
        data: {
            value: {
                timeSeries: data,
            },
        },
    } = apiData;

    const extractedVariableData = VARIABLES.reduce((acc, variable, idx) => {
        const apiVariableData = data[idx];
        if (apiVariableData) {
            const sensorValue = Number(apiVariableData.values[0].value[0].value);
            return sensorValue !== apiVariableData.variable.noDataValue
                ? Object.assign(acc, {[variable]: sensorValue })
                : Object.assign(acc, {[variable]: 0 });
        }
        return acc;
    }, { id });

    return extractedVariableData;
}

export function parseRiverGaugeCsvData(id, csvString) {
    const {
        data,
    } = csvString;

    const parsedData = parseCsvString(data);
    const dataRow = parsedData.data.pop();

    const extractedVariableData = VARIABLES.reduce((acc, variable) => {
        const code = `p${VARIABLE_CODES[variable]}`;
        return Object.assign(acc, {[variable]: dataRow[code] || 0 });
    }, { id });

    return extractedVariableData;
}
