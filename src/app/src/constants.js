export const POLLING_INTERVAL = 600000;

export const TEMPERATURE = 'TEMPERATURE';
export const OXYGEN = 'OXYGEN';
export const PH = 'PH';
export const TURBIDITY = 'TURBIDITY';

export const VARIABLES = [TEMPERATURE, OXYGEN, PH, TURBIDITY];

export const VARIABLE_CODES = {
    [TEMPERATURE]: '00010',
    [OXYGEN]: '00300',
    [PH]: '00400',
    [TURBIDITY]: '63680',
};

export const VARIABLE_WITHIN_HEALTHY_RANGE = 1;
export const VARIABLE_NOT_WITHIN_HEALTHY_RANGE = 0;
export const RATING_GOOD = 'GOOD';
export const RATING_FAIR = 'FAIR';
export const RATING_POOR = 'POOR';
export const OVERALL_RATING = 'OVERALL_RATING';
