import { userService } from '../../services/user.service'


const initialState = {
    user: userService.getLoggedinUser(),
    users: userService.getUsers(),
}

export function userReducer(state = initialState, action) {
    var users
    var newState = state;

    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break;
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;
        case 'UPDATE_USER':
            users = state.users.map(currUser =>
                (currUser._id === action.user._id) ? { ...action.user } : currUser)
            return { ...state, users: users }
        default:
    }
    return newState;

}
