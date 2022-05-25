import { useState } from 'react'
import arrow from '../assets/img/side-nav/right-arrow.svg'
import dotsMenu from '../assets/img/side-nav/ds-menu.svg'
import { NavLink } from 'react-router-dom'
import { boardService } from '../services/board.service'
import { CreatBoard } from './create-board'


export const ExtendedSideNav = ({ onAddBoard }) => {
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isClick, setIsClick] = useState(false)


    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }




    return <section className={`home-control-component${isNavOpen ? "-closed" : ''}`}>
        <div className="control-nav-expend">
            <img className="arrow" src={arrow} alt="right-arrow-icon" onClick={toggleNav} />
        </div>
        <div className="home-controller-content">
            <div className="home-control-header">
                <div className="home-control-title">
                    <h3>Workspace</h3>
                </div>
                <div className="ds-menu-button">
                    <img src={dotsMenu} alt="dots-menu" />
                </div>
            </div>

            <div className="home-control-sub-header">
                <div className="sub-header-button-container">
                    <button className="home-control-button" onClick={() => setIsClick(!isClick)}><span className="home-control-button-span">Add</span></button>
                </div>
                <div>
                    {isClick && <CreatBoard />}
                </div>
                <div className="sub-header-button-container">
                    <button className="home-control-button"><span className="home-control-button-span">Search</span></button>
                </div>
            </div>
            <div className="divider"></div>
            <div className="user-projects-main-container">

                {/* {Here you can render the User Projects} */}
                {/* {Example} */}
                <div className="user-projects-container">
                    <div className="project-side-link">
                        <NavLink className="board-link" to='/board'>
                            <button className="home-control-button"><span className="home-control-button-span">Sunday</span></button>
                        </NavLink>
                    </div>
                </div>
                {/* {Example} */}
            </div>
        </div>
    </section>
}
