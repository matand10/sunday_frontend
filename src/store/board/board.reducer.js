import { storageService } from "../../services/async-storage.service"
import { boardService } from "../../services/board.service"
import { userService } from '../../services/user.service'

const initialState = {
    boards: [],
    // boards: [],
    filterBy: {
        search: '',
        userId: userService.getLoggedinUser()?._id || null,
        boardIds: []
    }
}

export function boardReducer(state = initialState, action) {
    var boards
    var groups
    var tasks

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
                (currBoard._id === action.board._id) ? { ...action.board } : currBoard)
            return { ...state, boards: boards }
        case 'SET_FILTERBY':
            return { ...state, filterBy: action.filterBy }
        default:
            return state
    }
}
