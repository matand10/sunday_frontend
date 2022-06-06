import React, { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import { Avatar } from '@mui/material'

export const InviteUserMenu = ({ users, updateBoard, setUnAssignedUsers, board, isInviteMenuOpen, menuRef, setAssignedUsers }) => {
    const [filteredUsers, setFilteredUsers] = useState([])

    useEffect(() => {
        const unAssignedUsers = userService.getUnAssignedUsers(users, board)
        setFilteredUsers(unAssignedUsers)
        setUnAssignedUsers(unAssignedUsers)
    }, [])

    useEffect(() => {
        setUnAssignedUsers(userService.getUnAssignedUsers(users, board))
    }, [filteredUsers])

    const deleteUserFromInvite = (user) => {
        inviteUserToBoard(user)
        const unAssignedUsers = userService.getUnAssignedUsers(users, board)
        setFilteredUsers(unAssignedUsers)
    }

    const inviteUserToBoard = (user) => {
        board.members.push(user)
        const newBoard = { ...board }
        updateBoard(newBoard)
    }

    return <>
        {isInviteMenuOpen && <section className="user-invite-modal">
            <section ref={menuRef} className="user-invite-menu">
                <div className="user-invite-menu-container">
                    {filteredUsers.map((user, idx) => {
                        return <div onClick={() => deleteUserFromInvite(user)} className="users-invitation-container" key={idx}>
                            <div className="user-img-invite"><Avatar key={idx} alt={user.fullname} src={user.userImg} sx={{ width: 28, height: 28 }} /></div>
                            <h4>{user.fullname}</h4>
                        </div>
                    })}
                </div>
            </section>
        </section>}
    </>

}