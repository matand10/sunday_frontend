import { useState } from "react"
import dotsMenu from '../assets/img/side-nav/ds-menu.svg'


export const SidePanel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    return <section>
        <button className="side-panel-btn" onClick={toggleModal}>Open Modal</button>
        <div className="side-panel-modal" style={{ left: isModalOpen ? '0px' : '1000px' }}>
            <div className="modal-content">
                <div className="side-panel-title">
                    <div className="close-action-wrapper">
                        <span className="close" onClick={toggleModal}>&times;</span>
                    </div>
                    <div className="side-panel-header-container">
                        <div className="side-panel-title-wrapper">
                            <h1>Task name here</h1>
                        </div>
                        <div className="panel-subscribers-wrapper">
                            <span>Members icon</span>
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
                </div>
            </div>
        </div>
    </section>
}