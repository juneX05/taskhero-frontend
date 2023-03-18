import Index from "./PermissionsIndex.vue";
// import View from "./PermissionsView.vue";

const permissions_routes = [
    {path:'/permissions', name:'permissions-index', component: Index, meta:{auth:true}},
    // {path:'/roles/:id/view', name:'permissions-view', component: View, meta:{auth:true}},
]

export default permissions_routes