import React from "react"
import dotsMenu from '../assets/img/side-nav/ds-menu.svg'
import { PanelInput } from '../cmps/panel-input.jsx'


export class SidePanel extends React.Component {

    state = {
        isModalOpen: true,
        isInputClicked: false
    }

    toggleModal = () => {
        console.log(this.props)
        this.props.onOpenModal({})
    }

    toggleInput = (value) => {
        this.setState((prevState) => ({ ...prevState, isInputClicked: value }))
    }

    render() {
        const { isModalOpen, isInputClicked } = this.state
        const { boardId, groupId, task } = this.props.modal


        return <section onClick={() => this.toggleInput(false)}>
            {/* <button className="side-panel-btn" onClick={this.toggleModal}>Open Modal</button> */}
            <div className="side-panel-modal" style={{ left: isModalOpen ? '0px' : '3000px' }}>
                <div className="modal-content">
                    <div className="side-panel-title">
                        <div className="close-action-wrapper">
                            <span className="close-side-panel" onClick={this.toggleModal}>&times;</span>
                        </div>
                        <div className="side-panel-header-container">
                            <div className="side-panel-title-wrapper">
                                <h1>{task.title}</h1>
                            </div>
                            <div className="panel-subscribers-wrapper">
                                <span>Members icon</span>
                                <span>|</span>
                                <div className="ds-menu-side-panel"><img src={dotsMenu} alt="dots-menu-logo" /></div>
                            </div>
                        </div>

                        <div className="side-panel-nav-wrapper">
                            <div className="side-panel-nav-container">
                                <div className="side-panel-nav-item">
                                    <button className="panel-nav-button"><span>Update</span></button>
                                </div>
                            </div>
                        </div>

                        <div className="new-post-side-panel">
                            <PanelInput toggleInput={this.toggleInput} isInputClicked={isInputClicked} />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    }
}