import React, { useEffect, useState } from "react"
import userImg from '../assets/img/user-invite/userImg.png'
import { userService } from "../services/user.service"

export const InviteUserMenu = ({ users, updateBoard, setUnAssignedUsers, board, isInviteMenuOpen, menuRef }) => {
    const [filteredUsers, setFilteredUsers] = useState([])

    useEffect(() => {
        const unAssignedUsers = userService.checkBoardUsers(users, board)
        setFilteredUsers(unAssignedUsers)
        setUnAssignedUsers(unAssignedUsers)
    }, [])

    const inviteUserToBoard = (user) => {
        board.members.push(user)
        const newBoard = { ...board }
        updateBoard(newBoard)
        setFilteredUsers(userService.checkBoardUsers(users, newBoard))
        console.log(newBoard)
    }

    return <React.Fragment>
        {filteredUsers.length && isInviteMenuOpen && <section ref={menuRef} className="user-invite-menu">
            <div className="user-invite-menu-container">
                {filteredUsers.map((user, idx) => {
                    return <div onClick={() => inviteUserToBoard(user)} className="users-invitation-container" key={idx}>
                        <div className="user-img-invite"><img src={user.userImg || userImg} /></div>
                        <h4>{user.fullname}</h4>
                    </div>
                })}
            </div>
        </section>}
    </React.Fragment>

}