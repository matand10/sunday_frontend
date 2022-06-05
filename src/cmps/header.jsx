import { Link } from "react-router-dom"
import sunday from '../assets/img/app-logo/Sunday.png'



export const Header = ({ guestMode }) => {
    return <section className="main-header">
        <div className="main-header-container">
            <div className="left-header">
                <div className="logo">
                    <img src={sunday} alt="main-logo" />
                </div>
            </div>
            <div className="right-header">
                <nav className="main-header-nav">
                    <ul className="main-nav clean-list">
                        <li className="header-list"><Link className="header-list-link" to="/login">Log in</Link></li>
                        <li className="header-list-signup"><button className="main-signup-button" onClick={guestMode}><span>Get Started</span></button></li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
}