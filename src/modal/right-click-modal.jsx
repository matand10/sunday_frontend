import { AiOutlineUserAdd } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import {FaPencilAlt} from "react-icons/fa"
import React from "react"

export const OnClickMenu = ({ isMenuOpen, menuRef }) => {



    return <React.Fragment>
        {isMenuOpen && <section ref={menuRef} className="rc-main-menu-inner">
            <div className="rc-main-section">
                <div className="rc-menu-item">
                    <div className="rc-content-wrapper">
                        <div className="rc-icon"><FaPencilAlt/></div>
                        <div className="rc-title">Rename task</div>
                    </div>
                    <div className="rc-content-wrapper">
                        <div className="rc-icon"><BsTrash  /></div>
                        <div className="rc-title">Delete</div>
                    </div>
                    
                </div>
            </div>
        </section>}
    </React.Fragment>
}