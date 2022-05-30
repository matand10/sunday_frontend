// // Routes accesible from the main navigation (in AppHeader)
// import { Route } from 'react-router-dom'
// import { HomePage } from './pages/home-page.jsx'
// import { TasksApp } from './pages/task-app.jsx'
// import { SidePanel } from './cmps/side-panel.jsx'
// import { Login } from './user/login.jsx'
// import { Signup } from './user/signup.jsx'
// import {KanbanBoard} from './cmps/kanban-board'

// const routes = [
//     {
//         path: '/',
//         component: <HomePage />,
//     },
//     {
//         path: '/login',
//         component: <Login />
//     },
//     {
//         path: '/signup',
//         component: <Signup />
//     },
//     // {
//     //     path: '/board/:boardId/:groupId/:taskId',
//     //     component: <SidePanel />
//     // },
//     {
//         path: '/board/:boardId/*',
//         component: <TasksApp/>
//     },
//     {
//         path: '/board',
//         component: <TasksApp />
//     },
//     {
//         path:'/board/:boardId/kanban',
//         component:<KanbanBoard/>
//     }
// ]

// export default routes