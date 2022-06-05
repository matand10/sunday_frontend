import { utilService } from './util.service'
import { httpService } from './http.service'
import { userService } from './user.service'

export const boardService = {
    query,
    getById,
    save,
    remove,
    filterBoard,
    taskUpdate,
    groupUpdate,
    getLabels,
    taskUpdate,
    makeBoard,
    changeTaskPosition,
    groupHeadSort,
    changeTaskPosition,
    isIdOk,
    documentActivities,
    changeColTitle,
    getPriority
}

async function query(filterBy = {}) {
    try {
        return await httpService.get('board', { params: { filterBy } })
    } catch (err) {
        console.log('err', err)
    }
}

function filterBoard(board, filterBy) {
    let newGroups
    const newBoard = { ...board }
    if (filterBy.search) {
        console.log('Filtering');
        newBoard.groups.forEach((group, idx) => {
            const tasks = group.tasks.filter(task => {
                if (task.title.toLowerCase().includes(filterBy.search.toLowerCase())) return task
            })
            newBoard.groups[idx].tasks = tasks
        })
        return newBoard
    } else if (filterBy.sortBy) {
        let colIdx
        newGroups = board.groups.filter(group => {
            switch (filterBy.sortBy) {
                case 'title':
                    return group.tasks.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
                case 'status':
                    group.tasks.forEach(task => colIdx = task.columns.findIndex(column => column.type === 'status'))
                    return group.tasks.sort((a, b) => (a.columns[colIdx].value.importance) - (b.columns[colIdx].value.importance))
                case 'person':
                    group.tasks.forEach(task => colIdx = task.columns.findIndex(column => column.type === 'person'))
                    return group.tasks.sort((a, b) => (b.columns[colIdx].value.length) - (a.columns[colIdx].value.length))
            }
        })
        return { ...board, groups: newGroups }
    }
    return board
}



async function getById(boardId) {
    try {
        return await httpService.get(`board/${boardId}`)
    } catch (err) {
        console.log('err', err)
    }
}

async function remove(boardId) {
    await httpService.delete(`board/${boardId}`)
}

async function save(board) {
    var savedBoard
    try {
        if (board._id) {
            savedBoard = await httpService.put(`board/${board._id}`, board)
        } else {
            savedBoard = await httpService.post('board', board)
        }
        return savedBoard
    } catch (err) {
        console.log('err', err)
    }
}

function taskUpdate(updateTask, groupId, board) {
    const newBoard = { ...board }
    const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
    const taskIdx = newBoard.groups[groupIdx].tasks.findIndex(task => task.id === updateTask.id)
    newBoard.groups[groupIdx].tasks.splice(taskIdx, 1, updateTask)
    return newBoard
}

function groupUpdate(updateGroup, board) {
    const newBoard = { ...board }
    const groupIdx = newBoard.groups.findIndex(group => group.id === updateGroup.id)
    newBoard.groups.splice(groupIdx, 1, updateGroup)
    return newBoard
}

function changeTaskPosition(taskId, groupId, board, toTaskId) {
    const newBoard = { ...board }
    const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
    const fromIdx = _getItemPosition(groupId, board, taskId)
    const toIdx = _getItemPosition(groupId, board, toTaskId)
    const tasks = newBoard.groups[groupIdx].tasks
    const task = tasks.splice(fromIdx, 1)[0]
    tasks.splice(toIdx, 0, task)
    return newBoard
}

function _getItemPosition(groupId, board, itemId) {
    const newBoard = { ...board }
    const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
    const taskIdx = newBoard.groups[groupIdx].tasks.findIndex(task => task.id === itemId)
    return taskIdx
}

function groupHeadSort(sortValue, group, rev, colIdx) {
    let newTasks
    switch (sortValue) {
        case 'title':
            newTasks = group.tasks.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
            break;
        case 'status':
            newTasks = group.tasks.sort((a, b) => (a.columns[colIdx].value.importance) - (b.columns[colIdx].value.importance))
            break;
        case 'date':
            newTasks = group.tasks.sort((a, b) => new Date(a.columns[colIdx].value) - new Date(b.columns[colIdx].value))
            break;
        case 'txt':
            newTasks = group.tasks.sort((a, b) => (a.columns[colIdx].value) > (b.columns[colIdx].value))
            break;
        case 'person':
            newTasks = group.tasks.sort((a, b) => (a.columns[colIdx].value.length) - (b.columns[colIdx].value.length))
            break;
    }
    if (rev) newTasks.reverse()
    let newGroup = group
    newGroup.tasks = newTasks
    return newGroup
}

function isIdOk(boardId, boards) {
    return boards.find(board => board._id === boardId)
}

function getLabels() {
    return [
        {
            id: 'l101',
            title: 'Done',
            color: '#00c875'
        },
        {
            id: 'l102',
            title: 'Working on it',
            color: '#fdab3d'
        },
        {
            id: 'l103',
            title: 'Stuck',
            color: '#e2445c'
        },
        {
            id: 'l104',
            title: 'Empty',
            color: '#c4c4c4'
        }
    ]
}

function getPriority() {
    return [
        {
            id: 'l101',
            title: 'High',
            color: '#e2445d'
        },
        {
            id: 'l102',
            title: 'Medium',
            color: '#a25edc'
        },
        {
            id: 'l103',
            title: 'Low',
            color: '#589bfc'
        },
        {
            id: 'l104',
            title: 'Empty',
            color: '#c4c4c4'
        }
    ]
}

function changeColTitle(colIdx, value, board) {
    let newBoard = { ...board }
    newBoard.columns[colIdx].title = value
    board.groups.forEach((group, gIdx) => {
        group.tasks.forEach((task, tIdx) => {
            newBoard.groups[gIdx].tasks[tIdx].columns[colIdx].title = value
        })
    })
    return newBoard
}


function makeBoard(user) {
    return {
        title: "Robot dev proj",
        archivedAt: 1589983468418,
        createdAt: 1589983468418,
        comments: [],
        members: [user],
        columns: [
            {
                id: 'col1',
                title: 'Person',
                importance: 0,
                value: [],
                type: 'person'
            },
            {
                id: 'col2',
                title: 'Status',
                importance: 1,
                value: utilService.getLabel(''),
                type: 'status'
            },
            {
                id: 'col3',
                title: 'Date',
                importance: 2,
                value: new Date(),
                type: 'date'
            }
        ],
        groups: [
            {
                style: { color: utilService.getRandomColor() },
                id: utilService.makeId(),
                title: "Group Title",
                archivedAt: 1589983468418,
                progress: [{
                    value: {
                        'Working on it': null,
                        Done: null,
                        Stuck: null
                    },
                    colIdx: 1
                }],
                tasks: [
                    {
                        id: utilService.makeId(),
                        title: "Item 1",
                        activities: [],
                        comments: [],
                        archivedAt: 1589983468418,
                        columns: [
                            {
                                id: 'col1',
                                title: 'Person',
                                importance: 0,
                                value: [],
                                type: 'person'
                            },
                            {
                                id: 'col2',
                                title: 'Status',
                                importance: 1,
                                value: utilService.getLabel(''),
                                type: 'status'
                            },
                            {
                                id: 'col3',
                                title: 'Date',
                                importance: 2,
                                value: 1589983468418,
                                type: 'date'
                            },
                        ]
                    },
                    {
                        id: utilService.makeId(),
                        title: "Item 2",
                        activities: [],
                        comments: [],
                        archivedAt: 1589983468418,
                        columns: [
                            {
                                id: 'col1',
                                title: 'Person',
                                importance: 0,
                                value: [
                                    {
                                        _id: "u101",
                                        fullname: "Tal Tarablus",
                                        imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                    },
                                    {
                                        _id: "u102",
                                        fullname: "Matan Tarif",
                                        imgUrl: "https://cdn.monday.com/icons/dapulse-person-column.svg"
                                    }
                                ],
                                type: 'person'
                            },
                            {
                                id: 'col2',
                                title: 'Status',
                                importance: 1,
                                value: utilService.getLabel(''),
                                type: 'status'
                            },
                            {
                                id: 'col3',
                                title: 'Date',
                                importance: 2,
                                value: 1589983468418,
                                type: 'date'
                            },
                        ]
                    }
                ],
            },
            {
                id: utilService.makeId(),
                title: "Group Title",
                style: { color: utilService.getRandomColor() },
                progress: [{
                    value: {
                        'Working on it': null,
                        Done: null,
                        Stuck: null
                    },
                    colIdx: 1
                }],
                tasks: [
                    {
                        id: utilService.makeId(),
                        activities: [],
                        comments: [],
                        title: "Item 3",
                        archivedAt: 1589983468418,
                        columns: [
                            {
                                id: 'col1',
                                title: 'Person',
                                importance: 0,
                                value: [],
                                type: 'person'
                            },
                            {
                                id: 'col2',
                                title: 'Status',
                                importance: 1,
                                value: utilService.getLabel(''),
                                type: 'status'
                            },
                            {
                                id: 'col3',
                                id: utilService.makeId(),
                                title: 'Date',
                                importance: 2,
                                value: 1589983468418,
                                type: 'date'
                            },
                        ]
                    },
                    {
                        id: utilService.makeId(),
                        activities: [],
                        comments: [],
                        title: "Item 4",
                        archivedAt: 1589983468418,
                        columns: [
                            {
                                id: 'col1',
                                title: 'Person',
                                importance: 0,
                                value: [],
                                type: 'person'
                            },
                            {
                                id: 'col2',
                                title: 'Status',
                                importance: 1,
                                value: utilService.getLabel(''),
                                type: 'status'
                            },
                            {
                                id: 'col3',
                                id: utilService.makeId(),
                                title: 'Date',
                                importance: 2,
                                value: 1589983468418,
                                type: 'date'
                            },
                        ]
                    }
                ],
            }
        ],
        activities: [],
        cmpsOrder: [
            "status-picker",
            "member-picker",
            "date-picker"
        ]
    }
}
// function makeBoard(user) {
//     return {
//         title: "Robot dev proj",
//         archivedAt: 1589983468418,
//         createdAt: 1589983468418,
//         members: [user],
//         groups: [
//             {
//                 style: { color: utilService.getRandomColor() },
//                 id: utilService.makeId(),
//                 title: "Group Title",
//                 archivedAt: 1589983468418,
//                 progress: [{
//                     value: {
//                         'Working on it': null,
//                         Done: null,
//                         Stuck: null
//                     },
//                     colIdx: 1
//                 }],
//                 columns: [
//                     {
//                         title: 'Person',
//                         importance: 0,
//                         value: [],
//                         type: 'person'
//                     },
//                     {
//                         title: 'Status',
//                         importance: 1,
//                         value: utilService.getLabel(''),
//                         type: 'status'
//                     },
//                     {
//                         title: 'Date',
//                         importance: 2,
//                         value: new Date(),
//                         type: 'date'
//                     }
//                 ],
//                 tasks: [
//                     {
//                         id: utilService.makeId(),
//                         title: "Item 1",
//                         comments: [],
//                         archivedAt: 1589983468418,
//                         columns: [
//                             {
//                                 title: 'Status',
//                                 importance: 1,
//                                 value: utilService.getLabel(''),
//                                 type: 'status'
//                             },
//                             {
//                                 title: 'Date',
//                                 importance: 2,
//                                 value: 1589983468418,
//                                 type: 'date'
//                             },
//                             {
//                                 title: 'Person',
//                                 importance: 0,
//                                 value: [],
//                                 type: 'person'
//                             }
//                         ]
//                     },
//                     {
//                         id: utilService.makeId(),
//                         title: "Item 2",
//                         comments: [],
//                         archivedAt: 1589983468418,
//                         columns: [
//                             {
//                                 title: 'Status',
//                                 importance: 1,
//                                 value: utilService.getLabel(''),
//                                 type: 'status'
//                             },
//                             {
//                                 title: 'Date',
//                                 importance: 2,
//                                 value: 1589983468418,
//                                 type: 'date'
//                             },
//                             {
//                                 title: 'Person',
//                                 importance: 0,
//                                 value: [
//                                     {
//                                         _id: "u101",
//                                         fullname: "Tal Tarablus",
//                                         imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                                     },
//                                     {
//                                         _id: "u102",
//                                         fullname: "Matan Tarif",
//                                         imgUrl: "https://cdn.monday.com/icons/dapulse-person-column.svg"
//                                     }
//                                 ],
//                                 type: 'person'
//                             }
//                         ]
//                     }
//                 ],
//             },
//             {
//                 id: utilService.makeId(),
//                 title: "Group Title",
//                 style: { color: utilService.getRandomColor() },
//                 progress: [{
//                     value: {
//                         'Working on it': null,
//                         Done: null,
//                         Stuck: null
//                     },
//                     colIdx: 1
//                 }],
//                 columns: [
//                     {
//                         title: 'Person',
//                         importance: 0,
//                         value: [],
//                         type: 'person'
//                     },
//                     {
//                         title: 'Status',
//                         importance: 1,
//                         value: utilService.getLabel(''),
//                         type: 'status'
//                     },
//                     {
//                         title: 'Date',
//                         importance: 2,
//                         value: new Date(),
//                         type: 'date'
//                     }
//                 ],
//                 tasks: [
//                     {
//                         id: utilService.makeId(),
//                         title: "Item 3",
//                         archivedAt: 1589983468418,
//                         columns: [
//                             {
//                                 title: 'Status',
//                                 importance: 1,
//                                 value: utilService.getLabel(''),
//                                 type: 'status'
//                             },
//                             {
//                                 title: 'Date',
//                                 importance: 2,
//                                 value: 1589983468418,
//                                 type: 'date'
//                             },
//                             {
//                                 title: 'Person',
//                                 importance: 0,
//                                 value: [],
//                                 type: 'person'
//                             }
//                         ]
//                     },
//                     {
//                         id: utilService.makeId(),
//                         title: "Item 4",
//                         archivedAt: 1589983468418,
//                         columns: [
//                             {
//                                 title: 'Status',
//                                 importance: 1,
//                                 value: utilService.getLabel(''),
//                                 type: 'status'
//                             },
//                             {
//                                 title: 'Date',
//                                 importance: 2,
//                                 value: 1589983468418,
//                                 type: 'date'
//                             },
//                             {
//                                 title: 'Person',
//                                 importance: 0,
//                                 value: [],
//                                 type: 'person'
//                             }
//                         ]
//                     }
//                 ],
//             }
//         ],
//         activities: [],
//         cmpsOrder: [
//             "status-picker",
//             "member-picker",
//             "date-picker"
//         ]
//     }
// }


function documentActivities(column, previewColVal, taskTitle) {
    const user = userService.getLoggedinUser()
    let msg

    switch (column.type) {
        case 'person':
            msg = `Added ${column.value[column.value.length - 1].fullname}`
            break;
        case 'status':
            msg = `Changed status from ${previewColVal.title || 'None'} to ${column.value.title}`
            break
        case 'date':
            msg = `Changed date from ${utilService.getCurrTime(previewColVal)} to ${utilService.getCurrTime(column.value)}`
            break
        case 'text':
            msg = `Changed text from ${previewColVal} to ${column.value}`
            break
        case 'timeline':
            msg = `Changed timeline to ${utilService.getCurrTime(column.value.newRange.start)} - ${utilService.getCurrTime(column.value.newRange.end)}`
            break
        case 'priority':
            msg = `Changed priority from ${previewColVal.title} to ${column.value.title}`
            break
    }


    return {
        id: utilService.makeId(),
        type: column.type,
        msg,
        createdAt: Date.now(),
        byMember: { ...user },
        taskTitle
    }
}
