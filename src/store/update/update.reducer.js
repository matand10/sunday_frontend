const initialState = {
    updates: [],
}

export function updateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_UPDATES':
            return { ...state, updates: action.updates }
        case 'ADD_UPDATE':
            return { ...state, updates: [...state.updates, action.update] }
        case 'REMOVE_UPDATE':
            return { ...state, updates: state.updates.filter(update => update._id !== action.updateId) }
        case 'UPDATE_UPDATE':
            return {
                ...state,
                updates: state.updates.map(update =>
                    update._id === action.update._id ? action.update : update
                )
            }
        default:
            return state
    }
}
