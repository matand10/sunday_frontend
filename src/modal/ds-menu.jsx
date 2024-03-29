import React from "react"
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsGraphUp, BsTrash } from "react-icons/bs";

export const DsMenu = ({ isMenuOpen, menuRef }) => {



    return <>
        {isMenuOpen && <section ref={menuRef} className="ds-main-menu-inner">
            <div className="ds-main-section">
                <div className="ds-menu-item">
                    <div className="ds-content-wrapper">
                        <div className="ds-icon"><AiOutlineUserAdd /></div>
                        <div className="ds-title">Board members</div>
                    </div>
                    <div className="ds-content-wrapper">
                        <div className="ds-icon"><BsGraphUp /></div>
                        <div className="ds-title">Board Activity</div>
                    </div>
                    <div className="ds-content-wrapper">
                        <div className="ds-icon"><BsTrash /></div>
                        <div className="ds-title">Delete board</div>
                    </div>
                </div>
            </div>
        </section>}
    </>
}