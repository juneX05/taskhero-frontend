import {createRouter, createWebHistory} from 'vue-router'

import NotFound from './views/NotFound.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import ForgotPassword from './views/ForgotPassword.vue'

import TasksIndex from './views/pages/tasks/TasksIndex.vue'
import TasksCreate from './views/pages/tasks/TasksCreate.vue'
import TasksEdit from './views/pages/tasks/TasksEdit.vue'
import TasksView from './views/pages/tasks/TasksView.vue'
import MyTasks from './views/pages/tasks/MyTasks.vue'

import ProjectsIndex from './views/pages/projects/ProjectsIndex.vue'
import ProjectsCreate from './views/pages/projects/ProjectsCreate.vue'
import ProjectsView from './views/pages/projects/ProjectsView.vue'
import ProjectsBoard from './views/pages/projects/ProjectsBoard.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/', name:'login', component: Login},
        {path:'/dashboard', name:'dashboard', component: Dashboard},
        {path:'/forgot-password', name:'forgot-password', component: ForgotPassword},

        /** Tasks Routes */
        {path:'/tasks/index', name:'tasks-index', component: TasksIndex},
        {path:'/tasks/create', name:'tasks-create', component: TasksCreate},
        {path:'/tasks/:id/view', name:'tasks-view', component: TasksView},
        {path:'/tasks/:id/edit', name:'tasks-edit', component: TasksEdit},
        {path:'/my-tasks', name:'my-tasks', component: MyTasks},
        /** End of Tasks Routes **/

        /** Projects Routes */
        {path:'/projects/index', name:'projects-index', component: ProjectsIndex},
        {path:'/projects/create', name:'projects-create', component: ProjectsCreate},
        {path:'/projects/:id/view', name:'projects-view', component: ProjectsView},
        {path:'/projects/:id/board', name:'projects-board', component: ProjectsBoard},
        /** End of Projects Routes **/

        { path: '/:pathMatch(.*)*', component: NotFound }
    ]
})

export default router