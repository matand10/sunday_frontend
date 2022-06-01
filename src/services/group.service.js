import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { boardService } from './board.service'


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

function getEmptyGroup() {
    return {
        id: utilService.makeId(),
        style: { color: utilService.getRandomColor() },
        title: 'Group Title',
        archivedAt: '',
        progress: {
            colIdx: 1,
            progress: {
                'Working on it': null,
                Done: null,
                Stuck: null
            }
        },
        columns: [
            {
                title: 'Person',
                importance: 1,
                value: [],
                type: 'person'
            },
            {
                title: 'Status',
                importance: 2,
                value: utilService.getLabel(''),
                type: 'status'
            },
            {
                title: 'Date',
                importance: 3,
                value: new Date(),
                type: 'date'
            }
        ],
        tasks: [
            {
                id: utilService.makeId(),
                title: 'item 1',
                comments: [],
                // status: utilService.getLabel(),
                archivedAt: new Date(),
                columns: [
                    {
                        title: 'Person',
                        importance: 1,
                        value: [],
                        type: 'person'
                    },
                    {
                        title: 'Status',
                        importance: 2,
                        value: utilService.getLabel(''),
                        type: 'status'
                    },
                    {
                        title: 'Date',
                        importance: 3,
                        value: new Date(),
                        type: 'date'
                    }
                ]
            },
            {
                id: utilService.makeId(),
                title: 'item 2',
                comments: [],
                status: utilService.getLabel(),
                archivedAt: new Date(),
                columns: [
                    {
                        title: 'Person',
                        importance: 1,
                        value: [],
                        type: 'person'
                    },
                    {
                        title: 'Status',
                        importance: 2,
                        value: utilService.getLabel(''),
                        type: 'status'
                    },
                    {
                        title: 'Date',
                        importance: 3,
                        value: new Date(),
                        type: 'date'
                    }
                ]
            }
        ]
    }
}

function groupColUpdate(inputValue, colIdx, group) {
    let newGroup = group
    newGroup.columns[colIdx].title = inputValue
    group.tasks.forEach((task, idx) => {
        newGroup.tasks[idx].columns[colIdx].title = inputValue
    })
    return newGroup
}

function _getColumn(value) {
    switch (value) {
        case 'text':
            return {
                title: 'Text',
                type: 'text',
                value: ''
            }
        case 'status':
            return {
                title: 'Status',
                value: utilService.getLabel(''),
                type: 'status'
            }
        case 'person':
            return {
                title: 'Person',
                value: [],
                type: 'person'
            }
        case 'date':
            return {
                title: 'Date',
                value: new Date(),
                type: 'date'
            }
    }
}

function groupColAdd(group, value) {
    let newGroup = { ...group }
    let column = _getColumn(value)
    column.importance = group.columns.length
    newGroup.columns.push(column)
    group.tasks.forEach((task, idx) => {
        newGroup.tasks[idx].columns.push({ ...column })
    })
    return newGroup
}

function getProgress(group, colIdx) {
    const groupTaskMap = group.tasks.reduce((acc, task) => {
        if (acc[task.columns[colIdx].value.title]) acc[task.columns[colIdx].value.title] += 1
        else acc[task.columns[colIdx].value.title] = 1

        // task.columns.forEach(column => {
        //     if (column.type === 'status') {
        //         if (acc[column.value.title]) acc[column.value.title] += 1
        //         else acc[column.value.title] = 1
        //     } else {
        //         return
        //     }
        // })
        return acc
    }, {})
    return groupTaskMap
}

function groupColRemove(colIdx, group) {
    let newGroup = { ...group }
    newGroup.columns.splice(colIdx, 1)
    group.tasks.forEach((task, idx) => {
        task.columns.splice(colIdx, 1)
        newGroup.tasks[idx] = task
    })
    return newGroup
}

// Test Data
// storageService.post(STORAGE_KEY, { vendor: 'Subali Rahok 2', price: 980 }).then(x => console.log(x))

// storageService.post(STORAGE_KEY, {
//     _id: "b102",
//     title: "Robot dev proj",
//     archivedAt: 1589983468418,
//     createdAt: 1589983468418,
//     createdBy: {
//         _id: "u101",
//         fullname: "Abi Abambi",
//         imgUrl: "http://some-img"
//     },
//     // labels: [
//     //     {
//     //         id: "l101",
//     //         title: "Done",
//     //         color: "#61bd4f"
//     //     },
//     //     {
//     //         id: "l102",
//     //         title: "Progress",
//     //         color: "#61bd33"
//     //     }
//     // ],
//     members: [
//         {
//             _id: "u101",
//             fullname: "Tal Tarablus",
//             imgUrl: "https://www.google.com"
//         }
//     ],
//     groups: [
//         {
//             style: {},
//             id: "g101",
//             title: "Group 1",
//             archivedAt: 1589983468418,
//             tasks: [
//                 {
//                     id: "c101",
//                     title: "Replace logo",
//                     assignedTo: [],
//                     comments: [],
//                     status: 'working on it',
//                     archivedAt: 1589983468418

//                 },
//                 {
//                     id: "c102",
//                     title: "Add Samples",
//                     assignedTo: [
//                         {
//                             _id: "u101",
//                             fullname: "Tal Tarablus",
//                             imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                         },
//                         {
//                             _id: "u102",
//                             fullname: "Matan Tarif",
//                             imgUrl: "https://cdn.monday.com/icons/dapulse-person-column.svg"
//                         }
//                     ],
//                     comments: [],
//                     status: 'working on it',
//                     archivedAt: 1589983468418,
//                 }
//             ],
//             style: {}
//         },
//         {
//             id: "g102",
//             title: "Group 2",
//             tasks: [
//                 {
//                     id: "c103",
//                     title: "Do that",
//                     status: 'Done',
//                     archivedAt: 1589983468418,
//                     assignedTo: []
//                 },
//                 {
//                     id: "c104",
//                     title: "Help me",
//                     status: "working on it",
//                     archivedAt: 1589983468418,
//                     assignedTo: [],
//                     description: "description",
//                     comments: [
//                         {
//                             id: "ZdPnm",
//                             txt: "also @yaronb please CR this",
//                             createdAt: 1590999817436.0,
//                             byMember: {
//                                 _id: "u101",
//                                 fullname: "Tal Tarablus",
//                                 imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                             }
//                         }
//                     ],
//                     checklists: [
//                         {
//                             id: "YEhmF",
//                             title: "Checklist",
//                             todos: [
//                                 {
//                                     id: "212jX",
//                                     title: "To Do 1",
//                                     isDone: false
//                                 }
//                             ]
//                         }
//                     ],
//                     memberIds: [
//                         "u101"
//                     ],
//                     labelIds: [
//                         "l101",
//                         "l102"
//                     ],
//                     createdAt: 1590999730348,
//                     dueDate: 16156215211,
//                     byMember: {
//                         _id: "u101",
//                         username: "Tal",
//                         fullname: "Tal Tarablus",
//                         imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                     },
//                     style: {
//                         bgColor: "#26de81"
//                     }
//                 }
//             ],
//             style: {}
//         }
//     ],
//     activities: [
//         {
//             id: "a101",
//             txt: "Changed Color",
//             createdAt: 154514,
//             byMember: {
//                 _id: "u101",
//                 fullname: "Abi Abambi",
//                 imgUrl: "http://some-img"
//             },
//             task: {
//                 id: "c101",
//                 title: "Replace Logo"
//             }
//         }
//     ],
//     cmpsOrder: [
//         "status-picker",
//         "member-picker",
//         "date-picker"
//     ]
// }).then(x => console.log(x))
