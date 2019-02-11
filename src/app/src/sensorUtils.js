import axios from 'axios';

// const variables = {
//     TEMPERATURE_DESCRIPTION: 'Temperature, water, degrees Celsius',
//     DISCHARGE_DESCRIPTION: 'Discharge, cubic feet per second',
//     GAGE_HEIGHT_DESCRIPTION: 'Gage height, feet',
//     CONDUCTANCE_DESCRIPTION: 'Specific conductance, water, unfiltered, microsiemens per centimeter at 25 degrees Celsius',
//     OXYGEN_VALUE_DESCRIPTION: 'Dissolved oxygen, water, unfiltered, milligrams per liter',
//     OXYGEN_PERCENTAGE_DESCRIPTION: 'Dissolved oxygen, water, unfiltered, percent of saturation',
//     PH_DESCRIPTION: 'pH, water, unfiltered, field, standard units',
//     TURBIDITY_DESCRIPTION: 'Turbidity, water, unfiltered, monochrome near infra-red LED light, 780-900 nm, detection angle 90 +-2.5 degrees, formazin nephelometric units (FNU)',
//     PRESSURE_DESCRIPTION: 'Barometric pressure (BP), uncorrected, pounds per square inch',
//     RADIATION_DESCRIPTION: 'Photosynthetically active radiation (average flux density on a horizontal surface during measurement interval), micromoles of photons per square meter per second',
//     FLUORESCENCE_DESCRIPTION: 'Chlorophyll fluorescence (fChl), water, in situ, fluorometric method, excitation at 470 +-15 nm, emission at 685 +-20 nm, relative fluorescence units (RFU)',
//     PRECIPITATION_DESCRIPTION: 'Precipitation, total, inches',
//     DEPTH_DESCRIPTION: 'Depth to water level, feet below land surface',
// };

// const {
//     variables: {
//         TEMPERATURE_DESCRIPTION,
//         DISCHARGE_DESCRIPTION,
//         GAGE_HEIGHT_DESCRIPTION,
//         CONDUCTANCE_DESCRIPTION,
//         OXYGEN_VALUE_DESCRIPTION,
//         OXYGEN_PERCENTAGE_DESCRIPTION,
//         PH_DESCRIPTION,
//         TURBIDITY_DESCRIPTION,
//         PRESSURE_DESCRIPTION,
//         RADIATION_DESCRIPTION,
//         FLUORESCENCE_DESCRIPTION,
//         PRECIPITATION_DESCRIPTION,
//         DEPTH_DESCRIPTION,
//     },
// } = variables;

// const variableMappings = {
//     [TEMPERATURE_DESCRIPTION]: 'temperature',
//     [DISCHARGE_DESCRIPTION]: 'discharge',
//     [GAGE_HEIGHT_DESCRIPTION]: 'gageHeight',
//     [CONDUCTANCE_DESCRIPTION]: 'conductance',
//     [OXYGEN_VALUE_DESCRIPTION]: 'oxygenValue',
//     [OXYGEN_PERCENTAGE_DESCRIPTION]: 'oxygenPercentage',
//     [PH_DESCRIPTION]: 'ph',
//     [TURBIDITY_DESCRIPTION]: 'turbidity',
//     [PRESSURE_DESCRIPTION]: 'pressure',
//     [RADIATION_DESCRIPTION]: 'radiation',
//     [FLUORESCENCE_DESCRIPTION]: 'fluorescence',
//     [PRECIPITATION_DESCRIPTION]: 'precipitation',
//     [DEPTH_DESCRIPTION]: 'depth',
// };


function makeRiverGaugeURL(id) {
    return `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${id}`;
}


// function getSiteNameFromTimeSeriesData([
//     {
//         sourceInfo: {
//             siteName,
//         },
//     },
// ]) {
//     return siteName;
// }


// function getAvailableVariablesFromTimeSeriesData(data) {
//     return data
//         .map(({
//             variable: {
//                 variableDescription,
//             },
//         }) => variableMappings[variableDescription] || variableDescription);
// }

// const nullReading = {
//     reading: null,
//     timestamp: null,
// };

// function getSiteReadingFromTimeSeriesData(data, reading) {
//     const readingFromData = data
//         .find(({
//             variable: {
//                 variableDescription,
//             },
//         }) => variableDescription === reading);

//     if (!readingFromData) {
//         return nullReading;
//     }

//     const {
//         values: [
//             {
//                 value: [
//                     {
//                         value,
//                         dateTime,
//                     },
//                 ],
//             },
//         ],
//     } = readingFromData;

//     return {
//         reading: value,
//         timestamp: dateTime,
//     };
// }

// const getOrNullValue = f => R.tryCatch(f, () => nullReading);
// const tryGetSiteReading = variable => getOrNullValue(R.partialRight(
//     getSiteReadingFromTimeSeriesData,
//     [variable],
// ));

// const getTemperature = tryGetSiteReading(TEMPERATURE_DESCRIPTION);
// const getPrecipitation = tryGetSiteReading(PRECIPITATION_DESCRIPTION);
// const getDischarge = tryGetSiteReading(DISCHARGE_DESCRIPTION);
// const getConductance = tryGetSiteReading(CONDUCTANCE_DESCRIPTION);
// const getOxygenValue = tryGetSiteReading(OXYGEN_VALUE_DESCRIPTION);
// const getOxygenPercentage = tryGetSiteReading(OXYGEN_PERCENTAGE_DESCRIPTION);
// const getPH = tryGetSiteReading(PH_DESCRIPTION);
// const getTurbidity = tryGetSiteReading(TURBIDITY_DESCRIPTION);
// const getPressure = tryGetSiteReading(PRESSURE_DESCRIPTION);
// const getRadiation = tryGetSiteReading(RADIATION_DESCRIPTION);
// const getGageHeight = tryGetSiteReading(GAGE_HEIGHT_DESCRIPTION);
// const getFluorescence = tryGetSiteReading(FLUORESCENCE_DESCRIPTION);
// const getDepth = tryGetSiteReading(DEPTH_DESCRIPTION);


export async function resolveRiverGaugeData(id) {
    if (!id || id.length < 8) {
        return null;
    }

    const url = makeRiverGaugeURL(id);

    const {
        data: {
            value: {
                timeSeries: data,
            },
        },
    } = await axios.get(url);
    
    debugger;
    return data;
    // return {
    //     id,
    //     siteName: getSiteNameFromTimeSeriesData(data),
    //     url: `https://waterdata.usgs.gov/usa/nwis/uv?${id}`,
    //     variables: getAvailableVariablesFromTimeSeriesData(data),
    //     location: getSiteLocationFromTimeSeriesData(data),
    //     temperature: getTemperature(data),
    //     precipitation: getPrecipitation(data),
    //     discharge: getDischarge(data),
    //     conductance: getConductance(data),
    //     oxygenValue: getOxygenValue(data),
    //     oxygenPercentage: getOxygenPercentage(data),
    //     ph: getPH(data),
    //     turbidity: getTurbidity(data),
    //     pressure: getPressure(data),
    //     radiation: getRadiation(data),
    //     depth: getDepth(data),
    //     gageHeight: getGageHeight(data),
    //     fluorescence: getFluorescence(data),
    // };
}
