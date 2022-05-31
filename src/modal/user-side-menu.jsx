import React from 'react'
import { connect } from "react-redux";
import { FiUser } from 'react-icons/fi'
import { BiLogOut } from 'react-icons/bi'
import { onLogout } from '../store/user/user.actions'
import { Link } from 'react-router-dom';

export class _UserSideMenu extends React.Component {

    logout = () => {
        this.props.onLogout()
        window.location.href = '/'
    }


    render() {
        const { user } = this.props
        return <section className="user-side-menu" ref={this.props.menuRef}>
            <div className="user-side-menu-container">
                <div className="side-menu-avatar">
                    <div className="user-side-menu-logo">
                        <img className="surface-item-image" src="https://cdn.monday.com/images/logos/monday_logo_icon.png" alt="Logo-img" />
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
                            <li className="side-menu-list"><FiUser /><h4>My Profile</h4></li>
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
    onLogout
}

export const UserSideMenu = connect(mapStateToProps, mapDispatchToProps)(_UserSideMenu)