import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Header } from '../cmps/header.jsx'

class _HomePage extends React.Component {
    state = {}

    render() {
        return (
            <section>
                <Header />
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