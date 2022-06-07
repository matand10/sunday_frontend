import React from 'react'
import { connect } from "react-redux";
import { uploadService } from '../services/upload.service'
import { onLogout, updateUser } from '../store/user/user.actions'
import { CgProfile } from 'react-icons/cg'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import miniLogo from '../assets/img/app-logo/side-logo.png'

export class _UserSideMenu extends React.Component {

    logout = () => {
        this.props.onLogout()
        window.location.href = '/'
    }

    uploadUserImage = async (ev) => {
        const { user } = this.props
        const cloudineryImage = await uploadService.uploadImg(ev)
        user.userImg = cloudineryImage
        this.props.updateUser(user)
    }


    render() {
        const { user } = this.props
        return <section className="user-side-menu" ref={this.props.menuRef}>
            <div className="user-side-menu-container">
                <div className="side-menu-avatar">
                    <div className="user-side-menu-logo">
                        <img className="surface-item-image" src={miniLogo} alt="Logo-img" />
                    </div>
                    <h3>{user?.fullname || <Link to="/login">Login</Link>}</h3>
                </div>
                <div className="divider"></div>
                <div className="side-user-menu-content">
                    <div className="side-user-content-header">
                        <h3>Account</h3>
                    </div>
                    <div className="side-user-content-wrapper">
                        <ul className="side-menu-container-list clean-list">
                            <li className="side-menu-list">
                                <label className="upload-img">
                                    <CgProfile /><h4>
                                        Profile Img
                                        <input className="upload-img-input" onChange={(ev) => this.uploadUserImage(ev)} type="file" />
                                    </h4>
                                </label>
                            </li>
                            <li className="side-menu-list" onClick={this.logout}><BiLogOut /><h4>Logout</h4></li>
                        </ul>
                    </div>
                </div>
                <div className="side-user-menu-footer"></div>
            </div>
        </section>
    }
}

function mapStateToProps(storeState) {
    return {
        user: storeState.userModule.user,
    }
}
const mapDispatchToProps = {
    onLogout,
    updateUser
}

export const UserSideMenu = connect(mapStateToProps, mapDispatchToProps)(_UserSideMenu)