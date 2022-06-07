import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import logo from "../assets/img/app-logo/side-logo.png"
import workspaceImg from "../assets/img/side-nav/surface-workspace-logo.png"
import productSwtich from "../assets/img/side-nav/product-switcher-logo.png"
import { useEffect, useRef, useState } from "react"
import { UserSideMenu } from '../modal/user-side-menu'
import { Avatar } from "@mui/material"

export const SideNav = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isUserSideMenuOpen, setIsUserSideMenuOpen] = useState(false)
    const { user } = useSelector((storeState) => storeState.userModule)
    let menuRef = useRef()


    useEffect(() => {
        document.addEventListener("mousedown", eventListeners)
        return () => {
            document.removeEventListener('mousedown', eventListeners)
        }
    }, [])

    const eventListeners = (ev) => {
        if (!menuRef.current?.contains(ev.target)) {
            setIsDialogOpen(false)
            setIsUserSideMenuOpen(false)
        }
    }

    const toggleDialog = (value) => {
        setIsDialogOpen(value)
    }

    const toggleUserMenu = (value) => {
        setIsUserSideMenuOpen(value)
    }


    return <section className="main-side-nav-container">
        <div className="side-nav-upper">
            <div className="icon-wrapper">
                <div className="surface-homepage-button">
                    <Link className="surface-homepage-navigation-button" to="/board"><img className="surface-item-image" src={logo} alt="Logo-img" /></Link>
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
                    <Avatar alt={user.fullname} src={user.userImg} sx={{ width: 33, height: 33 }} onClick={() => toggleUserMenu(true)} />
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
        {isUserSideMenuOpen && <UserSideMenu menuRef={menuRef} />}
    </section>
}