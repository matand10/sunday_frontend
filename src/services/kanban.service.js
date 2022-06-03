


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
        console.log('filter', filter);
        filter.forEach(specific => {
            console.log('spec',specific)
            done.push({
                taskName: specific.title,
                taskId: specific.id,
                persons: specific.columns[0].value,
                groupName: group.title,
                groupColor: group.style.color,
                groupId: group.id,
                color: specific.columns[1].value.color
            })
        })
    })
    console.log('done')
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