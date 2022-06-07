import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Header } from '../cmps/header.jsx'
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
                <header>
                    <Header guestMode={this.guestMode} />
                </header>
                <main>
                    <section className="sunday-first-homepage-header">
                        <div className="stars"></div>
                        <div className="stars2"></div>
                        <div className="stars3"></div>
                        <div className="homepage-head-container">
                            <div className="homepage-first-fold">
                                <div className="homepage-head-content">
                                    <div className="head-paragraph-wrapper">
                                        <div className='head-paragraph-title'><h1>New platform for new way of working</h1></div>
                                        <div className='head-paragraph-body'><h2>What would you like to manage with sunday.IL?</h2></div>
                                    </div>
                                    <div className="homepage-second-fold">
                                        <div></div>
                                        <div className="main-start-button-container">
                                            <div className="signup-button-wrapper">
                                                <button className="secondary-signup-button" onClick={this.guestMode}><span>Get Started</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="project-image">
                                <img src="https://res.cloudinary.com/dxpb15pfo/image/upload/v1654599031/%D7%9C%D7%9B%D7%99%D7%93%D7%94_r3xtwq.png" />
                            </div>
                        </div>
                    </section>
                    <section className="homepage-main-content"></section>
                    <section className="homepage-secondary-content"></section>
                </main>
            </section >
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