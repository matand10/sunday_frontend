import { updateService } from '../../services/update.service'
import { userService } from '../../services/user.service.js'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from '../services/socket.service'

// const SCORE_FOR_REVIEW = 500
var subscriber

// Action Creators
export function getActionRemoveUpdate(updateId) {
    return { type: 'REMOVE_UPDATE', updateId }
}
export function getActionAddUpdate(update) {
    return { type: 'ADD_UPDATE', update }
}

export function loadUpdates() {
    return async dispatch => {
        try {
            const updates = await updateService.query()
            dispatch({ type: 'SET_UPDATES', updates })

            // if (subscriber) reviewService.unsubscribe(subscriber)
            // subscriber = (ev) => {
            //     console.log('Got notified', ev.data)
            //     dispatch(ev.data)
            // }
            // reviewService.subscribe(subscriber)

            // When connecting to backend:
            // socketService.off(SOCKET_EVENT_REVIEW_ADDED)
            // socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) =>{
            //   dispatch(getActionAddReview(review))
            // })
            // socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
            // socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) =>{
            //   showSuccessMsg(`New review about me ${review.txt}`)
            // })

        } catch (err) {
            console.log('Updateaction: err in update', err)
        }
    }
}

export function addUpdate(update) {
    return async dispatch => {
        try {
            const addedUpdate = await updateService.add(update)
            dispatch(getActionAddUpdate(addedUpdate))
            return addedUpdate

            // Change the score in user kept in sessionStorage
            // userService.saveLocalUser(addedReview.byUser)
            // const { score } = addedReview.byUser
            // const score = await userService.changeScore(SCORE_FOR_REVIEW)
            // dispatch({ type: 'SET_SCORE', score })

        } catch (err) {
            console.log('Updateaction: err in addUpdate', err)
        }
    }
}

export function removeUpdate(updateId) {
    return async dispatch => {
        try {
            await updateService.remove(updateId)
            dispatch(getActionRemoveUpdate(updateId))
        } catch (err) {
            console.log('Updateaction: err in removeUpdate', err)
            throw err
        }
    }
}
