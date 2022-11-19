import { ACTION_TYPES } from "../actions/user";

const initialState = {
    users: [],
    metaUser: {}
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.USER_FETCH_ALL:
            return {
                ...state,
                users: [...action.payload]
            }
        case ACTION_TYPES.USER_CREATE:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case ACTION_TYPES.USER_UPDATE:
            return {
                ...state,
                users: state.users.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case ACTION_TYPES.USER_DELETE:
            return {
                ...state,
                users:state.users.filter(x => x.id !== action.payload)
            }
        // case ACTION_TYPES.USER_PAGINATION:
        //     return {
        //         ...state,
        //         users: [...action.payload.users],
        //         metaUser: action.payload.meta
        //     }
        default:
            return state;
    }
}