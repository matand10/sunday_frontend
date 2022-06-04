import { boardService } from '../../services/board.service'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service'



export function loadBoards(filterBy) {
    return async dispatch => {
        try {
            const boards = await boardService.query(filterBy)
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.log(err)
        }
    }
}

export function setFilter(filterBy) {
    return async dispatch => {
        return await dispatch({
            type: 'SET_FILTERBY',
            filterBy,
        })
    }
}

export function removeBoard(boardId) {
    return async dispatch => {
        await boardService.remove(boardId)
        try {
            dispatch({ type: 'REMOVE_BOARD', boardId })
            showSuccessMsg('Board removed successfully!')
        } catch (err) {
            showErrorMsg('Cannot delete board')
            console.log(err)
        }
    }
}

export function saveBoard(board) {
    return async dispatch => {
        try {
            const actionType = (board._id) ? 'UPDATE_BOARD' : 'ADD_BOARD'
            let savedBoard = await boardService.save(board)
            if (typeof savedBoard === 'string') savedBoard = await boardService.getById(savedBoard)
            dispatch({
                type: actionType,
                board: savedBoard
            })
        } catch (err) {
            console.log(err)
        }
    }
}