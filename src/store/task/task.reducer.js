const initialState = {
    tasks: []
}

export function taskReducer(state = initialState, action) {
    var tasks

    switch (action.type) {
        case 'SET_TASKS':
            return { ...state, tasks: action.tasks }
        case 'REMOVE_TASK':
            tasks = state.tasks.filter(task => task._id !== action.taskId)
            return { ...state, tasks: tasks }
        case 'ADD_TASK':
            tasks = [action.task, ...state.tasks]
            return { ...state, tasks: tasks }
        case 'UPDATE_TASK':
            tasks = state.tasks.map(currTask =>
                (currTask._id === action.task._id) ? action.task : currTask)
            return { ...state, tasks: tasks }
        default:
            return state
    }
}
