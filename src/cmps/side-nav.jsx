import { Link } from "react-router-dom"
import workspaceImg from "../assets/img/side-nav/surface-workspace-logo.png"
import productSwtich from "../assets/img/side-nav/product-switcher-logo.png"
import { useEffect, useRef, useState } from "react"


export const SideNav = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    let menuRef = useRef()

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (!menuRef.current?.contains(event.target)) {
                setIsDialogOpen(false)
            }
        })
    })

    const toggleDialog = (value) => {
        setIsDialogOpen(value)
    }

    return <section className="main-side-nav-container">
        <div className="side-nav-upper">
            <div className="icon-wrapper">
                <div className="surface-homepage-button">
                    <Link className="surface-homepage-navigation-button" to="/board"><img className="surface-item-image" src="https://cdn.monday.com/images/logos/monday_logo_icon.png" alt="Logo-img" /></Link>
                </div>
            </div>
            <div className="surfice-divider"></div>
            <div className="scrollable-navigation">
                <div className="surface-workspace-icon-wrapper">
                    <Link to="/board"><img src={workspaceImg} alt="workspace-logo" /></Link>
                </div>
            </div>
        </div>

        <div className="arrow-left"></div>

        <div className="side-nav-lower">
            <div className="surfice-divider"></div>
            <div className="footer-navigation-items-area">
                <div className="product-switcher">
                    <img onClick={() => toggleDialog(true)} src={productSwtich} alt="dots-logo" />
                </div>
                <div className="user-img">
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="workspace img" />
                </div>
            </div>
        </div>

        {isDialogOpen && <div ref={menuRef} className="dialog-content-container">
            <div className="dialog-upper-content">
                <div className="dialog-upper-title">
                    <h1>Your products</h1>
                </div>
                <div className="divider"></div>
                <div className="dialog-content">
                    <div className="dialog-logo">
                        <img src={workspaceImg} alt="workspace img" />
                    </div>
                    <span>Work management</span>
                </div>
            </div>
        </div>}
    </section>
}