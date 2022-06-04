import React from 'react';
import { connect } from "react-redux";
import dotsMenu from '../assets/img/side-nav/ds-menu.svg'
import { PanelInput } from '../cmps/panel-input.jsx'
import { UpdateList } from '../cmps/update-list'
import { addUpdate, removeUpdate } from '../store/update/update.action'
import userImg from '../assets/img/user-invite/userImg.png'

export class _SidePanel extends React.Component {

    state = {
        isModalOpen: true,
        isInputClicked: false,
        users: this.props.users,
        user: this.props.user,
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
        newGroup.tasks[taskIdx].comments.push(addedUpdate)
        this.props.updateBoard(board)
    }

    toggleInput = (value) => {
        this.setState((prevState) => ({ ...prevState, isInputClicked: value }))
    }

    render() {
        const { statusRef, user, task } = this.props
        const { isModalOpen, isInputClicked, users } = this.state

        return <section onClick={() => this.toggleInput(false)} ref={statusRef}>
            <div className="side-panel-modal" style={{ left: isModalOpen ? '0px' : '3000px' }}>
                <div className="modal-content">
                    <div className="side-panel-title">
                        <div className="close-action-wrapper">
                            <span className="close-side-panel" onClick={() => this.closeModal()}>&times;</span>
                        </div>
                        <div className="side-panel-header-container">
                            <div className="side-panel-title-wrapper">
                                <h1>{task.title}</h1>
                            </div>
                            <div className="panel-subscribers-wrapper">
                                <div className="user-img-side-pannel">
                                    <img src={userImg} alt="user image" />
                                </div>
                                <span>|</span>
                                <div className="ds-menu-side-panel"><img src={dotsMenu} alt="dots-menu-logo" /></div>
                            </div>
                        </div>

                        <div className="side-panel-nav-wrapper">
                            <div className="side-panel-nav-container">
                                <div className="side-panel-nav-item">
                                    <button className="panel-nav-button"><span>Update</span></button>
                                    <button className="panel-nav-button"><span>Activity</span></button>
                                </div>
                            </div>
                        </div>

                        <div className="main-update-container">
                            <div className="new-post-side-panel">
                                <PanelInput toggleInput={this.toggleInput} task={task} user={user} addUpdate={addUpdate} onUpdate={this.onUpdate} isInputClicked={isInputClicked} />
                            </div>
                            <div className="main-update-list-container">
                                {task.comments.map((update, idx) => {
                                    return <div key={update._id}>
                                        <UpdateList updateIdx={idx} deleteUpdate={this.deleteUpdate} users={users} update={update} />
                                    </div>
                                })}
                            </div>
                        </div>

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