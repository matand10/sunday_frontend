import React from 'react'
import { BiMessageRounded } from 'react-icons/bi'

export class TaskTitleChange extends React.Component {

    state = {
        isClicked: false,
        title: this.props.task.title

    }

    componentDidMount() {

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
        this.props.updateTask(newTask, group.id, board)
        setUpdateIsClick({})
    }


    render() {
        const { statusRef, task, group, onUpdateTask, onOpenModal, board, updateIsClick } = this.props
        const { title } = this.state
        return <div className="task-title-content" >
            {(updateIsClick.boardId && updateIsClick.groupId === group.id && updateIsClick.task.id === task.id) ?
                <div className="title-update-input">
                    <form onSubmit={this.onChangeTitle} className="group-title-form">
                        <input value={title} type="text" onChange={this.handleChange} name="title" onClick={(event) => (event.stopPropagation())} ref={statusRef} />
                    </form>
                    <div className="activity-main-container">
                        <BiMessageRounded className="activities-icon" onClick={onOpenModal} style={{ color: task.comments?.length ? '#1976d2' : '' }} />
                    </div>
                </div>
                :
                <div className="task-title-cell">
                    <div>
                        {task.title}
                    </div>
                    <div className="edit-button-container">
                        <button onClick={(event) => onUpdateTask(event, { boardId: board._id, groupId: group.id, task: task })} className="edit-button">Edit</button>
                    </div>
                    <div className="activity-main-container">
                        <BiMessageRounded className="activities-icon" onClick={onOpenModal} style={{ color: task.comments?.length ? '#1976d2' : '' }} />
                    </div>
                </div>}
        </div>

    }
}