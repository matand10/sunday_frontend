import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'


class _HomePage extends React.Component {
    state = {}

    render() {
        return (
            <section>
                <h1>Hello from homepage</h1>
                <NavLink to="/board">Sunday</NavLink>
            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        count: state.userModule.count
    }
}

export const HomePage = connect(mapStateToProps)(_HomePage)