import logger from "../config/logging"

export const genCompare = (a: any, b: any, order: 'asc' | 'desc') => {

    let comparison = 0;

    // Handle different data types for comparison
    if (typeof a === 'string' && typeof b === 'string') {
        comparison = a.toLowerCase().localeCompare(b.toLowerCase());
    } else if (typeof a === 'number' && typeof b === 'number') {
        comparison = a - b;
    } else {
        // Fallback for other types or mixed types, adjust as needed
        if (a > b) {
            comparison = 1;
        } else if (a < b) {
            comparison = -1;
        }
    }

    return order === 'desc' ? -comparison : comparison;
}
