import { useOutletContext } from 'react-router-dom'
import { GroupList } from '../cmps/group-list.jsx'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useState } from 'react';
import { groupService } from '../services/group.service.js';
import { RestartAlt } from '@mui/icons-material';
import { boardService } from '../services/board.service.js';


export const MainBoard = () => {
    const { board, updateBoard, onAddTask, updates, onRemoveGroup, updateTask, removeTask, updateGroup, updateTaskDate, onFilter, frontFilter } = useOutletContext()
    const [boardUpdate, setBoardUpdate] = useState(board)

    if (!board) return <h1>Loading...</h1>
    if (!board.groups) return <h1>Loading...</h1>

    const onDragEnd = (res) => {
        if (!res.destination) return
        let newBoard
        if (res.type === 'droppableGroup') newBoard = boardService.onDragGroup(res, board)
        else if (res.type === 'droppableCol') newBoard = boardService.onDragCol(res, board)
        else if (res.type === 'droppableTask') {
            newBoard = boardService.onDragTask(res, board)
            onFilter({ ...frontFilter, sortBy: 'clear' })
        }
        updateBoard(newBoard)
    }

    return <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" type="droppableGroup">
            {(provided, snapshot) => (
                <div className="group-main-container" ref={provided.innerRef}>
                    {board.groups.map((group, idx) => {
                        return <Draggable draggableId={group.id.toString()} key={group.id} index={idx}>
                            {(provided, snapshot) => (
                                <GroupList provided={provided}
                                    snapshot={snapshot} onDragEnd={onDragEnd} updates={updates} updateBoard={updateBoard} removeTask={removeTask} key={idx} board={board} group={group} onAddTask={onAddTask} onRemoveGroup={onRemoveGroup} updateTask={updateTask} updateGroup={updateGroup} updateTaskDate={updateTaskDate} />
                            )}
                        </Draggable>
                    }
                    )}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </DragDropContext>
}