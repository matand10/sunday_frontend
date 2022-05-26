import { groupService } from '../../services/group.service'


// export function loadGroups() {
//     return dispatch => {
//         return groupService.query()
//             .then(groups => {
//                 const action = {
//                     type: 'SET_GROUPS',
//                     groups
//                 }
//                 dispatch(action)
//             })
//     }
// }

export function removeGroup(groupId,boardId) {
    return dispatch => {
        groupService.remove(groupId,boardId)
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

export function saveGroup(group,boardId) {
    return dispatch => {
        groupService.save(group,boardId)
            .then(savedBoard => {
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

