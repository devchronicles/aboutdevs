export const SEARCH_CHANGE = 'SEARCH_CHANGE';
export const SEARCH_START = 'SEARCH_START';
export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_ENDED = 'SEARCH_ENDED';

export function searchChange(searchData) {
    return {
        type: SEARCH_CHANGE,
        searchData
    };
}

