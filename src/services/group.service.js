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
    getProgress
}

// async function query() {
//     try {
//         // const res = await storageService.get(STORAGE_KEY)
//         const res = await storageService.query(STORAGE_KEY)
//         return res
//     } catch (err) {
//         console.log('err', err)
//     }
// }

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
// function getEmptyGroup() {
//     return {
//         id: utilService.makeId(),
//         style: { color: utilService.getRandomColor() },
//         title: 'Group Title',
//         archivedAt: '',
//         progress: [{
//             value: {
//                 'Working on it': null,
//                 Done: null,
//                 Stuck: null
//             },
//             colIdx: 1
//         }],
//         columns: [
//             {
//                 title: 'Person',
//                 importance: 1,
//                 value: [],
//                 type: 'person'
//             },
//             {
//                 title: 'Status',
//                 importance: 2,
//                 value: utilService.getLabel(''),
//                 type: 'status'
//             },
//             {
//                 title: 'Date',
//                 importance: 3,
//                 value: new Date(),
//                 type: 'date'
//             }
//         ],
//         tasks: [
//             {
//                 id: utilService.makeId(),
//                 title: 'item 1',
//                 comments: [],
//                 // status: utilService.getLabel(),
//                 archivedAt: new Date(),
//                 columns: [
//                     {
//                         title: 'Person',
//                         importance: 1,
//                         value: [],
//                         type: 'person'
//                     },
//                     {
//                         title: 'Status',
//                         importance: 2,
//                         value: utilService.getLabel(''),
//                         type: 'status'
//                     },
//                     {
//                         title: 'Date',
//                         importance: 3,
//                         value: new Date(),
//                         type: 'date'
//                     }
//                 ]
//             },
//             {
//                 id: utilService.makeId(),
//                 title: 'item 2',
//                 comments: [],
//                 status: utilService.getLabel(),
//                 archivedAt: new Date(),
//                 columns: [
//                     {
//                         title: 'Person',
//                         importance: 1,
//                         value: [],
//                         type: 'person'
//                     },
//                     {
//                         title: 'Status',
//                         importance: 2,
//                         value: utilService.getLabel(''),
//                         type: 'status'
//                     },
//                     {
//                         title: 'Date',
//                         importance: 3,
//                         value: new Date(),
//                         type: 'date'
//                     }
//                 ]
//             }
//         ]
//     }
// }

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
// function groupColAdd(group, value) {
//     let newGroup = { ...group }
//     let column = _getColumn(value)
//     column.importance = group.columns.length
//     newGroup.columns.push(column)
//     group.tasks.forEach((task, idx) => {
//         newGroup.tasks[idx].columns.push({ ...column })
//     })
//     newGroup.progress.push({
//         value: {
//             'Working on it': null,
//             Done: null,
//             Stuck: null
//         },
//         colIdx: group.columns.length-1
//     })
//     return newGroup
// }

function getProgress(group) {
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
    let newBoard = { ...board }
    newBoard.columns.splice(colIdx, 1)
    board.groups.forEach((group, gIdx) => {
        console.log(board.columns[colIdx].type);
        // if (board.columns[colIdx].type === 'status') {
        //     console.log('hey');
        //     const statCol = group.progress.findIndex(pro => pro.colIdx === colIdx)
        //     newBoard.groups[gIdx].progress.splice(statCol, 1)
        // }
        group.tasks.forEach((task, tIdx) => {
            newBoard.groups[gIdx].tasks[tIdx].columns.splice(colIdx, 1)
            // newBoard.tasks[tIdx] = task
        })
        newBoard.groups[gIdx].progress = getProgress(newBoard.groups[gIdx])
    })
    return newBoard
}
