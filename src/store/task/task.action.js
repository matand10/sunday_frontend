import { taskService } from '../../services/task.service'


export function loadTasks() {
    return dispatch => {
        return taskService.query()
            .then(tasks => {
                const action = {
                    type: 'SET_TASKS',
                    tasks
                }
                dispatch(action)
            })
    }
}

export function removeTask(taskId) {
    return dispatch => {
        taskService.remove(taskId)
            .then(() => {
                dispatch({
                    type: 'REMOVE_TASK',
                    taskId
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export function saveTask(task) {
    return dispatch => {
        const actionType = (task.id) ? 'UPDATE_TASK' : 'ADD_TASK'
        taskService.save(task)
            .then(savedTask => {
                dispatch({
                    type: actionType,
                    task: savedTask
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

