export const REQUEST_ROOMS = 'REQUEST_ROOMS';
export const RECEIVE_ROOMS = 'RECEIVE_ROOMS';
export const FILTER_ROOMS = 'FILTER_ROOMS';

export const fetchRooms = () => (dispatch) => {
    dispatch(requestRooms());
    return fetch(`http://localhost:3000/api/rooms/`)
        .then(response => response.json())
        .then(rooms => dispatch(receiveRooms(rooms)))
        .catch(error => console.log('An error occurred.', error))
};

export const requestRooms = () => {
    return {
        type: REQUEST_ROOMS
    }
};

export const receiveRooms = (rooms) => {
    return {
        type: RECEIVE_ROOMS,
        payload: rooms
    }
};

export const filterRooms = filter => {
    return {
        type: FILTER_ROOMS,
        payload: filter
    }
};