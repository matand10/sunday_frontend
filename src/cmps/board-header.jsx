import { BoardNav } from "./board-nav";
import { FaExclamationCircle, FaRegStar, FaSearch, FaRegUserCircle, FaFilter, FaSort } from 'react-icons/fa';
import { BsPinAngle, BsTable } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';
import { BiSort } from 'react-icons/bi';
import { IoIosSearch } from 'react-icons/io';
import { DsMenu } from '../modal/ds-menu';
import dotsMenu from '../assets/img/side-nav/ds-menu.svg'
import { useState, useRef, useEffect } from "react"
import React from "react"

export const BoardHeader = ({ board, onAddTask, onAddGroup, onFilter }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [handleSearch, setHandleSearch] = useState({ search: '' })
    let menuRef = useRef()


    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (!menuRef.current?.contains(event.target)) {
                setIsMenuOpen(false)
                setIsSearchActive(false)
            }
        })
    })

    useEffect(() => {
        onFilter(handleSearch)
    }, [handleSearch])

    const toggleMenu = (value) => {
        setIsMenuOpen(value)
    }

    const toggleSearchActive = (value) => {
        setIsSearchActive(value)
    }

    const onHandleSearch = ({ target }) => {
        const value = target.value
        setHandleSearch({ search: value })
    }


    if (!board) return <h1>Loading...</h1>
    return <div className="board-header">
        <div className="board-header-main">
            <div className="board-header-top">
                <div className="board-header-left">
                    <h1 className="title">{board.title}</h1>
                    <div className="icon-action-wrapper">
                        <span className="icon-action-btn"><FaExclamationCircle title="Hide board description" /></span>
                        <span className="icon-action-btn"><FaRegStar title="Add to favorites" /></span>
                    </div>
                </div>

                <div className="board-header-right">
                    <div className="board-header-actions">
                        <button className="panel-button">Last Seen</button>
                        <button className="panel-button">Invite</button>
                        <button className="panel-button">Activity</button>
                        <button className="panel-button board-add"><span>+</span> Add to board</button>
                        <div onClick={() => toggleMenu(true)} className="ds-menu-side-panel-header"><img src={dotsMenu} alt='dots-menu' /></div>
                    </div>
                </div>
            </div>

            <div className="ds-header-component">
                <div className="ds-header-content">
                    <span>Add board description</span>
                </div>
            </div>
        </div>

        <div className="board-subsets-toolbar">
            <div className="board-subsets-tabs">
                <div className="board-subsets-item"><button className="board-subsets-item-button"><span><BsTable /> Main Table</span> </button></div>
            </div>
        </div>

        <div className="divider"></div>
        <div className="board-header-actions-v2">
            <BoardNav onAddTask={onAddTask} onAddGroup={onAddGroup} />
            {!isSearchActive && <button className="panel-button-v2" onClick={() => toggleSearchActive(true)}><IoIosSearch /> <span>Search</span></button>}
            {isSearchActive && <div ref={menuRef}><input onChange={(ev) => onHandleSearch(ev)} className="board-filter-search" autoFocus type="text" placeholder='Search' /></div>}
            <button className="panel-button-v2"><FaRegUserCircle /> <span>Person</span></button>
            <button className="panel-button-v2"><FiFilter /> <span>Filter</span></button>
            <button className="panel-button-v2"><BiSort /> <span>Sort</span></button>
            <button className="panel-button-v2"><BsPinAngle /> <span>Pin</span></button>
        </div>

        <DsMenu isMenuOpen={isMenuOpen} menuRef={menuRef} />
    </div>
}