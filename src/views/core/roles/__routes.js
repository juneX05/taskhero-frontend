import Index from "./RolesIndex.vue";
// import UsersCreate from "./UsersCreate.vue";
import View from "./RolesView.vue";

const roles_routes = [
    {path:'/roles', name:'roles-index', component: Index, meta:{auth:true}},
    // {path:'/users/create', name:'users-create', component: UsersCreate, meta:{auth:true}},
    {path:'/roles/:id/view', name:'roles-view', component: View, meta:{auth:true}},
]

export default roles_routes