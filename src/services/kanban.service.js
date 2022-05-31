


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
                persons: specific.columns[0].value,
                groupName: group.title
            })
        })
    })
    return done

}

function getKanban(board) {
    return {
        Done: getTaskName(board, 'Done'),
        WorkingOnIt: getTaskName(board, 'Working on it'),
        Stuck: getTaskName(board, 'Stuck'),
        Empty: getTaskName(board, '')
    }
}

function getStatusType() {
    return ['Done', 'Working on it', 'Stuck', 'Empty']
}