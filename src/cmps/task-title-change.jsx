import React from 'react'
import { connect } from 'react-redux'
import { BiMessageRounded } from 'react-icons/bi'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service'

export class _TaskTitleChange extends React.Component {

    state = {
        isClicked: false,
        title: this.props.task.title

    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState((prevState) => ({ ...prevState, title: value }))
    }

    onChangeTitle = (ev) => {
        ev.preventDefault()
        const { group, board, setUpdateIsClick } = this.props
        const { title } = this.state
        const newTask = { ...this.props.task }
        newTask.title = title
        const activity = this.handleActivity(this.props.task, title)
        newTask.activities.unshift(activity)
        board.activities.unshift(activity)
        this.props.updateTask(newTask, group.id, board)
        setUpdateIsClick({})
    }

    handleActivity = (task, title) => {
        const user = userService.getLoggedinUser()
        return {
            id: utilService.makeId(),
            msg: `Changed title to ${title}`,
            createdAt: Date.now(),
            byMember: { ...user },
            taskTitle: task.title
        }
    }


    render() {
        const { statusRef, task, group, onUpdateTask, onOpenModal, board, updateIsClick, updates } = this.props
        const { title } = this.state

        return <div className="task-title-content" >
            {(updateIsClick.boardId && updateIsClick.groupId === group.id && updateIsClick.task.id === task.id) ?
                <div className="title-update-input">
                    <form onSubmit={this.onChangeTitle} className="group-title-form">
                        <input value={title} type="text" onChange={this.handleChange} name="title" onClick={(event) => (event.stopPropagation())} ref={statusRef} />
                    </form>
                    <div className="activity-main-container" onClick={onOpenModal}>
                        <BiMessageRounded className="activities-icon" style={{ color: task.comments?.length ? '#1976d2' : '' }} />
                    </div>
                </div>
                :
                <div className="task-title-cell">
                    <div className="task-title-info">
                        {task.title}
                    </div>
                    <div className="edit-button-container">
                        <button onClick={(event) => onUpdateTask(event, { boardId: board._id, groupId: group.id, task: task })} className="edit-button">Edit</button>
                    </div>
                    <div className="activity-main-container" onClick={onOpenModal}>
                        <BiMessageRounded className="activities-icon" style={{ color: task.comments?.length ? '#1976d2' : '' }} />
                        {task.comments.length > 0 && <div className="update-indication">{task.comments.length}</div>}
                    </div>
                </div>}
        </div>
    }
}

function mapStateToProps(state) {
    return {
        updates: state.updateModule.updates
    }
}

const mapDispatchToProps = {

}

export const TaskTitleChange = connect(
    mapStateToProps, mapDispatchToProps
)(_TaskTitleChange)