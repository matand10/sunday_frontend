// import { useRef, useState, useEffect } from 'react'
// import { groupService } from '../services/group.service'


// export const EditableColumn = ({ text, updateBoard, board, colIdx }) => {
//     const [value, setValue] = useState(text)
//     const [isInEditMode, setIsInEditMode] = useState(false)
//     const [inputValue, setInputValue] = useState('')
//     let menuRef = useRef()

//     const changeEditMode = () => {
//         setIsInEditMode(true)
//     }

//     const handleChange = ({ target }) => {
//         const value = target.value
//         setInputValue(value)
//     }

//     const renderEditView = () => {
//         return <div ref={menuRef} className="header-editable-container">
//             <input type="text"
//                 className="header-editable-input"
//                 defaultValue={value}
//                 onChange={handleChange}
//                 onKeyPress={(ev) => handleKeyPress(ev)} />
//         </div>
//     }

//     const handleKeyPress = (event) => {
//         if (event.key === 'Enter') {
//             updateComponentValue()
//         }
//     }

//     const renderDefaultView = () => {
//         return <div onClick={changeEditMode}>
//             {value}
//         </div>
//     }

//     const updateComponentValue = () => {
//         setIsInEditMode(false)
//         setValue(inputValue)
//         onUpdateGroup()
//     }

//     useEffect(() => {
//         document.addEventListener("mousedown", (event) => {
//             if (!menuRef.current?.contains(event.target)) {
//                 setIsInEditMode(false)
//             }
//         })
//     })

//     const onUpdateGroup = () => {
//         const newGroup = groupService.groupColUpdate(inputValue, colIdx, board)
//         updateBoard(newGroup)
//     }


//     return isInEditMode ?
//         renderEditView()
//         :
//         renderDefaultView()

// }