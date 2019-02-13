export const POLLING_INTERVAL = 600000;

export const TEMPERATURE = 'TEMPERATURE';
export const OXYGEN = 'OXYGEN';
export const PH = 'PH';
export const TURBIDITY = 'TURBIDITY';

export const VARIABLES = [
    TEMPERATURE,
    OXYGEN,
    PH,
    TURBIDITY,
];

export const VARIABLE_DESCRIPTIONS = {
    [TEMPERATURE]: 'Temperature, water, degrees Celsius',
    [OXYGEN]: 'Dissolved oxygen, water, unfiltered, milligrams per liter',
    [PH]: 'pH, water, unfiltered, field, standard units',
    [TURBIDITY]: 'Turbidity, water, unfiltered, monochrome near infra-red LED light, 780-900 nm, detection angle 90 +-2.5 degrees, formazin nephelometric units (FNU)',
};

export const VARIABLE_CODES = {
    [TEMPERATURE]: 'p00010',
    [OXYGEN]: 'p00300',
    [PH]: 'p00400',
    [TURBIDITY]: 'p63680',
};

export const SENSORS = [
    {
        name: 'Wissahickon',
        id: '01474000',
        apiAccess: true,
    },
    {
        name: 'Tinicum',
        id: '01475548',
        apiAccess: true,
    },
    {
        name: 'Delaware',
        id: '01438500',
        apiAccess: false,
    },
];
