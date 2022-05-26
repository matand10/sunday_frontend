import { Link } from "react-router-dom"



export const Header = () => {




    return <section className="main-header">
        <div className="main-header-container">
            <div className="left-header">
                <div className="logo">Logo</div>
            </div>
            <div className="right-header">
                <nav className="main-header-nav">
                    <ul className="main-nav clean-list">
                        <li className="header-list"><Link to="/login">Login</Link></li>
                        <li className="header-list"><button className="signup-btn">Get Started</button></li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
}