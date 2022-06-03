import React from "react"
import { uploadService } from '../services/upload.service'
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaPalette, FaTextHeight } from 'react-icons/fa';

export class PanelInput extends React.Component {

    state = {
        update: {
            txt: '',
            byUser: this.props.user.fullname,
            aboutTaskId: this.props.task.id
        },
    }

    onToggleInput = (ev, value) => {
        ev.stopPropagation();
        this.props.toggleInput(value)
    }

    onUpdateSubmit(ev) {
        ev.preventDefault()
        const { update } = this.state
        update.updateDate = Date.now()
        this.props.onUpdate(update)
        this.setState({ update: { txt: '' } })
    }

    handleParentClick = (ev) => {
        ev.stopPropagation();
    }

    onUploadFile = async (ev) => {
        await uploadService.uploadImg(ev)
    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState((prevState) => ({ update: { ...prevState.update, txt: value } }))
    }

    render() {
        const { txt } = this.state.update
        const { isInputClicked } = this.props
        let placeHolder = this.onUserGuide

        return <section>
            {!isInputClicked && <div className="new-post-placeholder-container">
                <button className="new-post-placeholder" onClick={(ev) => this.onToggleInput(ev, true)}><span className="new-post-placeholder-span">Write an update...</span></button>
            </div>}
            <form onSubmit={(ev) => this.onUpdateSubmit(ev)} className="side-panel-form" autoComplete="off">
                {isInputClicked && <div onClick={this.handleParentClick} className="main-panel-wrapper">
                    <div className="main-panel-input-container">
                        <div className="panel-side-input-tools">
                            <span className="panel-icon"><FaBold /></span>
                            <span className="panel-icon"><FaItalic /></span>
                            <span className="panel-icon"><FaUnderline /></span>
                            <span className="panel-icon"><FaStrikethrough /></span>
                            <span className="panel-icon"><FaPalette /></span>
                            <span className="panel-icon"><FaTextHeight /></span>
                        </div>
                        <div className="side-panel-textarea-container">
                            <textarea type="text" id="create-note" rows="5" cols="50" placeholder={placeHolder}
                                value={txt} className="side-panel-textarea" onChange={this.handleChange} />
                        </div>
                        {/* {isInputClicked && <div onClick={() => this.toggleInput(false)} className="close-panel-input-btn">Close</div>} */}
                    </div>
                    <div className="side-panel-actions-wrapper">
                        <span className="upload-file-btn" onClick={(ev) => this.onUploadFile(ev)}>Add files</span>
                        <button className="panel-submit-btn">Upload</button>
                    </div>

                </div>}
            </form>
        </section>
    }
}