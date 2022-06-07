import { useState, useEffect, useRef } from 'react'
import dotsMenu from '../assets/img/side-nav/ds-menu.svg'
import { CreatBoard } from './create-board'
import { BoardMenuActions } from '../modal/board-menu-actions'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { IoIosSearch } from 'react-icons/io'
import {AiOutlinePlus } from 'react-icons/ai'
import {MdOutlineSpaceDashboard} from 'react-icons/md'
import workspaceImg from '../assets/img/side-nav/surface-workspace-logo.png'


export const ExtendedSideNav = ({ boardChange, boards, onAddBoard, board, onDeleteBoard, updateBoard }) => {
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isClick, setIsClick] = useState(false)
    const [renameIsClick, setRenameIsClick] = useState('')
    const [isBoardMenuOpen, setIsBoardMenuOpen] = useState(false)
    const [titleBoard, setTitleBoard] = useState('')
    let menuRef = useRef()

    useEffect(() => {
        document.addEventListener("mousedown", eventListener)
        return () => {
            document.removeEventListener("mousedown", eventListener)
        }
    }, [])

    const eventListener = (ev) => {
        if (!menuRef.current?.contains(ev.target)) {
            setIsBoardMenuOpen(false)
        }
    }

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }

    const handleChange = ({ target }, idx) => {
        setTitleBoard(target.value)
    }

    const onRenameIsClick = (board) => {
        setRenameIsClick(board._id)
        setIsBoardMenuOpen(null)
    }

    const updateTitleBoard = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        const newBoard = { ...board }
        newBoard.title = titleBoard
        updateBoard(newBoard)
    }

    return <section className={`home-control-component${isNavOpen ? "" : '-closed'}`}>
        <div className="control-nav-expend">
            <span className="arrow" onClick={toggleNav}><MdOutlineArrowForwardIos /></span>
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
            <div>
                <div className="dialog-content">
                    <div className="dialog-logo">
                        <img src={workspaceImg} alt="workspace img" />
                    </div>
                    <span>Work management</span>
                </div>
            </div>
            <div className="home-control-sub-header">
                <div className="sub-header-button-container">
                    <button className="home-control-button" onClick={() => setIsClick(!isClick)}><span className="home-control-button-span"><AiOutlinePlus/> <span>Add</span></span></button>
                </div>
                <div>
                    {isClick && <CreatBoard setIsClick={setIsClick} isClick={isClick} onAddBoard={onAddBoard} />}
                </div>
                <div className="sub-header-button-container">
                    <button className="home-control-button"><span className="home-control-button-span"><IoIosSearch/> Search</span></button>
                </div>
            </div>
            <div className="divider"></div>
            <div className="user-projects-main-container">
                <div className="user-projects-container">
                    <div className="project-side-link">
                        {boards.map((board, idx) => {
                            return <div key={idx} onClick={() => boardChange(board)} className='home-control-all-buttons'>
                                {(renameIsClick === board._id) ? <div className="title-update-input">
                                    <form onSubmit={updateTitleBoard} className="board-title-form">
                                        <input type="text" defaultValue={board.title} onChange={(event) => handleChange(event, idx)} name="title" />
                                    </form>
                                </div> :
                                    <button className="home-control-button">
                                        <span className="home-control-button-span"><MdOutlineSpaceDashboard/> {board.title}</span>
                                    </button>
                                }
                                <div className="ds-menu-button" onClick={(event) => {
                                    setIsBoardMenuOpen(board._id)
                                    event.stopPropagation()
                                }}>
                                    <img src={dotsMenu} alt="dots-menu" />
                                </div>
                                {isBoardMenuOpen === board._id && <BoardMenuActions menuRef={menuRef} board={board} onRenameIsClick={onRenameIsClick} onDeleteBoard={onDeleteBoard} />}
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </section>
}
