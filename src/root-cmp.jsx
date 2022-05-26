import React from 'react';
import { Routes, Route } from 'react-router'
import routes from './routes'
import './assets/styles/main.scss';



export class RootCmp extends React.Component {
  render() {
    return (
      <main>
        <Routes>
          {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
          {/* <Route path="user/:id" element={<UserDetails />} /> */}
        </Routes>
      </main>
    )
  }
}
