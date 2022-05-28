import { storageService } from './async-storage.service'
import { utilService } from './util.service'


const STORAGE_KEY = 'group_db'


export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
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
}

async function query() {
    try {
        // const res = await storageService.get(STORAGE_KEY)
        const res = await storageService.query(STORAGE_KEY)
        // if (!res.length) res = getEmptyBoard()
        return res
    } catch (err) {
        console.log('err', err)
    }
}

function filterBoard(board, filterBy) {
    let newGroups
    if (filterBy.search) {
        newGroups = board.groups.filter(group => {
            return group.tasks = group.tasks.filter(task => {
                const regex = new RegExp(filterBy.search, 'i')
                return regex.test(task.title)
            })
        })
        return { ...board, groups: newGroups }

    } else if (filterBy.sortBy) {
        newGroups = board.groups.filter(group => {
            switch (filterBy.sortBy) {
                case 'title':
                    return group.tasks.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
                case 'status':
                // return group.tasks.filter(task => )
                default:
                    return group
            }
        })
        return { ...board, groups: newGroups }
    } else {
        return board
    }
}

async function getById(boardId) {
    try {
        const res = await storageService.get(STORAGE_KEY, boardId)
        return res
    } catch (err) {
        console.log('err', err)
    }
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    try {
        if (board._id) {
            savedBoard = await storageService.put(STORAGE_KEY, board)
        } else {
            board._id = utilService.makeId()
            // task.owner = userService.getLoggedinUser();
            savedBoard = await storageService.post(STORAGE_KEY, board)
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

async function isIdOk(boardId, boards) {
    try {
        return boards.some(board => board._id === boardId)
    } catch (err) {
        console.log(err)
    }
}

function getEmptyBoard() {
    return {
        title: '',
        archivedAt: '',
        createdAt: Date.now(),
        createdBy: {},
        members: [],
        groups: [
            {
                style: { color: utilService.getRandomColor() },
                title: 'Group Title',
                archivedAt: '',
                tasks: [
                    {
                        title: 'Item 1',
                        assignedTo: [],
                        comments: [],
                        status: utilService.getLabel(),
                        archivedAt: ''
                    },
                    {
                        title: 'Item 2',
                        assignedTo: [],
                        comments: [],
                        status: utilService.getLabel(),
                        archivedAt: ''
                    }
                ]
            },
            {
                style: { color: utilService.getRandomColor() },
                title: 'Group Title',
                archivedAt: '',
                tasks: [
                    {
                        title: 'Item 3',
                        assignedTo: [],
                        comments: [],
                        status: '',
                        archivedAt: ''
                    },
                    {
                        title: 'Item 4',
                        assignedTo: [],
                        comments: [],
                        status: '',
                        archivedAt: ''
                    }
                ]
            }
        ],
        style: {}
    }
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
            title: '',
            color: '#c4c4c4'
        }
    ]
}

function makeBoard() {
    return storageService.post(STORAGE_KEY, {
        _id: utilService.makeId(),
        title: "Robot dev proj",
        archivedAt: 1589983468418,
        createdAt: 1589983468418,
        createdBy: {
            _id: "u101",
            fullname: "Abi Abambi",
            imgUrl: "http://some-img"
        },
        // labels: [
        //     {
        //         id: "l101",
        //         title: "Done",
        //         color: "#61bd4f"
        //     },
        //     {
        //         id: "l102",
        //         title: "Progress",
        //         color: "#61bd33"
        //     }
        // ],
        members: [
            {
                _id: "u101",
                fullname: "Tal Tarablus",
                imgUrl: "https://www.google.com"
            }
        ],
        groups: [
            {
                style: { color: utilService.getRandomColor() },
                id: "g101",
                title: "Group 1",
                archivedAt: 1589983468418,
                tasks: [
                    {
                        id: "c101",
                        title: "Replace logo",
                        comments: [],
                        archivedAt: 1589983468418,
                        columns: [
                            {
                                title: 'Status',
                                importance: 2,
                                value: utilService.getLabel('working'),
                                type: 'status'
                            },
                            {
                                title: 'Date',
                                importance: 3,
                                value: 1589983468418,
                                type: 'date'
                            },
                            {
                                title: 'Person',
                                importance: 1,
                                value: [],
                                type: 'person'
                            }
                        ]
                    },
                    {
                        id: "c102",
                        title: "Add Samples",
                        comments: [],
                        archivedAt: 1589983468418,
                        columns: [
                            {
                                title: 'Status',
                                importance: 2,
                                value: utilService.getLabel('done'),
                                type: 'status'
                            },
                            {
                                title: 'Date',
                                importance: 3,
                                value: 1589983468418,
                                type: 'date'
                            },
                            {
                                title: 'Person',
                                importance: 1,
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
                            }
                        ]
                    }
                ],
            },
            {
                id: "g102",
                title: "Group 2",
                style: { color: utilService.getRandomColor() },
                tasks: [
                    {
                        id: "c103",
                        title: "Do that",
                        archivedAt: 1589983468418,
                        columns: [
                            {
                                title: 'Status',
                                importance: 2,
                                value: utilService.getLabel('done'),
                                type: 'status'
                            },
                            {
                                title: 'Date',
                                importance: 3,
                                value: 1589983468418,
                                type: 'date'
                            },
                            {
                                title: 'Person',
                                importance: 1,
                                value: [],
                                type: 'person'
                            }
                        ]
                    },
                    {
                        id: "c104",
                        title: "Help me",
                        archivedAt: 1589983468418,
                        columns: [
                            {
                                title: 'Status',
                                importance: 2,
                                value: utilService.getLabel("stuck"),
                                type: 'status'
                            },
                            {
                                title: 'Date',
                                importance: 3,
                                value: 1589983468418,
                                type: 'date'
                            },
                            {
                                title: 'Person',
                                importance: 1,
                                value: [],
                                type: 'person'
                            }
                        ]
                    }
                ],
                // style: {}
            }
        ],
        activities: [
            {
                id: "a101",
                txt: "Changed Color",
                createdAt: 154514,
                byMember: {
                    _id: "u101",
                    fullname: "Abi Abambi",
                    imgUrl: "http://some-img"
                },
                task: {
                    id: "c101",
                    title: "Replace Logo"
                }
            }
        ],
        cmpsOrder: [
            "status-picker",
            "member-picker",
            "date-picker"
        ]
    })
}
// function makeBoard() {
//     return storageService.post(STORAGE_KEY, {
//         _id: utilService.makeId(),
//         title: "Robot dev proj",
//         archivedAt: 1589983468418,
//         createdAt: 1589983468418,
//         createdBy: {
//             _id: "u101",
//             fullname: "Abi Abambi",
//             imgUrl: "http://some-img"
//         },
//         // labels: [
//         //     {
//         //         id: "l101",
//         //         title: "Done",
//         //         color: "#61bd4f"
//         //     },
//         //     {
//         //         id: "l102",
//         //         title: "Progress",
//         //         color: "#61bd33"
//         //     }
//         // ],
//         members: [
//             {
//                 _id: "u101",
//                 fullname: "Tal Tarablus",
//                 imgUrl: "https://www.google.com"
//             }
//         ],
//         groups: [
//             {
//                 style: { color: utilService.getRandomColor() },
//                 id: "g101",
//                 title: "Group 1",
//                 archivedAt: 1589983468418,
//                 tasks: [
//                     {
//                         id: "c101",
//                         title: "Replace logo",
//                         assignedTo: [],
//                         comments: [],
//                         status: utilService.getLabel('working'),
//                         archivedAt: 1589983468418

//                     },
//                     {
//                         id: "c102",
//                         title: "Add Samples",
//                         assignedTo: [
//                             {
//                                 _id: "u101",
//                                 fullname: "Tal Tarablus",
//                                 imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                             },
//                             {
//                                 _id: "u102",
//                                 fullname: "Matan Tarif",
//                                 imgUrl: "https://cdn.monday.com/icons/dapulse-person-column.svg"
//                             }
//                         ],
//                         comments: [],
//                         status: utilService.getLabel('done'),
//                         archivedAt: 1589983468418,
//                     }
//                 ],
//             },
//             {
//                 id: "g102",
//                 title: "Group 2",
//                 style: { color: utilService.getRandomColor() },
//                 tasks: [
//                     {
//                         id: "c103",
//                         title: "Do that",
//                         status: utilService.getLabel('done'),
//                         archivedAt: 1589983468418,
//                         assignedTo: []
//                     },
//                     {
//                         id: "c104",
//                         title: "Help me",
//                         status: utilService.getLabel("stuck"),
//                         archivedAt: 1589983468418,
//                         assignedTo: [],
//                         description: "description",
//                         comments: [
//                             {
//                                 id: "ZdPnm",
//                                 txt: "also @yaronb please CR this",
//                                 createdAt: 1590999817436.0,
//                                 byMember: {
//                                     _id: "u101",
//                                     fullname: "Tal Tarablus",
//                                     imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                                 }
//                             }
//                         ],
//                         checklists: [
//                             {
//                                 id: "YEhmF",
//                                 title: "Checklist",
//                                 todos: [
//                                     {
//                                         id: "212jX",
//                                         title: "To Do 1",
//                                         isDone: false
//                                     }
//                                 ]
//                             }
//                         ],
//                         memberIds: [
//                             "u101"
//                         ],
//                         labelIds: [
//                             "l101",
//                             "l102"
//                         ],
//                         createdAt: 1590999730348,
//                         dueDate: 16156215211,
//                         byMember: {
//                             _id: "u101",
//                             username: "Tal",
//                             fullname: "Tal Tarablus",
//                             imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                         },
//                         // style: {
//                         //     bgColor: "#26de81"
//                         // }
//                     }
//                 ],
//                 // style: {}
//             }
//         ],
//         activities: [
//             {
//                 id: "a101",
//                 txt: "Changed Color",
//                 createdAt: 154514,
//                 byMember: {
//                     _id: "u101",
//                     fullname: "Abi Abambi",
//                     imgUrl: "http://some-img"
//                 },
//                 task: {
//                     id: "c101",
//                     title: "Replace Logo"
//                 }
//             }
//         ],
//         cmpsOrder: [
//             "status-picker",
//             "member-picker",
//             "date-picker"
//         ]
//     })
// }


