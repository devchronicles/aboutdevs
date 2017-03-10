export const SEARCH_TYPE_TOGGLE = 'SEARCH_CHANGE';
export const SEARCH_SIMPLE_CHANGE = 'SEARCH_CHANGE';
export const SEARCH_ADVANCED_CHANGE = 'SEARCH_CHANGE';
export const SEARCH_START = 'SEARCH_START';
export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_ENDED = 'SEARCH_ENDED';

/**
 * Changes the type of the search
 */
export function searchTypeToggle() {
    return {
        type: SEARCH_TYPE_TOGGLE
    };
}

