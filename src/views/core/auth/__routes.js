import Login from "./Login.vue";
import ForgotPassword from "./ForgotPassword.vue";

const auth_routes = [
    {path:'/', name:'login', component: Login, meta:{auth:false}},
    {path:'/forgot-password', name:'forgot-password', component: ForgotPassword, meta:{auth:false}},
]

export default auth_routes