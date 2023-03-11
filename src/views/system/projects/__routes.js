import ProjectsIndex from './ProjectsIndex.vue'
import ProjectsCreate from './ProjectsCreate.vue'
import ProjectsView from './ProjectsView.vue'
import ProjectsBoard from './ProjectsBoard.vue'

const projects_routes = [
    {path:'/projects/index', name:'projects-index', component: ProjectsIndex, meta:{auth:true}},
    {path:'/projects/create', name:'projects-create', component: ProjectsCreate, meta:{auth:true}},
    {path:'/projects/:id/view', name:'projects-view', component: ProjectsView, meta:{auth:true}},
    {path:'/projects/:id/board', name:'projects-board', component: ProjectsBoard, meta:{auth:true}},
]

export default projects_routes