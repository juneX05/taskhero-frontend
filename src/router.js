import {createRouter, createWebHistory} from 'vue-router'

import NotFound from './views/NotFound.vue'
import Login from './views/core/auth/Login.vue'
import Dashboard from './views/system/dashboard/Dashboard.vue'
import ForgotPassword from './views/core/auth/ForgotPassword.vue'

import TasksIndex from './views/system/tasks/TasksIndex.vue'
import TasksCreate from './views/system/tasks/TasksCreate.vue'
import TasksEdit from './views/system/tasks/TasksEdit.vue'
import TasksView from './views/system/tasks/TasksView.vue'
import MyTasks from './views/system/tasks/MyTasks.vue'

import ProjectsIndex from './views/system/projects/ProjectsIndex.vue'
import ProjectsCreate from './views/system/projects/ProjectsCreate.vue'
import ProjectsView from './views/system/projects/ProjectsView.vue'
import ProjectsBoard from './views/system/projects/ProjectsBoard.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/', name:'login', component: Login, meta:{auth:false}},
        {path:'/dashboard', name:'dashboard', component: Dashboard, meta:{auth:true}},
        {path:'/forgot-password', name:'forgot-password', component: ForgotPassword, meta:{auth:false}},

        /** Tasks Routes */
        {path:'/tasks/index', name:'tasks-index', component: TasksIndex, meta:{auth:true}},
        {path:'/tasks/create', name:'tasks-create', component: TasksCreate, meta:{auth:true}},
        {path:'/tasks/:id/view', name:'tasks-view', component: TasksView, meta:{auth:true}},
        {path:'/tasks/:id/edit', name:'tasks-edit', component: TasksEdit, meta:{auth:true}},
        {path:'/my-tasks', name:'my-tasks', component: MyTasks, meta:{auth:true}},
        /** End of Tasks Routes **/

        /** Projects Routes */
        {path:'/projects/index', name:'projects-index', component: ProjectsIndex, meta:{auth:true}},
        {path:'/projects/create', name:'projects-create', component: ProjectsCreate, meta:{auth:true}},
        {path:'/projects/:id/view', name:'projects-view', component: ProjectsView, meta:{auth:true}},
        {path:'/projects/:id/board', name:'projects-board', component: ProjectsBoard, meta:{auth:true}},
        /** End of Projects Routes **/

        { path: '/:pathMatch(.*)*', component: NotFound }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth === false)) {
        if (localStorage.getItem('auth') !== null) {
            router.push({name:'dashboard'})
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.auth === true)) {

        if (localStorage.getItem('auth') !== null) {
            next();
        } else {
            router.push({name:'login'})
        }
    } else {
        next();
    }

});

export default router