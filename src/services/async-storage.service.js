import { utilService } from './util.service'
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

function query(entityType = 'group_db') {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return Promise.resolve(entities)
}

function get(entityType, entityId) { // entitytype= 'group' 
    //     return query()
    //         .then(entities => {
    //             return entities.find(entity => {
    //                 return entity.id === entityId
    //             })
    //         })

    // }
    // if (entityType === 'task') {
    //     return query()
    //         .then(entities => {
    //             group.
    //             entities.groups.tasks.find(entity => entity._id === entityId))
    // }

    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}
// function remove(entityType, entityId) {
//     return query(entityType)
//         .then(entities => {
//             const idx = entities[0].groups.findIndex(entity => entity.id === entityId)
//             entities[0].groups.splice(idx, 1)
//             _save(entityType, entities)
//         })
// }

function put(entityType, updatedEntity) {

    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })

}
// function put(entityType = 'group_db', updatedEntity, groupId, boardId) {
//     if (entityType === 'task') {
//         return query(entityType)
//             .then(entities => {
//                 const boardIdx = getBoardIdx(boardId)
//                 const groupIdx = getGroupIdx(groupId)
//                 const idx = entities[boardIdx].groups[groupIdx].findIndex(entity => entity._id === updatedEntity._id)
//                 entities.splice(idx, 1, updatedEntity)
//                 _save(entityType, entities)
//                 return updatedEntity
//             })
//     } else if (entityType === 'group') {
//         return query(entityType)
//             .then(entities => {
//                 const boardIdx = getBoardIdx(boardId)
//                 const idx = entities[boardIdx].findIndex(entity => entity._id === updatedEntity._id)
//                 entities.splice(idx, 1, updatedEntity)
//                 _save(entityType, entities)
//                 return updatedEntity
//             })

//     } else if (entityType === 'board') {
//         return query(entityType)
//             .then(entities => {
//                 const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
//                 entities.splice(idx, 1, updatedEntity)
//                 _save(entityType, entities)
//                 return updatedEntity
//             })
//     }
// }

function post(entityType, newEntity) {
    // newEntity._id = utilService.makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}



function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function postMany(entityType, newEntities) {
    return query(entityType)
        .then(entities => {
            newEntities = newEntities.map(entity => ({ ...entity, _id: utilService.makeId() }))
            entities.push(...newEntities)
            _save(entityType, entities)
            return entities
        })
}

function getBoardIdx(entityType, boardId) {
    return query(entityType)
        .then(entities => {
            const boardIdx = entities.findIndex(entity => entity._id === boardId)
            return boardIdx
        })
}
function getGroupIdx(entityType, groupId, boardId) {
    return query(entityType)
        .then(entities => {
            const boardIdx = getBoardIdx(boardId)
            const groupIdx = entities[boardIdx].groups.findIndex(entity => entity._id === groupId)
            return groupIdx
        })
}
function getTaskIdx(entityType, taskId, groupId, boardId) {
    return query(entityType)
        .then(entities => {
            const boardIdx = getBoardIdx(boardId)
            const groupIdx = getGroupIdx(groupId)
            const taskIdx = entities[boardIdx].groups[groupIdx].tasks.findIndex(entity => entity._id === taskId)
            return taskIdx
        })
}