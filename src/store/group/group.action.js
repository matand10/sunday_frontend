import { groupService } from '../../services/group.service'


export function loadGroups() {
    return dispatch => {
        return groupService.query()
            .then(groups => {
                const action = {
                    type: 'SET_GROUPS',
                    groups
                }
                dispatch(action)
            })
    }
}

export function removeGroup(groupId) {
    return dispatch => {
        groupService.remove(groupId)
            .then(() => {
                dispatch({
                    type: 'REMOVE_GROUP',
                    groupId
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export function saveGroup(group) {
    return dispatch => {
        const actionType = (group._id) ? 'UPDATE_GROUP' : 'ADD_GROUP'
        groupService.save(group)
            .then(savedGroup => {
                dispatch({
                    type: actionType,
                    group: savedGroup
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

