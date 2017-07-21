/**
 * Extracts latitude and longitude from the given text and return it. Or null if it can't be extracted
 * @param {string} text
 * @returns {{latitude: number; longitude: number}}
 */
export function extractLocationFromText(text: string): { latitude: number, longitude: number } {
    if (!text) {
        return null;
    }

    const matches = text.match(/([+-]?\d+\.\d+)/g);
    if (matches && matches.length === 2) {
        return {
            latitude: Number(matches[0]),
            longitude: Number(matches[1]),
        };
    }
    return null;
}

export function buildUrlParameterFromLocation(location: { latitude: number, longitude: number }): string {
    if (!location) return null;
    const {latitude, longitude} = location;
    return `@${latitude},${longitude}`;
}
