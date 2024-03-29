import { BoardNav } from "./board-nav";
import { FaExclamationCircle, FaRegStar, FaRegUserCircle, FaTrello } from 'react-icons/fa';
import { BsPinAngle, BsTable } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';
import { BiSort } from 'react-icons/bi';
import { IoIosSearch } from 'react-icons/io';
import { DsMenu } from '../modal/ds-menu';
import { SortMenu } from '../filters/sort-by';
import dotsMenu from '../assets/img/side-nav/ds-menu.svg'
import { useState, useRef, useEffect } from "react"
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import React from "react"
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { InviteUserMenu } from '../modal/user-invite-modal'
import { SidePanel } from '../cmps/header-activity-panel'
import { Avatar, AvatarGroup } from "@mui/material";
import { userService } from "../services/user.service";

export const BoardHeader = ({ board, users, onAddTask, updateBoard, onAddGroup, onFilter, setIsKanban, setFrontFilter, user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isInviteMenuOpen, setIsInviteMenuOpen] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [isSortMenuOpen, setIsSortMenu] = useState(false)
    const [handleSearch, setHandleSearch] = useState({ search: '' })
    const { filterBy } = useSelector((storeState) => storeState.boardModule)
    const [unAssignedUsers, setUnAssignedUsers] = useState([])
    const [assignedUsers, setAssignedUsers] = useState([])
    const [titleBoard, setTitleBoard] = useState('')
    const [isTitleBoardClick, setIsTitleBoardClick] = useState(false)
    const [isActivityModal, setIsActivityModal] = useState(false)

    let menuRef = useRef()
    const firstFilterUseEffectRef = useRef()
    firstFilterUseEffectRef.current = true

    useEffect(() => {
        document.addEventListener("mousedown", eventListeners)
        const assignedToBoard = userService.getAssignedUsers(users, board)
        setAssignedUsers(assignedToBoard)
        return () => {
            document.removeEventListener("mousedown", eventListeners)
        }
    }, [])

    useEffectUpdate(() => {
        const assignedToBoard = userService.getAssignedUsers(users, board)
        setAssignedUsers(assignedToBoard)
    }, [unAssignedUsers])

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
        onFilter(handleSearch)
    }, [handleSearch])

    const updateTitleBoard = (ev) => {
        ev.preventDefault()
        const newBoard = { ...board }
        newBoard.title = titleBoard.title
        updateBoard(newBoard)
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
        const value = target.value
        setHandleSearch({ search: value })
    }

    const onSetFilter = (label) => {
        const newFilterBy = { ...filterBy, sortBy: label }
        setFrontFilter(newFilterBy)
    }

    const changeBoardDescription = (ev) => {
        const value = ev.currentTarget.textContent
        const newBoard = { ...board }
        newBoard.description = value
        updateBoard(newBoard)
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
                        <button className="flex align-items panel-button">
                            <AvatarGroup className="flex">
                                {assignedUsers.map((user, userIdx) => {
                                    return <Avatar key={userIdx} alt={user.fullname} src={user.userImg} sx={{ width: 25, height: 25 }} />
                                })}
                                <div className="flex align-items gap" style={{ marginInlineStart: '5px' }}>
                                    <p>Last Seen</p>
                                </div>
                            </AvatarGroup>
                        </button>
                        <button className="panel-button" onClick={() => toggleInviteMenu(true)}>Invite / {unAssignedUsers.length}</button>
                        <InviteUserMenu users={users} setAssignedUsers={setAssignedUsers} setUnAssignedUsers={setUnAssignedUsers} updateBoard={updateBoard} board={board} isInviteMenuOpen={isInviteMenuOpen} menuRef={menuRef} />
                        <button className="panel-button" onClick={() => setIsActivityModal(true)}>Activity</button>
                        <button className="panel-button board-add"><span>+</span> Add to board</button>
                        <div onClick={() => toggleMenu(true)} className="ds-menu-side-panel-header"><img src={dotsMenu} alt='dots-menu' /></div>
                    </div>
                </div>
            </div>
            <div className="ds-header-component">
                <div className="ds-header-content" contentEditable={true} suppressContentEditableWarning={true} onBlur={(ev) => changeBoardDescription(ev)}>
                    {board.description || 'Add board description'}
                </div>
            </div>
        </div>
        <div className="board-subsets-toolbar">
            <div className="board-subsets-tabs">
                <div className="board-subsets-item" onClick={() => setIsKanban(false)}>
                    <button className="board-subsets-item-button" ><NavLink to={`/board/${board._id}`} className="main-table-nav"><span><BsTable /> Main Table</span></NavLink> </button>
                    <div className="board-subsets-item-line"></div>
                </div>
                <div className="board-kanban-item" onClick={() => setIsKanban(true)}>
                    <button className="board-kanban-item-button" ><NavLink to={`/board/${board._id}/kanban`} className="kanban-nav"><span><FaTrello /> Kanban</span></NavLink></button>
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
        <SortMenu onSetFilter={onSetFilter} isSortMenuOpen={isSortMenuOpen} menuRef={menuRef} />
        {isActivityModal && <SidePanel menuRef={menuRef} board={board} setIsActivityModal={setIsActivityModal} />}

    </div>
}