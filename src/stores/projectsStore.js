import {defineStore} from "pinia";
import projects from "../data/projects";
import categories from "../data/categories.js";
import {makeId} from "../assets/js/utils/helpers.js";

export const useProjectsStore = defineStore("projectsStore", {
    state: () => {
        return {
            projects: projects,
            categories: categories,
        }
    },
    getters:{
        getItemById: (state) => {
            return (id) => {
                const index = state.projects.findIndex( item => item.id == id );
                if (index !== -1)  return state.projects[index];
                return null
            }
        },
        validator: () => {
            return (data) => {
                let errors = {
                    count: 0,
                    data: {
                        title: '',
                        description: '',
                        assigned: '',
                        priority: '',
                        image: '',
                    }
                };

                if (data.title == "" || data.title == null || data.title == undefined) {
                    errors.count++
                    errors.data.title = 'Title is required'
                }

                if (data.description == "" || data.description == null || data.description == undefined) {
                    errors.count++
                    errors.data.description = 'Description is required'
                }

                if (data.assigned == null || data.assigned.length == 0) {
                    errors.count++
                    errors.data.assigned = 'Please select atleast one user'
                }

                if (data.priority == null || data.priority == "" ) {
                    errors.count++
                    errors.data.priority = 'Please select priority'
                }

                if (data.image == null || data.image == "" ) {
                    errors.count++
                    errors.data.image = 'Please upload an image or logo for the project'
                }

                return errors
            }
        }
    },
    actions: {
        // since we rely on `this`, we cannot use an arrow function
        save (data) {
            data.id = 'project-' + makeId(16)
            this.projects.push(data)
        }
    },
    persist: true
})