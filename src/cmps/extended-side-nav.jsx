import { useState, useEffect } from 'react'
import dotsMenu from '../assets/img/side-nav/ds-menu.svg'
import { useNavigate } from 'react-router-dom'
import { CreatBoard } from './create-board'
import { BoardMenuActions } from '../modal/board-menu-actions'
import { MdOutlineArrowForwardIos } from 'react-icons/md'


export const ExtendedSideNav = ({ boardChange, boards, onAddBoard, onDeleteBoard, updateBoard }) => {
    const [showMenu, setShowMenu] = useState('')
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isClick, setIsClick] = useState(false)
    const [selectedBoard, setSelectedBoard] = useState({})
    const [renameIsClick, setRenameIsClick] = useState('')
    const [boardUpdate, setBoardUpdate] = useState('')

    let navigate = useNavigate();

    // useEffect(() => {
    //     if (boardUpdate) updateBoard(boardUpdate)
    // }, [boardUpdate])


    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }

    const toggleBoardAction = (board, ev = null) => {
        ev.stopPropagation()
        setSelectedBoard(board)
    }

    const handleChange = ({ target }, board) => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault()
                // const value = target.value
                // const field = target.name
                let newBoard={...board}
                newBoard.title=target.value
                updateBoard(newBoard)
                setRenameIsClick('')
            }
        })
    }

    const onRenameIsClick = (board) => {
        setSelectedBoard({})
        setRenameIsClick(board._id)
        setBoardUpdate(board)
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

            <div className="home-control-sub-header">
                <div className="sub-header-button-container">
                    <button className="home-control-button" onClick={() => setIsClick(!isClick)}><span className="home-control-button-span">Add</span></button>
                </div>
                <div>
                    {isClick && <CreatBoard setIsClick={setIsClick} isClick={isClick} onAddBoard={onAddBoard} />}
                </div>
                <div className="sub-header-button-container">
                    <button className="home-control-button"><span className="home-control-button-span">Search</span></button>
                </div>
            </div>
            <div className="divider"></div>
            <div className="user-projects-main-container">
                <div className="user-projects-container">
                    <div className="project-side-link">
                        {boards.length && boards.map((board, idx) => {
                            // return <div key={idx} onClick={() => window.location.href = `/board/${board._id}`} className='home-control-all-buttons'>
                            return <div key={idx} onClick={() => boardChange(board)} className='home-control-all-buttons'>

                                {(renameIsClick === board._id) ? <div className="title-update-input">
                                    <input type="text" defaultValue={board.title} onChange={(event) => handleChange(event, board)} name="title" />
                                </div> :
                                    <button className="home-control-button">
                                        <span className="home-control-button-span">{board.title}</span>
                                    </button>
                                }


                                <div className="ds-menu-button" onClick={(event) => toggleBoardAction(board, event)}>
                                    <img src={dotsMenu} alt="dots-menu" />
                                    {selectedBoard._id && selectedBoard._id === board._id &&
                                        < BoardMenuActions board={board} onRenameIsClick={onRenameIsClick} onDeleteBoard={onDeleteBoard} />}
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </section>
}
