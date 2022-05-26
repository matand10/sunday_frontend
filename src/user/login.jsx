import React from 'react'
import { Header } from "../cmps/header"
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';


export class Login extends React.Component {
    state = {
        credential: {
            username: ''
        }
    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState({ credential: { username: value } })
    }

    login = (ev) => {
        ev.preventDefault()
        const { credential } = this.state
        // Add function to send credentials
        this.setState({ credential: { username: '' } })
    }


    render() {
        const { username } = this.state.credential
        return <section>
            <Header />
            <div className="login-router-wrapper">
                <div className="email-first-component">
                    <h1 className="login-header">Log in to your account</h1>
                    <div className="email-page">
                        <form className="email-input-and-button-wrapper" onSubmit={(ev) => this.login(ev)}>
                            <div className="enter-work-email">
                                <label className="login-label" htmlFor="user-email">Enter your work email adress</label>
                                <input value={username} onChange={(ev) => this.handleChange(ev)} type="email" id="user_email" className="enter-work-email" placeholder="Example@company.com" />
                            </div>
                            <div className="next-button-component">
                                <button className="next-button">
                                    <span className="button-values">Next</span>
                                    <span className="button-values"><AiOutlineArrowRight /></span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="login-seperator-component">
                        <span className="seperator-line"></span>
                        <h2>Or Sign in With</h2>
                        <span className="seperator-line"></span>
                    </div>

                    <div className="social-login-component">
                        <button className="social-login-provider">
                            <span className="google-link"><FcGoogle /></span>
                            <span className="google-link">Google</span>
                        </button>
                    </div>
                    <div className="suggest-signup-wrapper">
                        <span className="suggest-signup-prefix">Don't have an account yet?</span>
                        <Link to="/signup"><button className="open-signup-modal">Sign up</button></Link>
                    </div>
                </div>
            </div>
        </section>
    }
}