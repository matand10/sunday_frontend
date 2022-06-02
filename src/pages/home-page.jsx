import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Header } from '../cmps/header.jsx'
import { onLogin } from '../store/user/user.actions.js'

class _HomePage extends React.Component {

    gusetMode = async (ev) => {
        ev.preventDefault()
        console.log('hey');
        const credential = { username: 'guest@guest', password: 'guest' }
        let user = await this.props.onLogin(credential)
        if (user) window.location.href = '/board'
    }

    render() {
        return (
            <section>
                <header>
                    <Header gusetMode={this.gusetMode} />
                </header>
                <main>
                    <section className="sunday-first-homepage-header">
                        <div></div>
                        <div className="homepage-first-fold">
                            <div className="head-paragraph-wrapper">
                                <div className='head-paragraph-title'><h1>New platform for new way of working</h1></div>
                                <div className='head-paragraph-body'><h2>What would you like to manage with sunday.IL</h2></div>
                            </div>
                            <div className="homepage-second-fold">
                                <div></div>
                                <div className="main-start-button-container">
                                    <div className="signup-button-wrapper">
                                        <button className="secondary-signup-button" ><span>Get Started</span></button>
                                        <div className="secondary-paragraph-body">
                                            <p>No credit card needed  ✦  Unlimited time on Free plan</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="homepage-main-content"></section>
                    <section className="homepage-secondary-content"></section>
                </main>
                <footer>
                    <section className="homepage-footer"></section>
                </footer>
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