import userImg from '../assets/img/user-invite/userImg.png'

export const MemberCol = ({ col, board, task, setInviteUserModal, idx, statusRef, specialUpdateTask, inviteUserModal, InviteToTaskModal }) => {


    return col.value?.length ?
        <div onClick={() => setInviteUserModal(true)} className="flex-row-items user-image-container">{col.value.map((user, userIdx) => {
            return <div key={userIdx} className="user-image-wrapper" >
                <img key={userIdx} style={{ left: `${20 * (userIdx) + 'px'}`, transform: `translateX(${-80 + '%'})` }} className="user-image-icon-assign" src={col.value.userImg || userImg} alt="user image" />
                {inviteUserModal && <InviteToTaskModal setInviteUserModal={setInviteUserModal} specialUpdateTask={specialUpdateTask} colIdx={idx} statusRef={statusRef} board={board} task={task} />}
            </div>
        })}
        </div>
        :
        <div onClick={() => setInviteUserModal(true)} className="flex-row-items">
            <div className="user-image-wrapper">
                <img className="user-image-icon-assign" src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="user image" />
                {inviteUserModal && <InviteToTaskModal setInviteUserModal={setInviteUserModal} specialUpdateTask={specialUpdateTask} colIdx={idx} statusRef={statusRef} board={board} task={task} />}
            </div>
        </div>
}