


export const kanbanService = {
    getTaskName,
    getKanban,
    getStatusType
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
    return {
        Done: {
            kanban: getTaskName(board, 'Done'),
            status: 'Done',
            color: '#00c875',
        },
        WorkingOnIt: {
            kanban: getTaskName(board, 'Working on it'),
            status: 'Working on it',
            color: '#fdab3d'
        },
        Stuck: {
            kanban: getTaskName(board, 'Stuck'),
            status: 'Stuck',
            color: '#e2445c'
        },
        Empty: {
            kanban: getTaskName(board, ''),
            status: 'Empty',
            color: '#c4c4c4'
        }
    }
}

function getStatusType() {
    return ['Done', 'Working on it', 'Stuck', 'Empty']
}