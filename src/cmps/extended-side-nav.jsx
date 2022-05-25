import { useState } from 'react'
import arrow from '../assets/img/side-nav/right-arrow.svg'
import dotsMenu from '../assets/img/side-nav/ds-menu.svg'


export const ExtendedSideNav = () => {
    const [isNavOpen, setIsNavOpen] = useState(false)


    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }


    return <section className={`home-control-component${isNavOpen ? '-closed' : ''}`}>
        <div className="control-nav-expend">
            <img className='arrow' src={arrow} alt="right-arrow-icon" onClick={toggleNav} />
        </div>
        <div className='home-controller-content'>
            <div className='home-control-header'>
                <h3 className="">Workspace</h3>
                <div className='ds-menu-button'>
                    <img src={dotsMenu} alt="dots-menu" />
                </div>
            </div>
        </div>
    </section>
}
