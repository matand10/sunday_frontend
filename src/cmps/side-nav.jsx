import { Link } from "react-router-dom"
import workspaceImg from "../assets/img/side-nav/surface-workspace-logo.png"
import productSwtich from "../assets/img/side-nav/product-switcher-logo.png"


export const SideNav = () => {



    return <section className="main-side-nav-container">
        <div className="side-nav-upper">
            <div className="icon-wrapper">
                <div className="surface-homepage-button">
                    <Link className="surface-homepage-navigation-button" to="/board"><img className="surface-item-image" src="https://cdn.monday.com/images/logos/monday_logo_icon.png" alt="Logo-img" /></Link>
                </div>
            </div>
            <div className="surfice-divider"></div>
            <div className="scrollable-navigation">
                <div className="surface-workspace-icon-wrapper">
                    <Link to="/board"><img src={workspaceImg} alt="workspace-logo" /></Link>
                </div>
            </div>
        </div>
        <div className="side-nav-lower">
            <div className="surfice-divider"></div>
            <div className="footer-navigation-items-area">
                <div className="product-switcher">
                    <img src={productSwtich} alt="dots-logo" />
                </div>
            </div>
        </div>
    </section>
}