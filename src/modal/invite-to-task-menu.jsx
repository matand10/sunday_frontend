import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { userService } from "../services/user.service"
import { TiDelete } from 'react-icons/ti'
import { Avatar } from "@mui/material"

export const InviteToTaskModal = ({ specialUpdateTask, statusRef, task, board, colIdx, setInviteUserModal, updateTask, group }) => {
    const { users } = useSelector((storeState) => storeState.userModule)
    const [unAssignedUsers, setUnAssignedUsers] = useState([])

    useEffect(() => {
        let unAssigned = userService.getAssignedToTask(users, task, board, colIdx)
        if (!unAssigned) unAssigned = userService.getAssignedUsers(users, board)
        console.log('unAssigned', unAssigned);
        // unAssigned = checkAssignment(unAssigned)
        setUnAssignedUsers(unAssigned)
    }, [])

    const checkAssignment = (users) => {
        const assignment = users.filter(user => {
            const assignedUser = task.columns[colIdx].value.find(assignedUser => {
                return assignedUser._id === user._id
            })
            return assignedUser._id !== user._id
        })
        return assignment
    }

    const assignUserToTask = (user, userIdx) => {
        deleteUnassignedUser(userIdx)
        let newTask = { ...task }
        let users = [...newTask.columns[colIdx].value]
        users.push(user)
        specialUpdateTask(users, colIdx)
        setInviteUserModal(false)
    }

    const deleteUnassignedUser = (userIdx) => {
        const newUnAssignedUsers = [...unAssignedUsers]
        newUnAssignedUsers.splice(userIdx, 1)
        setUnAssignedUsers(newUnAssignedUsers)
    }

    const removeFromAssign = (ev, user, userIdx) => {
        ev.stopPropagation()
        const newUnAssignedUsers = [...unAssignedUsers]
        newUnAssignedUsers.push(user)
        setUnAssignedUsers(newUnAssignedUsers)
        const newTask = { ...task }
        newTask.columns[colIdx].value.splice(userIdx, 1)
        updateTask(newTask, group.id)
    }

    // console.log('unAssignedUsers', unAssignedUsers);

    return <section className="invite-member-task-wrapper" ref={statusRef}>
        <div className="invite-member-task-container">
            <div className="assigned-to-task-members">
                <h3>Assigned</h3>
                {task.columns[colIdx].value.map((user, idx) => {
                    return <div className="assigned-members" key={idx}>
                        <div className="flex align-items assigned-users">
                            <div>
                                <Avatar key={idx} alt={user.fullname} src={user.userImg} sx={{ width: 28, height: 28 }} />
                            </div>
                            <span>{user.fullname}</span>
                        </div>
                        <div className="remove-assigned-user-btn">
                            <button onClick={(ev) => removeFromAssign(ev, user, idx)}><TiDelete /></button>
                        </div>
                    </div>
                })}
            </div>

            <div className="invite-member-divider-modal">
                <div className="divider-invite"></div>
                <span>People</span>
                <div className="divider-invite"></div>
            </div>

            <div className="assigned-to-task-members">
                <h3>Unassigned</h3>
                {unAssignedUsers.map((user, idx) => {
                    return <div className="assigned-members" key={idx} onClick={() => assignUserToTask(user, idx)}>
                        <div className="flex align-items assigned-users">
                            <div>
                                <Avatar key={idx} alt={user.fullname} src={user.userImg} sx={{ width: 28, height: 28 }} />
                            </div>
                            <span>{user.fullname}</span>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </section>
}