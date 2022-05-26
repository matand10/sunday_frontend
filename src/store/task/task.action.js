import { taskService } from '../../services/task.service'


// export function loadTasks() {
//     return dispatch => {
//         return taskService.query()
//             .then(tasks => {
//                 const action = {
//                     type: 'SET_TASKS',
//                     tasks
//                 }
//                 dispatch(action)
//             })
//     }
// }

export function removeTask(taskId,groupId,boardId) {
    return dispatch => {
        taskService.remove(taskId,groupId,boardId)
            .then(savedBoard => {
                dispatch({
                    type: 'UPDATE_BOARD',
                    board:savedBoard
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export function saveTask(task, groupId, boardId) {
    return dispatch => {
        taskService.save(task, groupId, boardId)
            .then(savedBoard => {
                console.log('save',savedBoard)
                dispatch({
                    type: 'UPDATE_BOARD',
                    board: savedBoard
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

