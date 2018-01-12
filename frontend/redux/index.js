import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

export default function (initialState = {}) {
    return createStore(reducer, initialState, applyMiddleware(thunk));
}