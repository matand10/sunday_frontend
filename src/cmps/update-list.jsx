import React from 'react';
import { Avatar } from '@mui/material';

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
                    </div>
                </div>
                <div className="client-comment">
                    <p>{update.txt}</p>
                </div>
            </div>
        </div>
    </section>

}