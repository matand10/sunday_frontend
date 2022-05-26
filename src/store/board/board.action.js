import { boardService } from '../../services/board.service'
import { groupService } from '../../services/group.service'


export function loadBoards() {
    return dispatch => {
        return boardService.query()
            .then(boards => {
                const action = {
                    type: 'SET_BOARDS',
                    boards
                }
                dispatch(action)
            })
    }
}

export function setFilter(filterBy) {
    return (dispatch) => {
        return dispatch({
            type: 'SET_FILTERBY',
            filterBy,
        })
    }
}

export function removeBoard(boardId) {
    return dispatch => {
        boardService.remove(boardId)
            .then(() => {
                dispatch({
                    type: 'REMOVE_BOARD',
                    boardId
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export function saveBoard(board) {
    return dispatch => {
        const actionType = (board._id) ? 'UPDATE_BOARD' : 'ADD_BOARD'
        boardService.save(board)
            .then(savedBoard => {
                dispatch({
                    type: actionType,
                    board: savedBoard
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

