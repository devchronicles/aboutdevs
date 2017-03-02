import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { COUNTER_DECREMENT, COUNTER_INCREMENT } from './actions';
import { Record } from 'immutable';

export const CounterState = new Record({
    count: 0
});

function counterReducer(state = new CounterState(), { type }) {
    switch (type) {
        case COUNTER_INCREMENT:
            return state.set('count', state.get('count') + 1);
        case COUNTER_DECREMENT:
            return state.set('count', state.get('count') - 1);
        default:
            return state;
    }
}

export default combineReducers({
    routing: routerReducer,
    count: counterReducer
});
