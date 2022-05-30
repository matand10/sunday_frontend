import React from 'react';
import { Routes, Route } from 'react-router'
import routes from './routes'
import './assets/styles/main.scss';
import { HomePage } from './pages/home-page'
import { Login } from './user/login.jsx'
import { Signup } from './user/signup.jsx'
import { TasksApp } from './pages/task-app.jsx'
import {KanbanBoard} from './cmps/kanban-board'
import {MainBoard} from './cmps/main-board'


export class RootCmp extends React.Component {
  render() {
    return (
      <main>
        <Routes>
          <Route path='board' element={<TasksApp />}>
              <Route path=':boardId/kanban' element={<KanbanBoard/>}/>
              <Route path=':boardId' element={<MainBoard />}/>
              {/* <Route path='board' element={<TasksApp/>}/> */}
          </Route>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/' element={<HomePage/>}/>
          {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)} */}
          {/* <Route path="/user/:id" element={<UserDetails />} /> */}
        </Routes>
      </main>
    )
  }
}

// const Kanban=()=>{
//   return(
//     <KanbanBoard/>
//   )
// }
