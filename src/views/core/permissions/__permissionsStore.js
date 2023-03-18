import {defineStore} from "pinia";
import {useGlobalStore} from "../../../stores/globalStore.js";

const URL = '/permissions';

export const usePermissionsStore = defineStore("permissionsStore", {
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
            const {data} = await axios.get(URL);
            this.records = data.data;
        },
        async getRecord(id) {
            const url = `${URL}/${id}/view`
            const response = await useGlobalStore().sendRequest(url);
            if (response.status) this.record = response.data;
        },
        // since we rely on `this`, we cannot use an arrow function
        async save (data) {
            this.loading = true;
            const url = `${URL}/save`
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type,data);
        },
        async getSplashData() {
            const url = `${URL}/splash`
            const response = await useGlobalStore().sendRequest(url);
            if (response.status) this.splash = response.data;
            console.log(response);
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
        async managePermissions (id, data) {
            const url = `${URL}/${id}/change-permissions`
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type, data);
        },
        async getPermissions (id) {
            const url = `${URL}/${id}/get-permissions`
            const type = 'get'
            return await useGlobalStore().sendRequest(url,type);
        },
        async manageUserRoles (id, data) {
            const url = `${URL}/${id}/change-roles`
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type, data);
        },
    }
})