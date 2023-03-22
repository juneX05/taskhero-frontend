import TasksIndex from "./TasksIndex.vue";
import TasksCreate from "./TasksCreate.vue";
import TasksView from "./TasksView.vue";
import MyTasks from "./MyTasks.vue";

const tasks_routes = [
    {path:'/tasks/index', name:'tasks-index', component: TasksIndex, meta:{auth:true}},
    {path:'/tasks/create', name:'tasks-create', component: TasksCreate, meta:{auth:true}},
    {path:'/tasks/:id/view', name:'tasks-view', component: TasksView, meta:{auth:true}},
    {path:'/my-tasks', name:'my-tasks', component: MyTasks, meta:{auth:true}},

]

export default tasks_routes