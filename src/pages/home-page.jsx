import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Header } from '../cmps/homepage/header'
import { Main } from '../cmps/homepage/main'
import { onLogin } from '../store/user/user.actions.js'

class _HomePage extends React.Component {

    guestMode = async (ev) => {
        ev.preventDefault()
        const credential = { username: 'guest@guest', password: 'guest' }
        let user = await this.props.onLogin(credential)
        if (user) window.location.href = '/board'
    }

    render() {
        return (
            <section className="homepage-container">
                <Header guestMode={this.guestMode} />
                <div className="stars"></div>
                <div className="stars2"></div>
                <div className="stars3"></div>
                <Main guestMode={this.guestMode} />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        count: state.userModule.count
    }
}

const mapDispatchToProps = {
    onLogin
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)