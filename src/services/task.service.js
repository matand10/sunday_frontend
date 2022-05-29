import { getOptionUnstyledUtilityClass } from '@mui/base'
import { storageService } from './async-storage.service'
import { boardService } from './board.service'
import { utilService } from './util.service'
import { groupService } from './group.service'


const STORAGE_KEY = 'group_db'


export const taskService = {
    // query,
    getById,
    save,
    remove,
    getEmptyTask,
    addTask
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

async function getById(taskId) {
    try {
        const res = await storageService.get('task', taskId)
        return res.data
    } catch (err) {
        console.log('err', err)
    }
}

async function remove(taskId, groupId, boardId) {
    let currBoard = await boardService.getById(boardId)
    const currGroup = groupService.getById(groupId, currBoard)
    const groupIdx = currBoard.groups.findIndex(group => group.id === groupId)
    const taskIdx = currGroup.tasks.findIndex(task => task.id === taskId)
    currBoard.groups[groupIdx].tasks.splice(taskIdx, 1)
    await storageService.put(STORAGE_KEY, currBoard)
    return currBoard
}

async function save(task, groupId, boardId) {
    let currBoard = await boardService.getById(boardId)
    const currGroup = groupService.getById(groupId, currBoard)
    const groupIdx = currBoard.groups.findIndex(group => group.id === groupId)
    const taskIdx = currGroup.tasks.findIndex(currTask => currTask.id === task.id)
    try {
        let groups = [...currBoard.groups]
        currBoard.groups = groups
        if (task._id) {
            currBoard.groups[groupIdx].tasks.splice(taskIdx, 1, task)
        } else {
            // task.owner = userService.getLoggedinUser();
            currBoard.groups[groupIdx].tasks.push(task)

        }
        await storageService.put(STORAGE_KEY, currBoard)
        return currBoard
    } catch (err) {
        console.log('err', err)
    }
}

async function addTask(board, task, groupId) {
    const newBoard = { ...board }
    if (task && groupId) {
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        const newTask = await getEmptyTask(board.groups[groupIdx].columns)
        newTask.title = task.title
        newBoard.groups[groupIdx].tasks.push(newTask)
    } else {
        const newTask = getEmptyTask(board.groups[0].columns)
        newBoard.groups[0].tasks.push(newTask)
    }
    return Promise.resolve(newBoard)
}

function getEmptyTask(columns) {
    return {
        id: utilService.makeId(),
        title: 'item 1',
        comments: [],
        // status: utilService.getLabel(),
        archivedAt: new Date(),
        columns: [...columns] 
    }
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
//     Tasks: [
//         {
//             style: {},
//             id: "g101",
//             title: "Task 1",
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
//             title: "Task 2",
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
