import { Link } from "react-router-dom"
import MainLogo from '../assets/img/app-logo/logo.png'


export const Header = () => {




    return <section className="main-header">
        <div className="main-header-container">
            <div className="left-header">
                <div className="logo">Logo</div>
            </div>
            <div className="right-header">
                <nav className="main-header-nav">
                    <ul className="main-nav clean-list">
                        <li className="header-list"><Link className="header-list-link" to="/board">Guest</Link></li>
                        <li className="header-list"><Link className="header-list-link" to="/login">Log in</Link></li>
                        <li className="header-list-signup"><button className="main-signup-button" ><span>Get Started</span></button></li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
}