// import { AiOutlineUserAdd } from "react-icons/ai";
// import { BsGraphUp, BsTrash } from "react-icons/bs";
// import React from "react"
// import { useNavigate } from "react-router-dom";



// export const OnClickMenuBoard = ({ board, menuRef, openBoard }) => {

//     function onOpenBoard() {
//         console.log(board);
//     }

//     return <React.Fragment>
//         {board._id && <section ref={menuRef} className="rc-main-menu-inner-board">
//             <div className="rc-main-section">
//                 <div className="rc-menu-item">
//                     <div className="rc-content-wrapper">
//                         <div className="rc-icon"><AiOutlineUserAdd /></div>
//                         <div className="rc-title">Board members</div>
//                     </div>
//                     <div className="rc-content-wrapper">
//                         <div className="rc-icon"><AiOutlineUserAdd /></div>
//                         <div className="rc-title">Rename Board</div>
//                     </div>
//                     <div className="rc-content-wrapper">
//                         <div className="rc-icon"><AiOutlineUserAdd /></div>
//                         <div className="rc-title">Copy</div>
//                     </div>
//                     <div onClick={() => onOpenBoard()} className="rc-content-wrapper">
//                         <div className="rc-icon"><AiOutlineUserAdd /></div>
//                         <div className="rc-title">Open Board</div>
//                     </div>
//                     <div className="rc-content-wrapper">
//                         <div className="rc-icon"><AiOutlineUserAdd /></div>
//                         <div className="rc-title">Delete Board</div>
//                     </div>
//                 </div>
//             </div>
//         </section>}
//     </React.Fragment>
// }