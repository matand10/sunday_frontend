import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Header } from '../cmps/header.jsx'

class _HomePage extends React.Component {


    render() {
        return (
            <section>
                <header>
                    <Header />
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
                                        <Link to="/board" className="get-started-link"><button className="secondary-signup-button" ><span>Get Started</span></button></Link>
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

export const HomePage = connect(mapStateToProps)(_HomePage)