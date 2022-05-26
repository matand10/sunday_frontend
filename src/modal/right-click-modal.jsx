import { AiOutlineUserAdd } from "react-icons/ai";
import { BsGraphUp, BsTrash } from "react-icons/bs";
import React from "react"

export const OnClickMenu = ({ isMenuOpen, menuRef }) => {



    return <React.Fragment>
        {isMenuOpen && <section ref={menuRef} className="rc-main-menu-inner">
            <div className="rc-main-section">
                <div className="rc-menu-item">
                    <div className="rc-content-wrapper">
                        <div className="rc-icon"><AiOutlineUserAdd /></div>
                        <div className="rc-title">Board members</div>
                    </div>
                    <div className="rc-content-wrapper">
                        <div className="rc-icon"><AiOutlineUserAdd /></div>
                        <div className="rc-title">Rename task</div>
                    </div>
                    <div className="rc-content-wrapper">
                        <div className="rc-icon"><AiOutlineUserAdd /></div>
                        <div className="rc-title">Copy</div>
                    </div>
                    <div className="rc-content-wrapper">
                        <div className="rc-icon"><AiOutlineUserAdd /></div>
                        <div className="rc-title">Open task</div>
                    </div>
                </div>
            </div>
        </section>}
    </React.Fragment>
}