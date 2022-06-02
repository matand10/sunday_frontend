import { BoardNav } from "./board-nav";
import { FaExclamationCircle, FaRegStar, FaSearch, FaRegUserCircle, FaFilter, FaSort, FaTrello } from 'react-icons/fa';
import { BsPinAngle, BsTable } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';
import { BiSort } from 'react-icons/bi';
import { IoIosSearch } from 'react-icons/io';
import { DsMenu } from '../modal/ds-menu';
import { SortMenu } from '../filters/sort-by';
import dotsMenu from '../assets/img/side-nav/ds-menu.svg'
import { useState, useRef, useEffect, useNavigate } from "react"
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from '../store/board/board.action'
import { NavLink, Outlet } from "react-router-dom";
import { InviteUserMenu } from '../modal/user-invite-modal'
import { userService } from "../services/user.service";
import { boardService } from "../services/board.service";
export const BoardHeader = ({ board, users, onAddTask, updateBoard, onAddGroup, onFilter }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isInviteMenuOpen, setIsInviteMenuOpen] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [isSortMenuOpen, setIsSortMenu] = useState(false)
    const [handleSearch, setHandleSearch] = useState({ search: '' })
    const { filterBy } = useSelector((storeState) => storeState.boardModule)
    const [unAssignedUsers, setUnAssignedUsers] = useState('')
    const [titleBoard, setTitleBoard] = useState('')
    const [isTitleBoardClick, setIsTitleBoardClick] = useState(false)
    const dispatch = useDispatch()
    // const navigate=useNavigate()
    let menuRef = useRef()
    const firstFilterUseEffectRef = useRef()
    firstFilterUseEffectRef.current = true

    useEffect(() => {
        document.addEventListener("mousedown", eventListeners)
        return () => {
            document.addEventListener("mousedown", eventListeners)
        }
    })

    const eventListeners = (ev) => {
        if (!menuRef.current?.contains(ev.target)) {
            setIsMenuOpen(false)
            setIsSearchActive(false)
            setIsSortMenu(false)
            setIsInviteMenuOpen(false)
            setIsTitleBoardClick(false)
        }
    }
    
    useEffect(() => {
        if (!firstFilterUseEffectRef.current) onFilter(handleSearch)
        firstFilterUseEffectRef.current = false
    }, [handleSearch])

<<<<<<< HEAD

=======
>>>>>>> 931d81757ebe5499b800fab33a6b7d15fe28eb10
    const updateTitleBoard = (ev) => {
        ev.preventDefault()
        board.title = titleBoard.title
        updateBoard(board)
        setIsTitleBoardClick(!isTitleBoardClick)
    }

    const handleBoardTitleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        setTitleBoard((prevBoard) => ({ ...prevBoard, [field]: value }))
    }

    const toggleMenu = (value) => {
        setIsMenuOpen(value)
    }

    const toggleInviteMenu = (value) => {
        setIsInviteMenuOpen(value)
    }

    const toggleSortModal = (value) => {
        setIsSortMenu(value)
    }

    const toggleSearchActive = (value) => {
        setIsSearchActive(value)
    }

    const onHandleSearch = ({ target }) => {
        // const value = target.value
        // setHandleSearch({ search: value })
    }

    const onSetFilter = (label) => {
        const newFilterBy = { ...filterBy, sortBy: label }
        // dispatch(setFilter(newFilterBy))
    }

    if (!board) return <h1>Loading...</h1>
    return <div className="board-header">
        <div className="board-header-main">
            <div className="board-header-top">
                <div className="board-header-left">
                    {isTitleBoardClick ?
                        <div className="board-title-input-container">
                            <form onSubmit={updateTitleBoard} className="board-title-form">
                                <input type="text" name="title" defaultValue={board.title} onChange={handleBoardTitleChange} ref={menuRef} />
                            </form>
                        </div>
                        :
                        <div className="board-title-content">
                            <h1 className="title" onClick={() => setIsTitleBoardClick(!isTitleBoardClick)}>{board.title}</h1>
                        </div>
                    }
                    <div className="icon-action-wrapper">
                        <span className="icon-action-btn"><FaExclamationCircle title="Hide board description" /></span>
                        <span className="icon-action-btn"><FaRegStar title="Add to favorites" /></span>
                    </div>
                </div>
                <div className="board-header-right">
                    <div className="board-header-actions">
                        <button className="panel-button">Last Seen</button>
                        {/* <button className="panel-button" onClick={() => toggleInviteMenu(true)}>Invite / {unAssignedUsers.length}</button> */}
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
                <div className="board-subsets-item">
                    <button className="board-subsets-item-button"><NavLink to={`/board/${board._id}`}><span><BsTable /> Main Table</span></NavLink> </button>
                    <div className="board-subsets-item-line"></div>
                </div>
                <div className="board-kanban-item">
                    <button className="board-kanban-item-button"><NavLink to={`/board/${board._id}/kanban`}><span><FaTrello /> Kanban</span></NavLink></button>
                    {/* <button className="board-kanban-item-button" onClick={()=>navigate(`{/board/${board._id}/kanban}`)}><span><FaTrello/> Kanban</span></button> */}
                    <div className="board-kanban-item-line"></div>
                </div>
            </div>
        </div>
        <div className="divider"></div>
        <div className="board-header-actions-v2">
            <BoardNav onAddTask={onAddTask} onAddGroup={onAddGroup} board={board} />
            {!isSearchActive && <button className="panel-button-v2" onClick={() => toggleSearchActive(true)}><IoIosSearch /> <span>Search</span></button>}
            {isSearchActive && <div ref={menuRef}><input onChange={(ev) => onHandleSearch(ev)} className="board-filter-search" autoFocus type="text" placeholder='Search' /></div>}
            <button className="panel-button-v2"><FaRegUserCircle /> <span>Person</span></button>
            <button className="panel-button-v2"><FiFilter /> <span>Filter</span></button>
            <button className="panel-button-v2" onClick={() => toggleSortModal(true)}><BiSort /> <span>Sort</span></button>
            <button className="panel-button-v2"><BsPinAngle /> <span>Pin</span></button>
        </div>
        <DsMenu isMenuOpen={isMenuOpen} menuRef={menuRef} />
        <InviteUserMenu users={users} setUnAssignedUsers={setUnAssignedUsers} updateBoard={updateBoard} board={board} isInviteMenuOpen={isInviteMenuOpen} menuRef={menuRef} />
        <SortMenu onSetFilter={onSetFilter} isSortMenuOpen={isSortMenuOpen} menuRef={menuRef} />
    </div>
}