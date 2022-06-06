import { boardService } from "../../services/board.service";
import { userService } from "../../services/user.service";


export function loadUsers() {
    return async dispatch => {
        try {
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        }
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            return user
        } catch (err) {
            console.log('Cannot login', err)
        }
    }
}


export function onSignup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            let newBoard = boardService.makeBoard()
            newBoard.createdBy = user
            newBoard.members = [user]
            const boardId = await boardService.save(newBoard)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            console.log('Cannot signup', err)
        }
    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })
        } catch (err) {
            console.log('Cannot logout', err)
        }
    }
}


export function loadUser(userId) {
    return async (dispatch) => {
        try {
            const user = await userService.getById(userId);
            dispatch({ type: 'SET_WATCHED_USER', user })
        } catch (err) {
            console.log('Cannot load user', err)
        }
    }
}

export function updateUser(user) {
    console.log('user from update user: ', user);
    return dispatch => {
        userService.update(user)
            .then(savedUser => {
                dispatch({
                    type: 'UPDATE_USER',
                    user: savedUser
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}