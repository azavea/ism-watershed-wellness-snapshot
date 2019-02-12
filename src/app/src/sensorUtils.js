import axios from 'axios';
import Papa from 'papaparse';

export function makeRiverGaugeRequest(id, isApiRequest) {
    const url = isApiRequest
        ? `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${id}`
        : `https://nwis.waterdata.usgs.gov/nwis/qwdata/?site_no=${id}&agency_cd=USGS&inventory_output=retrieval&rdb_inventory_output=value&begin_date=2018-11-01&end_date=2019-02-11&TZoutput=0&pm_cd_compare=Greater%20than&radio_parm_cds=all_parm_cds&qw_attributes=0&format=rdb&qw_sample_wide=wide&rdb_qw_attributes=0&date_format=YYYY-MM-DD&rdb_compression=value&submitted_form=brief_list`;
    return axios.get(url);
}

function parseCsvString(csvString) {
    const data = Papa.parse(csvString, { header: true, comments: "#", dynamicTyping: true });
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

    //TODO: parse data for vars
    return { [id]: data };
}

export function parseRiverGaugeCsvData(id, csvString) {
    const {
        data,
    } = csvString;

    const parsedData = parseCsvString(data);

    // TODO: parse data for vars
    return { [id]: parsedData.data[1] };
}
