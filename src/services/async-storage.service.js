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
    if (entityType === 'group') {
        return query()
            .then(entities => {
                return entities[0].groups.find(entity => {
                    return entity.id === entityId
                })
            })

    }
    // if (entityType === 'task') {
    //     return query()
    //         .then(entities => {
    //             group.
    //             entities.groups.tasks.find(entity => entity._id === entityId))
    // }


    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}



function post(entityType, newEntity) {
    // newEntity._id = utilService.makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
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