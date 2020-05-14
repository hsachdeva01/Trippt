import { RECEIVE_ATTRACTIONS } from '../actions/attraction_actions';

const AttractionReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_ATTRACTIONS:
            return Object.assign({}, state, {[action.city]: action.attractions.data.data});
    
        default:
            return state;
    }
};

export default AttractionReducer