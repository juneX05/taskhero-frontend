import UsersIndex from "./UsersIndex.vue";
import UsersCreate from "./UsersCreate.vue";
import UsersView from "./UsersView.vue";

const users_routes = [
    {path:'/users', name:'users-index', component: UsersIndex, meta:{auth:true}},
    {path:'/users/create', name:'users-create', component: UsersCreate, meta:{auth:true}},
    {path:'/users/:id/view', name:'users-view', component: UsersView, meta:{auth:true}},
]

export default users_routes