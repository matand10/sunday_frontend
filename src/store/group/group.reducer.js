const initialState = {
    groups: []
}

export function groupReducer(state = initialState, action) {
    var groups

    switch (action.type) {
        case 'SET_GROUPS':
            return { ...state, groups: action.groups }
        case 'REMOVE_GROUP':
            groups = state.groups.filter(group => group._id !== action.groupId)
            return { ...state, groups: groups }
        case 'ADD_GROUP':
            groups = [action.group, ...state.groups]
            console.log(groups)
            return { ...state, groups: groups }
        case 'UPDATE_GROUP':
            groups = state.groups.map(currGroup =>
                (currGroup._id === action.group._id) ? action.group : currGroup)
            return { ...state, groups: groups }
        default:
            return state
    }
}
