import { Avatar, AvatarGroup } from '@mui/material'

export const MemberCol = ({ col, board, task, setInviteUserModal, idx, statusRef, specialUpdateTask, inviteUserModal, InviteToTaskModal, updateTask, group }) => {


    return col.value?.length ?
        <div onClick={() => setInviteUserModal(true)} className="flex-row-items user-image-container">
            <AvatarGroup>
                {col.value.map((user, userIdx) => {
                    return <Avatar key={userIdx} alt={user.fullname} src={user.userImg} sx={{ width: 28, height: 28 }} />
                })}
            </AvatarGroup>
            {inviteUserModal && <InviteToTaskModal updateTask={updateTask} group={group} setInviteUserModal={setInviteUserModal} specialUpdateTask={specialUpdateTask} colIdx={idx} statusRef={statusRef} board={board} task={task} />}
        </div >
        :
        <div onClick={() => setInviteUserModal(true)} className="flex-row-items">
            <div className="user-image-wrapper">
                <Avatar sx={{ width: 28, height: 28 }}>G</Avatar>
                {inviteUserModal && <InviteToTaskModal updateTask={updateTask} group={group} setInviteUserModal={setInviteUserModal} specialUpdateTask={specialUpdateTask} colIdx={idx} statusRef={statusRef} board={board} task={task} />}
            </div>
        </div>
}