import icons from "./icons";

const menus = [
    {
        type: 'header',
        title: 'MENU',
        name: 'menu'
    },
    {
        type: 'link',
        link: '/dashboard',
        title: 'Dashboard',
        name: 'dashboard',
        icon: icons.dashboard
    },
    {
        type: 'link',
        link: '/my-tasks',
        title: 'My Tasks',
        name: 'my_tasks',
        icon: icons.home
    },
    {
        type: 'link',
        link: '#',
        title: 'Tasks',
        name: 'tasks',
        icon: icons.task,
        children: [
            {
                type: 'link',
                link: '/tasks/index',
                title: 'All Tasks',
                name: 'all_tasks',
                icon: icons.home
            },
            {
                type: 'link',
                link: '/tasks/create',
                title: 'Create Task',
                name: 'create_task',
                icon: icons.home
            }
        ]
    },
    {
        type: 'link',
        link: '#',
        title: 'Projects',
        name: 'projects',
        icon: icons.project,
        children: [
            {
                type: 'link',
                link: '/projects/index',
                title: 'All Projects',
                name: 'all_projects',
                icon: icons.home
            },
            {
                type: 'link',
                link: '/projects/create',
                title: 'Create Project',
                name: 'create_project',
                icon: icons.home
            }
        ]
    },
    {
        type: 'header',
        title: 'CONFIGURATIONS',
        name: 'menu',
    },
    {
        type: 'link',
        link: '#',
        title: 'Users',
        name: 'users',
        icon: icons.user,
        permission: 'view_users',
        children: [
            {
                type: 'link',
                link: '/users',
                title: 'All Users',
                name: 'all_users',
                icon: '',
                permission:'view_users',
            },
            {
                type: 'link',
                link: '/users/create',
                title: 'Create User',
                name: 'create_user',
                icon: '',
                permission:'create_user',
            }
        ]
    },
    {
        type: 'link',
        link: '/permissions',
        title: 'Permissions',
        name: 'permissions',
        icon: icons.lock,
        permission:'view_permissions',
    },
/*    {
        type: 'link',
        link: '#',
        title: 'Modules',
        name: 'modules',
        icon: icons.module,
        permission:'view_modules',
        children: [
            {
                type: 'link',
                link: '/modules/index',
                title: 'All Modules',
                name: 'all_modules',
                icon: '',
                permission:'view_modules',
            },
            {
                type: 'link',
                link: '/modules/create',
                title: 'Create Module',
                name: 'create_module',
                icon: '',
                permission:'create_modules',
            }
        ]
    },*/
    {
        type: 'link',
        link: '/roles',
        title: 'Roles',
        name: 'roles',
        icon: icons.role,
        permission:'view_roles'
    },
   /* {
        type: 'link',
        link: '/menus/manage_menus',
        title: 'Menus',
        name: 'menus',
        icon: icons.menu,
        permission:'manage_menus',
    },*/

]

export default menus