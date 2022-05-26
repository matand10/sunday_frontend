import { useState, useEffect } from "react";


export const Menu = () => {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [showMenu, setShowMenu] = useState(false)

    const handleContextMenu = (ev) => {
        ev.preventDefault()
        setX(ev.pageX)
        setY(ev.pageY)
        setShowMenu(true)
    }

    const handleClick = () => {
        showMenu && setShowMenu(false)
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        document.addEventListener('contextmenu', handleContextMenu)
        return () => {
            document.removeEventListener('click', handleClick)
            document.removeEventListener('contextmenu', handleContextMenu)
        }
    })

    return { x, y, showMenu, handleContextMenu }
}