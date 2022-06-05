import React from 'react';
import userImg from '../assets/img/user-invite/userImg.png'

export const UpdateList = ({ update, deleteUpdate, updateIdx }) => {



    console.log(update);
    return <section className="testimonials">
        <div className="testimonial-box-container">
            <div className="testimonial-box">
                <button className="delete-update-btn" onClick={() => deleteUpdate(update._id, updateIdx)}>X</button>
                <div className="box-top">
                    <div className="profile">
                        <div className="profile-img">
                            <img src={userImg} />
                        </div>
                        <div className="name-user">
                            <strong>{update.byUser.fullname}</strong>
                            <span>@gmail.com</span>
                        </div>
                    </div>
                    <div className="updates">
                        {/* <img src={imgService.getStarImg()} />
                        <img src={imgService.getStarImg()} />
                        <img src={imgService.getStarImg()} />
                        <img src={imgService.getStarImg()} />
                        <img src={imgService.getStarImg()} /> */}
                    </div>
                </div>
                <div className="client-comment">
                    <p>{update.txt}</p>
                </div>
            </div>

        </div>
    </section>

}