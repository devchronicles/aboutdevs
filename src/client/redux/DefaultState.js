import { Record } from 'immutable';

export default new Record({
    search: {
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
    }
});