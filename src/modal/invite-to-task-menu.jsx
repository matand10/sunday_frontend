import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userService } from "../services/user.service"
import useImg from '../assets/img/user-invite/userImg.png'

export const InviteToTaskModal = ({ specialUpdateTask, statusRef, task, board, colIdx, setInviteUserModal }) => {
    const { users, user } = useSelector((storeState) => storeState.userModule)
    const [unAssignedUsers, setUnAssignedUsers] = useState([])
    const [assignedUsers, setAssignedUsers] = useState([])
    const dispatch = useDispatch()


    useEffect(() => {
        const object = userService.getAssign(users, task, board, colIdx)
        setUnAssignedUsers(object.unassign)
        setAssignedUsers(object.assign)
    }, [])



    const assignUserToTask = (user, idx) => {
        let newTask = { ...task }
        let users = [...newTask.columns[colIdx].value]
        users.push(user)
        specialUpdateTask(users, colIdx)
        let newAssigned = unAssignedUsers
        newAssigned.splice(idx, 1)
        setUnAssignedUsers(newAssigned)
        setInviteUserModal(false)
    }

    return <section className="invite-member-task-wrapper" ref={statusRef}>
        <div className="invite-member-task-container">
            <div className="assigned-to-task-members">
                <h3>Assigned</h3>
                {task.columns[colIdx].value.map((user, idx) => {
                    return <div className="assigned-members" key={idx}>
                        <div className="user-invite-pic-container">
                            <img className="user-picture" src={user.userImg || useImg} alt="user-img" />
                        </div>
                        <span>{user.fullname}</span>
                    </div>
                })}
            </div>
            <div className="invite-member-divider-modal">
                <div className="divider-invite"></div>
                <span>People</span>
                <div className="divider-invite"></div>
            </div>
            <div className="unassigned-to-task-members">
                <h3>Unassigned</h3>
                {unAssignedUsers.map((user, idx) => {
                    return <div onClick={() => assignUserToTask(user, idx)} className="assigned-members" key={idx}>
                        <div className="user-invite-pic-container">
                            <img className="user-picture" src={user.userImg || useImg} alt="user-img" />
                        </div>
                        <span>{user.fullname}</span>
                    </div>
                })}
            </div>
        </div>
    </section>
}