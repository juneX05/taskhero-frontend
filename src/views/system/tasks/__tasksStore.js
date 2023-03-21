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
            const response = await useGlobalStore().sendRequest(url);
            if (response.status) this.record = response.data;
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
        async activate (id, data) {
            const url = `${URL}/${id}/activate`
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type, data);
        },
        async deactivate (id, data) {
            const url = `${URL}/${id}/deactivate`
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type, data);
        },
    }
})