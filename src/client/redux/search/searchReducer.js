import { SEARCH_TYPE_TOGGLE } from './searchActions';

const defaultSearchState = {
    type: 'simple',
    simpleSearch: {
        terms: ''
    },
    advancedSearch: {
        terms: '',
        cityId: -1,
        cityName: '',
        neighborhood: '',
        useLocation: false,
        locationRange: -1
    }
};

function searchReducer(state = defaultSearchState, { payload, type }) {
    switch (type) {
        case SEARCH_TYPE_TOGGLE:
            return {
                ...defaultSearchState,
                type: defaultSearchState.state === 'simple' ? 'advanced' : 'simple'
            };
        default:
            return state;
    }
}

export default searchReducer;
