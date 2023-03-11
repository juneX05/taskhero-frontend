import {createRouter, createWebHistory} from 'vue-router'

import NotFound from './views/NotFound.vue'

import auth_routes from './views/core/auth/__routes.js'
import projects_routes from './views/system/projects/__routes.js'
import tasks_routes from './views/system/tasks/__routes.js'
import users_routes from "./views/core/users/__routes.js";
import dashboard_routes from "./views/system/dashboard/__routes.js";

const module_routes = [
    ...auth_routes,
    ...projects_routes,
    ...tasks_routes,
    ...users_routes,
    ...dashboard_routes,
];

const routes = [
    { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes: [...module_routes, ...routes]
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