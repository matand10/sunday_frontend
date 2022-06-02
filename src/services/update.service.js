import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service.js'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service'
import { getActionRemoveUpdate, getActionAddUpdate } from '../store/update/update.action'

const updateChannel = new BroadcastChannel('updateChannel')

export const updateService = {
    add,
    query,
    remove,
    subscribe,
    unsubscribe,
}


async function query(filterBy) {
    // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    // return httpService.get(`update${queryStr}`)
    const updates = await httpService.get(`update`)
    return updates
}

async function remove(updateId) {
    await httpService.delete(`update/${updateId}`)
    updateChannel.postMessage(getActionRemoveUpdate(updateId))
}

async function add(update) {

    const addedUpdate = await httpService.post(`update`, update)
    // update.byUser = userService.getLoggedinUser()
    // update.aboutUser = await userService.getById(update.aboutUserId)
    // const addedupdate = await storageService.post('update', update)

    updateChannel.postMessage(getActionAddUpdate(addedUpdate))
    return addedUpdate
}

function subscribe(listener) {
    updateChannel.addEventListener('message', listener)
}
function unsubscribe(listener) {
    updateChannel.removeEventListener('message', listener)
}
