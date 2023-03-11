import Dashboard from "./Dashboard.vue";

const dashboard_routes = [
    {path:'/dashboard', name:'dashboard', component: Dashboard, meta:{auth:true}},
]

export default dashboard_routes