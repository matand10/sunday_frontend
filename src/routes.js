// Routes accesible from the main navigation (in AppHeader)
import { HomePage } from './pages/home-page.jsx'
import { TasksApp } from './pages/task-app.jsx'
import { SidePanel } from './cmps/side-panel.jsx'
import { Route } from 'react-router-dom'

const routes = [
    {
        path: '/',
        component: <HomePage />,
    },
    // {
    //     path: '/board/:boardId/:groupId/:taskId',
    //     component: <SidePanel />
    // },
    {
        path: '/board/:boardId',
        component: <TasksApp />
    },
    {
        path: '/board',
        component: <TasksApp />
    }
]

export default routes