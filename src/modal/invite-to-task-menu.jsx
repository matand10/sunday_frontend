import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userService } from "../services/user.service"
import useImg from '../assets/img/user-invite/userImg.png'

export const InviteToTaskModal = ({ statusRef, task, board }) => {
    const { users, user } = useSelector((storeState) => storeState.userModule)
    const [unAssignedUsers, setUnAssignedUsers] = useState([])
    const [assignedUsers, setAssignedUsers] = useState([])
    const dispatch = useDispatch()


    useEffect(() => {
        const unAssigned = userService.getUnAssignedUsers(users, board)
        const assigned = userService.getAssignedUsers(users, board)
        setUnAssignedUsers(unAssigned)
        setAssignedUsers(assigned)
    }, [])


    const assignUserToTask = (user) => {
        console.log(user);
    }

    return <section className="invite-member-task-wrapper" ref={statusRef}>
        <div className="invite-member-task-container">
            <div className="assigned-to-task-members">
                {assignedUsers.map((user, idx) => {
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
                {unAssignedUsers.map((user, idx) => {
                    return <div onClick={() => assignUserToTask(user)} className="assigned-members" key={idx}>
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