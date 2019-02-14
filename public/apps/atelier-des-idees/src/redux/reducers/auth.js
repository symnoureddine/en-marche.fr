import { SET_AUTH_USER, UPDATE_AUTH_USER } from '../constants/actionTypes';

const initialState = {
    isAuthenticated: false,
    user: {},
};

function authReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
    case SET_AUTH_USER:
        return {
            isAuthenticated: true,
            user: payload.user,
        };
    case UPDATE_AUTH_USER:
        return { ...state, user: { ...state.user, ...payload.data } };
    default:
        return state;
    }
}

export default authReducer;

export const getIsAuthenticated = state => state.isAuthenticated;
export const getAuthUser = state => state.user;
