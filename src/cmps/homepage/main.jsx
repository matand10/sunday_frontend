export const Main = ({ guestMode }) => {


    return (
        <main className="homepage-main-content">
            <div className="stars"></div>
            <div className="left-component">
                <h1>New platform for new way of working</h1>
                <h2>What would you like to manage with sunday.IL?</h2>
                <div className="guest-btn">
                    <button className="secondary-signup-button" onClick={guestMode}><span>Get Started</span></button>
                </div>
            </div>
            <div className="right-component">
                <img src="https://res.cloudinary.com/dxpb15pfo/image/upload/v1654673544/homepageImg_qcmmfo.png" />
            </div>
        </main>
    )
}


