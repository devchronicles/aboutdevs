export const CHANGE_SEARCH_CRITERIA = 'CHANGE_SEARCH_CRITERIA';
export const SEARCH_START = 'SEARCH_START';
export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_ENDED = 'SEARCH_ENDED';

/**
 * Changes the type of the search
 */
export function changeCriteria(criteria) {
    return {
        type: CHANGE_SEARCH_CRITERIA,
        payload: criteria
    };
}

