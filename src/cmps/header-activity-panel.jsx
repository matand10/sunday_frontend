import React from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import dotsMenu from '../assets/img/side-nav/ds-menu.svg'
import { PanelInput } from '../cmps/panel-input.jsx'
import { UpdateList } from '../cmps/update-list'
import { addUpdate, removeUpdate } from '../store/update/update.action'
import { Avatar, AvatarGroup } from '@mui/material'
import { BiTime } from 'react-icons/bi'
import { utilService } from '../services/util.service';
export class _SidePanel extends React.Component {

    state = {
        isModalOpen: true,
        isInputClicked: false,
        users: this.props.users,
        user: this.props.user,
        isUpdateOpen: true
    }

    deleteUpdate = (updateId, updateIdx) => {
        const { group, taskIdx } = this.props
        group.tasks[taskIdx].comments.splice(updateIdx, 1)
        this.props.updateGroup(group)
        this.props.removeUpdate(updateId)
    }

    closeModal = () => {
        this.props.onCloseModal()
    }

    onUpdate = async (update) => {
        const { group, taskIdx, board } = this.props
        const newGroup = { ...group }
        const addedUpdate = await this.props.addUpdate(update)
        console.log('addedUpdate', addedUpdate);
        newGroup.tasks[taskIdx].comments.push(addedUpdate)
        this.props.updateGroup(newGroup)
    }

    togglePaging = (value) => {
        this.setState((prevState) => ({ ...prevState, isUpdateOpen: value }))
    }

    toggleInput = (value) => {
        this.setState((prevState) => ({ ...prevState, isInputClicked: value }))
    }


    render() {
        const { menuRef, user, task, board, setIsActivityModal } = this.props
        const { isModalOpen, isInputClicked, users, isUpdateOpen } = this.state


        return <section onClick={() => this.toggleInput(false)} ref={menuRef}>
            <div className="side-panel-modal" style={{ left: isModalOpen ? '0px' : '3000px' }}>
                <div className="modal-content">
                    <div className="side-panel-title">
                        <div className="close-action-wrapper">
                            <span className="close-side-panel" onClick={() => setIsActivityModal(false)}>&times;</span>
                        </div>
                        <div className="side-panel-header-container">
                            <div className="side-panel-title-wrapper">
                                <h1>{board.title}</h1>
                            </div>
                            <div className="panel-subscribers-wrapper">
                                <AvatarGroup>
                                    {board.members.map((user, userIdx) => {
                                        return <Avatar key={userIdx} alt={user.fullname} src={user.userImg} sx={{ width: 28, height: 28 }} />
                                    })}
                                </AvatarGroup>
                                <span>|</span>
                                <div className="ds-menu-side-panel"><img src={dotsMenu} alt="dots-menu-logo" /></div>
                            </div>
                        </div>

                        <div className="side-panel-nav-wrapper">
                            <div className="side-panel-nav-container">
                                <div className="side-panel-nav-item">
                                    <button className={`panel-nav-button ${isUpdateOpen ? 'active' : ''}`} onClick={() => this.togglePaging(true)}><span>Updates</span></button>
                                    <button className={`panel-nav-button ${isUpdateOpen ? '' : 'active'}`} onClick={() => this.togglePaging(false)}><span>Activity</span></button>
                                </div>
                            </div>
                        </div>

                        {isUpdateOpen && <div className="main-update-container">
                            <div className="main-update-list-container">
                                {board.comments && board.comments.map((update, idx) => {
                                    return <div key={idx}>
                                        <UpdateList updateIdx={idx} deleteUpdate={this.deleteUpdate} users={users} update={update} />
                                    </div>
                                })}
                            </div>
                        </div>}

                        {!isUpdateOpen && <div className="main-activity-container">
                            {board.activities.map((activity, idx) => {
                                console.log(activity);
                                return <div key={idx} className="activity-row">
                                    <div className="activity-time"><BiTime /><span>{moment(activity.createdAt).fromNow()}</span></div>
                                    <div>{activity.taskTitle}</div>
                                    <div className="flex align-items activity-member">
                                        <Avatar key={idx} alt={activity.byMember.fullname} src={activity.byMember.userImg} sx={{ width: 28, height: 28 }} />
                                        {activity.byMember.fullname}
                                    </div>
                                    <div className="activity-msg">{activity.msg}</div>
                                </div>
                            })}
                        </div>}
                    </div>
                </div>
            </div>
        </section>

    }
}


function mapStateToProps(state) {
    return {
        users: state.userModule.users,
        user: state.userModule.user,
        updates: state.updateModule.updates
    }
}

const mapDispatchToProps = {
    addUpdate,
    removeUpdate
}

export const SidePanel = connect(
    mapStateToProps, mapDispatchToProps
)(_SidePanel)