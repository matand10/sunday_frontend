import React from 'react'
import { MdDone } from 'react-icons/md'
import { eventBusService } from '../services/event-bus.service.js'


export class UserMsg extends React.Component {

    removeEvent;

    state = {
        msg: null
    }

    componentDidMount() {
        // Here we listen to the event that we emited, its important to remove the listener 
        this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
            this.setState({ msg })
            setTimeout(() => {
                this.setState({ msg: null })
            }, 2500)
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    render() {
        if (!this.state.msg) return <span></span>
        const msgClass = this.state.msg.type || ''
        return (
            <section className={"user-indicate-msg " + msgClass}>
                <div className="user-msg-wrapper-container">
                    <div className="user-msg-content">
                        <MdDone />
                        <span>{this.state.msg.txt}</span>
                    </div>
                    <div className="user-msg-container">
                        <button onClick={() => {
                            this.setState({ msg: null })
                        }}>x</button>
                    </div>
                </div>
            </section>
        )
    }
}
