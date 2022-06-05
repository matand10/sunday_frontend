import React from 'react'
import { connect } from 'react-redux'
import { FcGoogle } from 'react-icons/fc';
import { Link, Navigate } from 'react-router-dom';
import signup1 from '../assets/img/signup/signup1.png'
import signup2 from '../assets/img/signup/signup2.png'
import signup3 from '../assets/img/signup/signup3.png'
import { onSignup } from '../store/user/user.actions'


class _Signup extends React.Component {
    state = {
        credential: {
            username: '',
            password: '',
            fullname: '',
            boardsIds: []
        }
    }

    handleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        this.setState((prevState) => ({ credential: { ...prevState.credential, [field]: value } }))
    }


    signup = (ev) => {
        ev.preventDefault()
        const { credential } = this.state
        this.props.onSignup(credential)
        this.setState({ credential: { password: '', username: '', fullname: '' } })
        window.location.href = '/board'
    }


    render() {
        const { username, passowrd, fullname } = this.state.credential

        return <section className="main-signup-component">
            <div className="signup-background-image">a</div>
            <div className="signup-content-component">
                <div className="signup-left-content">
                    <div className="signup-titles-wrapper">
                        <h1 className="signup-first-title">Welcome to sunday.IL</h1>
                        <h3 className="signup-second-title">Get started - it's free. No credit card needed.</h3>
                    </div>
                    <div className="signup-form-wrapper">
                        <form onSubmit={(ev) => this.signup(ev)} className="signup-form">
                            <div className="signup-input-component">
                                <div className="signup-input-container">
                                    <label className="signup-labels" htmlFor="signup-input-fullname-label"><span>Fullname</span></label>
                                    <div className="signup-input-wrapper">
                                        <input className="signup-input" type="text" id="signup-input-fullname-label"
                                            value={fullname} name="fullname" placeholder='Israel Israely' onChange={(ev) => this.handleChange(ev)} />
                                    </div>
                                </div>
                                <div className="signup-input-container">
                                    <label className="signup-labels" htmlFor="signup-input-email-label"><span>Email</span></label>
                                    <div className="signup-input-wrapper">
                                        <input className="signup-input" type="email" id="signup-input-email-label"
                                            value={username} name="username" placeholder='name@company.com' onChange={(ev) => this.handleChange(ev)} />
                                    </div>
                                </div>
                                <div className="signup-input-container">
                                    <label className="signup-labels" htmlFor="signup-input-passowrd-label"><span>Password</span></label>
                                    <div className="signup-input-wrapper">
                                        <input className="signup-input" type="password" id="signup-input-passowrd-label"
                                            value={passowrd} name="password" placeholder='Aa123456' onChange={(ev) => this.handleChange(ev)} />
                                    </div>
                                </div>
                            </div>
                            <div className="signup-button-wrapper">
                                <button className="signup-submit-button"><span>Continue</span></button>
                            </div>
                        </form>
                    </div>

                    <div className="signup-seperator-component">
                        <span className="signup-seperator-line"></span>
                        <h2><span>OR</span></h2>
                        <span className="signup-seperator-line"></span>
                    </div>
                    <div className="signup-google-btn-wrapper">
                        <button className="signup-google-btn">
                            <span><FcGoogle className="google-icon" /></span>
                            <span>Continue with Google</span>
                        </button>
                    </div>
                    <div className="signup-login-text">
                        <span>Alreay have an account?</span>
                        <Link to="/login">Log in</Link>
                    </div>

                </div>
                <div className="signup-right-content">
                    <div className="side-image-wrapper-1">
                        <img src={signup1} alt="image" />
                    </div>
                    <div className='side-image-wrapper-2'>
                        <img src={signup2} alt="image" />
                    </div>
                    <div className='side-image-wrapper-3'>
                        <img src={signup3} alt="image" />
                    </div>
                </div>
            </div>
        </section>
    }
}


function mapStateToProps(state) {
    return {
        users: state.userModule.users
    }
}
const mapDispatchToProps = {
    onSignup
}


export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)