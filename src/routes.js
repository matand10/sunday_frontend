// Routes accesible from the main navigation (in AppHeader)
import { HomePage } from './pages/home-page.jsx'
import { TasksApp } from './pages/task-app.jsx'
// import { MainBoard } from './cmps/main-board.jsx'
import { Route } from 'react-router-dom'

const routes = [
    {
        path: '/',
        component: <HomePage />,
    },
    {
        path: '/board',
        component: <TasksApp />
    }
]

export default routes