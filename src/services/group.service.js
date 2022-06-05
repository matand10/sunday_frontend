import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { boardService } from './board.service'
import { taskService } from './task.service'


const STORAGE_KEY = 'group_db'


export const groupService = {
    // query,
    getById,
    save,
    remove,
    getEmptyGroup,
    groupColUpdate,
    groupColAdd,
    groupColRemove,
    getProgress,
    getColors
}

async function remove(groupId, boardId) {
    let currBoard = await boardService.getById(boardId)
    let currGroup = currBoard.groups.filter(group => group.id !== groupId)
    currBoard.groups = currGroup
    await storageService.put(STORAGE_KEY, currBoard)
    return currBoard
}

function getById(groupId, board) {
    return board.groups.find(group => group.id === groupId)
}


async function save(group, boardId) {
    var savedGroup
    let currBoard = boardService.getById(boardId)
    try {
        if (group.id) {
            let groupIdx = currBoard.groups.findIndex(group => group.id === group.id)
            currBoard.groups.splice(groupIdx, 1, group)
            savedGroup = await storageService.put(STORAGE_KEY, currBoard)
        } else {
            group.id = utilService.makeId()
            currBoard.groups.push(group)
            // task.owner = userService.getLoggedinUser();
            savedGroup = await storageService.post(STORAGE_KEY, group)
        }
        return savedGroup
    } catch (err) {
        console.log('err', err)
    }
}

function getEmptyGroup(board) {
    return {
        id: utilService.makeId(),
        style: { color: utilService.getRandomColor() },
        title: 'Group Title',
        archivedAt: '',
        progress: [{
            value: {
                'Working on it': null,
                Done: null,
                Stuck: null
            },
            colIdx: 1
        }],
        tasks: [
            taskService.getEmptyTask(taskService.getColumns(board.columns)),
            taskService.getEmptyTask(taskService.getColumns(board.columns))
        ]
    }
}

function groupColUpdate(inputValue, colIdx, board) {
    let newBoard = board
    newBoard.columns[colIdx].title = inputValue
    board.groups.forEach((group, gIdx) => {
        group.tasks.forEach((task, tIdx) => {
            newBoard.groups[gIdx].tasks[tIdx].columns[colIdx].title = inputValue
        })
    })
    return newBoard
}

function _getColumn(value) {
    switch (value) {
        case 'text':
            return {
                id: utilService.makeId(),
                title: 'Text',
                type: 'text',
                value: ''
            }
        case 'status':
            return {
                id: utilService.makeId(),
                title: 'Status',
                value: utilService.getLabel(''),
                type: 'status'
            }
        case 'person':
            return {
                id: utilService.makeId(),
                title: 'Person',
                value: [],
                type: 'person'
            }
        case 'date':
            return {
                id: utilService.makeId(),
                title: 'Date',
                value: new Date(),
                type: 'date'
            }
        case 'timeline':
            return {
                id: utilService.makeId(),
                title: 'Timeline',
                value: [],
                type: 'timeline'
            }
        case 'priority':
            return {
                id: utilService.makeId(),
                title: 'Priority',
                value: utilService.getPriority(''),
                type: 'priority'
            }
    }
}

function groupColAdd(board, value) {
    let newBoard = { ...board }
    let column = _getColumn(value)
    column.importance = board.columns.length
    newBoard.columns.push(column)
    board.groups.forEach((group, gIdx) => {
        group.tasks.forEach((task, tIdx) => {
            newBoard.groups[gIdx].tasks[tIdx].columns.push({ ...column })
        })
        newBoard.groups[gIdx].progress.push({
            value: {
                'Working on it': null,
                Done: null,
                Stuck: null
            },
            colIdx: board.columns.length - 1
        })
    })
    return newBoard
}

function getProgress(group) {
    console.log(group);
    let colIdxs = []
    group.tasks[0].columns.forEach((col, idx) => {
        if (col.type === 'status') colIdxs.push(idx)
    })
    group.progress = []
    colIdxs.forEach(colIdx => {
        const value = group.tasks.reduce((acc, task) => {
            if (acc[task.columns[colIdx].value.title]) acc[task.columns[colIdx].value.title] += 1
            else acc[task.columns[colIdx].value.title] = 1
            return acc
        }, {})
        group.progress.push({ colIdx, value })
    })
    return group.progress
}

function groupColRemove(colIdx, board) {
    console.log(board)
    let newBoard = { ...board }
    newBoard.columns.splice(colIdx, 1)
    board.groups.forEach((group, gIdx) => {
        group.tasks.forEach((task, tIdx) => {
            newBoard.groups[gIdx].tasks[tIdx].columns.splice(colIdx, 1)
        })
        newBoard.groups[gIdx].progress = getProgress(newBoard.groups[gIdx])
    })
    return newBoard
}

function getColors(num) {
    let colors = []
    for (let i = 0; i < num; i++) {
        colors.push(_getColorPallete())
    }
    return colors
}

function _getColorPallete() {
    return {
        id: utilService.makeId(),
        color: utilService.getRandomColor()
    }

}