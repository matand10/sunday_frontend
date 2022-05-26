import { storageService } from "../../services/async-storage.service"

const initialState = {
    boards: storageService.query()
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
                (currBoard._id === action.board._id) ? action.board : currBoard)
            return { ...state, boards: boards }
        // case 'SET_GROUPS':
        //     return { ...state, boards:{...boards,groups: action.groups} }
        case 'REMOVE_GROUP':
            console.log('from reducer',state.boards.groups)
            groups = state.boards.groups.filter(group => group.id !== action.groupId)
            return { ...state, boards:{...boards,groups: action.groups} }
        // case 'ADD_GROUP':
        //     console.log(state)
        //     groups = [action.group, ...state.boards.groups]
        //     return { ...state, boards:{...boards,groups: action.groups} }
        case 'UPDATE_GROUP':
            groups = state.boards.groups.map(currGroup =>
                (currGroup.id === action.group.id) ? action.group : currGroup)
            return { ...state, boards:{...boards,groups: action.groups} }
        //     case 'SET_TASKS':
        //         // const gropdIdx=boards.groups.findIndex(currGroup=>currGroup.id===)
        //     return { ...state,boards:{...boards.groups,tasks: action.tasks}  }
        // case 'REMOVE_TASK':
        //     tasks = state.tasks.filter(task => task._id !== action.taskId)
        //     return { ...state, tasks: tasks }
        // case 'ADD_TASK':
        //     tasks = [action.task, ...state.tasks]
        //     return { ...state, tasks: tasks }
        // case 'UPDATE_TASK':
        //     tasks = state.tasks.map(currTask =>
        //         (currTask._id === action.task._id) ? action.task : currTask)
        //     return { ...state, tasks: tasks }
        default:
            return state
    }
}
