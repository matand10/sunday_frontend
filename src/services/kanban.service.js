import { utilService } from "./util.service";



export const kanbanService = {
    getTaskName,
    getKanban,
    getStatusType,
    onDragStatus,
    onDragCard
}

function onDragStatus(res, kanban) {
    const [removed] = kanban.splice(res.source.index, 1)
    kanban.splice(res.destination.index, 0, removed)
    return kanban
}

function onDragCard(res, board, dragKanban) {

    let [card] = dragKanban[res.source.droppableId].kanban.splice(res.source.index, 1)
    card.color = dragKanban[res.destination.droppableId].color
    card.status = dragKanban[res.destination.droppableId].status

    dragKanban[res.destination.droppableId].kanban.splice(res.destination.index, 0, card)

    const groupIdx = board.groups.findIndex(group => group.id === card.groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === card.taskId)
    const colIdx = board.groups[groupIdx].tasks[taskIdx].columns.findIndex(col => col.id === 'col2')

    console.log(board.groups[groupIdx].tasks[taskIdx].columns);
    console.log(taskIdx);
    console.log(colIdx);
    console.log(board.groups[groupIdx].tasks[taskIdx].columns[colIdx]);
    board.groups[groupIdx].tasks[taskIdx].columns[colIdx].value = utilService.getLabel(dragKanban[res.destination.droppableId].status)

    return { dragKanban, board }
}

function getTaskName(board, status) {
    let done = []
    board.groups.forEach(group => {
        const filter = group.tasks.filter(task => {
            return task.columns.some(col => col.value.title === status)
        })
        filter.forEach(specific => {
            done.push({
                taskName: specific.title,
                taskId: specific.id,
                persons: specific.columns[0].value,
                groupName: group.title,
                groupColor: group.style.color,
                groupId: group.id,
                color: specific.columns[1].value.color,
                status: status ? status : 'Empty'
            })
        })
    })
    return done

}

function getKanban(board) {
    return [{
        id: 'done',
        kanban: getTaskName(board, 'Done'),
        status: 'Done',
        color: '#00c875',
    },
    {
        id: 'working',
        kanban: getTaskName(board, 'Working On It'),
        status: 'Working On It',
        color: '#fdab3d'
    },
    {
        id: 'stuck',
        kanban: getTaskName(board, 'Stuck'),
        status: 'Stuck',
        color: '#e2445c'
    },
    {
        id: 'empty',
        kanban: getTaskName(board, ''),
        status: 'Empty',
        color: '#c4c4c4'
    }
    ]
}

function getStatusType() {
    return ['Done', 'Working on it', 'Stuck', 'Empty']
}