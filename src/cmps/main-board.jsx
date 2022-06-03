import { useOutletContext } from 'react-router-dom'
import { GroupList } from '../cmps/group-list.jsx'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useState } from 'react';


export const MainBoard = () => {
    const { board, updateBoard, onAddTask, updates, onRemoveGroup, updateTask, removeTask, updateGroup, updateTaskDate } = useOutletContext()

    const [boardUpdate, setBoardUpdate] = useState(board)
    // const [groups, setGroups] = useState(board.groups)

    if (!board) return <h1>Loading...</h1>
    if (!board.groups) return <h1>Loading...</h1>

    const onDragEnd = (result) => {
        const newGroups = Array.from(board.groups);
        const [removed] = newGroups.splice(result.source.index, 1);
        newGroups.splice(result.destination.index, 0, removed);
        let newBoard = { ...board }
        newBoard.groups = newGroups
        // setGroupUpdate(newBoard)
        console.log('main', newBoard);
        setBoardUpdate(newBoard)
        updateBoard(newBoard)
        // setGroups(newGroups)
    };

    return <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
            {(provided) => (
                <div className="group-main-container" {...provided.droppableProps} ref={provided.innerRef}>

                    {board.groups.map((group, idx) => {
                        return <Draggable draggableId={group.id.toString()} key={group.id} index={idx}>
                            {(provided, snapshot) => (
                                <GroupList provided={provided}
                                    snapshot={snapshot} updates={updates} updateBoard={updateBoard} removeTask={removeTask} key={idx} board={board} group={group} onAddTask={onAddTask} onRemoveGroup={onRemoveGroup} updateTask={updateTask} updateGroup={updateGroup} updateTaskDate={updateTaskDate} />
                            )}
                        </Draggable>
                    }
                    )}
                </div>
            )}
        </Droppable>
    </DragDropContext>
}
