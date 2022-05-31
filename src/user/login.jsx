import React from 'react'
import { connect } from "react-redux";
import { Header } from "../cmps/header"
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { onLogin } from '../store/user/user.actions';


class _Login extends React.Component {
    state = {
        credential: {
            username: '',
            password: ''
        }
    }

    handleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        this.setState((prevState) => ({ credential: { ...prevState.credential, [field]: value } }))
    }

    login = async (ev) => {
        ev.preventDefault()
        const { credential } = this.state
        await this.props.onLogin(credential)
        this.setState({ credential: { username: '', password: '' } })
        window.location.href = '/board'
    }


    render() {
        const { username, password } = this.state.credential
        return <section>
            <Header />
            <div className="login-router-wrapper">
                <div className="email-first-component">
                    <h1 className="login-header">Log in to your account</h1>
                    <div className="email-page">
                        <form className="email-input-and-button-wrapper" onSubmit={(ev) => this.login(ev)}>
                            <div className="enter-work-email">
                                <label className="login-label" htmlFor="user-email">Enter your work email adress</label>
                                <input value={username} onChange={(ev) => this.handleChange(ev)} type="email" id="user_email" className="enter-work-email" placeholder="Example@company.com" name="username" />
                            </div>
                            <div className="enter-work-password">
                                <label className="login-label" htmlFor="user-password">Enter your password</label>
                                <input value={password} onChange={(ev) => this.handleChange(ev)} type="password" id="user-password" className="enter-password-login" placeholder="Aa123456" name="password" />
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

const mapStateToProps = (storeState) => {
    return {
        user: storeState.userModule.user,
    }
}

const mapDispatchToProps = {
    onLogin,
}


export const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Login)