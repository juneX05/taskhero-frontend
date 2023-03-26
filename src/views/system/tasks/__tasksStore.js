import {defineStore} from "pinia";
import {useGlobalStore} from "../../../stores/globalStore.js";

const URL = '/tasks';

export const useTasksStore = defineStore("tasksStore", {
    state: () => {
        return {
            records: [],
            record:{},
            splash:{},
            loading: false
        }
    },
    actions: {
        async getAllData() {
            return await useGlobalStore().sendRequest(URL);
        },
        async getRecord(id) {
            const url = `${URL}/${id}/view`
            return await useGlobalStore().sendRequest(url);
        },
        // since we rely on `this`, we cannot use an arrow function
        async save (data) {
            let formdata = new FormData();
            Object.keys(data).forEach( (item) => {
                formdata.append(item, data[item]);
            })
            this.loading = true;
            const url = `${URL}/save`
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type,formdata);
        },
        async getSplashData() {
            const url = `${URL}/splash`
            return await useGlobalStore().sendRequest(url);
        },
        async update (id,data) {
            const url = `${URL}/${id}/update`
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type,data);
        },
        async deactivate (id, data) {
            const url = `${URL}/${id}/deactivate`
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type, data);
        },
        async getMyTasks () {
            const url = `${URL}/my-tasks`
            const type = 'get'
            return await useGlobalStore().sendRequest(url,type);
        },
        async completeTask (id, data) {
            const url = `${URL}/${id}/complete-task`
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type, data);
        },
        async reOpenTask (id, data) {
            const url = `${URL}/${id}/re-open-task`
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type, data);
        },
        async getTaskHistory (id) {
            const url = `/logs/Tasks/${id}/history`
            const type = 'get'
            return await useGlobalStore().sendRequest(url,type);
        },
    }
})