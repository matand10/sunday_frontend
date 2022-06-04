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
    addTask,
    getColumns
}

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

function addTask(board, task, groupId) {
    const newBoard = { ...board }
    const columns = board.columns
    // const columns = board.groups[groupIdx].columns
    const newColumns = getColumns(columns)
    const newTask = getEmptyTask(newColumns)
    if (task && groupId) {
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        newTask.title = task.title
        if (task.status) {
            const statIdx = board.columns.findIndex(col => col.id === 'col2')
            console.log(task.status);
            if (statIdx > -1) newTask.columns[statIdx].value = utilService.getLabel(task.status)
        }
        newBoard.groups[groupIdx].tasks.push(newTask)
    } else {
        // newTask = getEmptyTask(board.columns)
        newBoard.groups[0].tasks.push(newTask)
    }
    return newBoard
}

function getColumns(columns) {
    return columns.map(col => {
        switch (col.type) {
            case 'status':
                return {
                    title: 'Status',
                    importance: col.importance,
                    value: utilService.getLabel(''),
                    type: 'status'
                }
            case 'person':
                return {
                    title: 'Person',
                    importance: col.importance,
                    value: [],
                    type: 'person'
                }
            case 'date':
                return {
                    title: 'Date',
                    importance: col.importance,
                    value: new Date(),
                    type: 'date'
                }
            case 'text':
                return {
                    importance: col.importance,
                    title: "Text",
                    type: "text",
                    value: ""
                }

        }
    })
}

function getEmptyTask(columns) {
    return {
        id: utilService.makeId(),
        title: 'item 1',
        comments: [],
        // status: utilService.getLabel(),
        archivedAt: new Date(),
        columns
    }
}