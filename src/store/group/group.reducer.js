const initialState = {
    boards: []
}

export function boardReducer(state = initialState, action) {
    var boards

    switch (action.type) {
        case 'SET_BOARDS':
            return { ...state, boards: action.boards }
        case 'REMOVE_BOARD':
            boards = state.boards.filter(board => board._id !== action.boardId)
            return { ...state, boards: boards }
        case 'ADD_BOARD':
            boards = [action.board, ...state.boards]
            return { ...state, boards: boards }
        case 'UPDATE_BOARD':
            boards = state.boards.map(currBoard =>
                (currBoard._id === action.board._id) ? action.board : currBoard)
            return { ...state, boards: boards }
        default:
            return state
    }
}
