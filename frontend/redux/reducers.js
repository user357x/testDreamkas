import { combineReducers } from 'redux';

import { REQUEST_ROOMS, RECEIVE_ROOMS, FILTER_ROOMS } from './actions';

const initialState = {
    loading: false,
    data: []
};

const roomList = (state = initialState, action) => {
    //console.log(action.type);
    console.log(action.type, action.payload);
    switch (action.type) {
        case REQUEST_ROOMS:
            return Object.assign({}, state, {
                loading: true
            });

        case RECEIVE_ROOMS:
            return Object.assign({}, state, {
                loading: false,
                data: action.payload
            });

        default:
            return state
    }
};

const roomFilter = (state = 'ALL', action) => {
    switch (action.type) {
        case FILTER_ROOMS:
            return action.payload;

        default:
            return state
    }
};

export default combineReducers({
    roomList,
    roomFilter
});