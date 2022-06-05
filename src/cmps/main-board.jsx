import { useOutletContext } from 'react-router-dom'
import { GroupList } from '../cmps/group-list.jsx'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useState } from 'react';
import { groupService } from '../services/group.service.js';


export const MainBoard = () => {
    const { board, updateBoard, onAddTask, updates, onRemoveGroup, updateTask, removeTask, updateGroup, updateTaskDate } = useOutletContext()
    const [boardUpdate, setBoardUpdate] = useState(board)

    if (!board) return <h1>Loading...</h1>
    if (!board.groups) return <h1>Loading...</h1>

    const onDragGroupEnd = (result) => {
        const newGroups = Array.from(board.groups);
        const [removed] = newGroups.splice(result.source.index, 1);
        newGroups.splice(result.destination.index, 0, removed);
        let newBoard = { ...board }
        newBoard.groups = newGroups
        // setBoardUpdate(newBoard)
        updateBoard(newBoard)
    };

    const onDragColEnd = (result) => {
        let newBoard = { ...board }

        const newColumns = Array.from(board.columns)
        const [removed] = newColumns.splice(result.source.index, 1)
        newColumns.splice(result.destination.index, 0, removed)
        newBoard.columns = newColumns

        board.groups.forEach((group, gIdx) => {
            group.tasks.forEach((task, tIdx) => {
                const newTaskColumns = Array.from(task.columns)
                const [taskRemoved] = newTaskColumns.splice(result.source.index, 1)
                newTaskColumns.splice(result.destination.index, 0, taskRemoved)
                newBoard.groups[gIdx].tasks[tIdx].columns = [...newTaskColumns]
            })
            // const statIdx = group.progress.findIndex(pro => pro.colIdx === result.source.index)
            // if (statIdx > -1) newBoard.groups[gIdx].progress[statIdx].colIdx = result.destination.index
            newBoard.groups[gIdx].progress = groupService.getProgress(group)
        })
        updateBoard(newBoard)
    }

    return <DragDropContext onDragEnd={onDragGroupEnd}>
        <Droppable droppableId="list">
            {(provided) => (
                <div className="group-main-container" ref={provided.innerRef}>

                    {board.groups.map((group, idx) => {
                        return <Draggable draggableId={group.id.toString()} key={group.id} index={idx}>
                            {(provided, snapshot) => (
                                <GroupList provided={provided}
                                    snapshot={snapshot} onDragColEnd={onDragColEnd} updates={updates} updateBoard={updateBoard} removeTask={removeTask} key={idx} board={board} group={group} onAddTask={onAddTask} onRemoveGroup={onRemoveGroup} updateTask={updateTask} updateGroup={updateGroup} updateTaskDate={updateTaskDate} />
                            )}
                        </Draggable>
                    }
                    )}
                </div>
            )}
        </Droppable>
    </DragDropContext>
}