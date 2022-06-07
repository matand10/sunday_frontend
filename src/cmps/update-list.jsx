import React from 'react';
import { Avatar } from '@mui/material';
import { FaCaretDown } from 'react-icons/fa'
import { FaRegBell } from 'react-icons/fa'

export const UpdateList = ({ update }) => {


    return <section className="testimonials">
        <div className="testimonial-box-container">
            <div className="testimonial-box">
                <div className="box-top">
                    <div className="profile">
                        <Avatar alt={update.byUser.fullname} src={update.byUser.userImg} sx={{ width: 28, height: 28 }} />
                        {update.byUser.fullname}
                        <div className="name-user">
                        </div>
                    </div>
                    <div className="updates">
                        <div className="update-message-action">
                            <div className="update-arrow"> <FaRegBell /></div>
                            <div className="update-arrow"> <FaCaretDown /></div>
                        </div>
                    </div>
                </div>
                <div className="client-comment">
                    <p>{update.txt}</p>
                </div>
            </div>
        </div>
    </section>

}