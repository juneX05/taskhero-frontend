import {defineStore} from "pinia";
import {makeId} from "../../../assets/js/utils/helpers.js";
import {useGlobalStore} from "../../../stores/globalStore.js";

export const useUsersStore = defineStore("usersStore", {
    state: () => {
        return {
            users: [],
            record:{},
            splash:{},
            loading: false
        }
    },
    getters:{
        validator: () => {
            return (data) => {
                let errors = {
                    count: 0,
                    data: {
                        name: '',
                        email: '',
                        password: '',
                        password_confirmation: '',
                        user_type_id: '',
                        role_id: '',
                    }
                };

                if (data.name === "" || data.name == null) {
                    errors.count++
                    errors.data.name = 'Name is required'
                }

                if (data.email === "" || data.name == null) {
                    errors.count++
                    errors.data.email = 'Email is required'
                }

                if (data.password === "" || data.password == null) {
                    errors.count++
                    errors.data.password = 'Password is required'
                }

                if (data.password_confirmation === "" || data.password_confirmation == null) {
                    errors.count++
                    errors.data.password_confirmation = 'Confirmation Password is required'
                }

                if (data.user_type_id === "" || data.user_type_id == null) {
                    errors.count++
                    errors.data.user_type_id = 'Please select user type'
                }

                if (data.role_id === "" || data.role_id == null) {
                    errors.count++
                    errors.data.role_id = 'Please select user role'
                }

                if (errors.data.password === '' && errors.data.password_confirmation === '' &&
                    (data.password !== data.password_confirmation)
                ) {
                    errors.count++
                    errors.data.password_confirmation = 'Confirm Password must match with Password entered.'
                }


                return errors
            }
        }
    },
    actions: {
        async getAllUsers() {
            const {data} = await axios.get('/users');
            this.users = data.data;
        },
        async getUser(id) {
            const url = '/users/' + id + '/view'
            const response = await useGlobalStore().sendRequest(url);
            if (response.status) this.record = response.data;
            console.log(response);
        },
        // since we rely on `this`, we cannot use an arrow function
        async save (data) {
            this.loading = true;
            const url = '/users/save'
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type,data);
        },
        async getSplashData() {
            const url = '/users/splash'
            const response = await useGlobalStore().sendRequest(url);
            if (response.status) this.splash = response.data;
            console.log(response);
        },
        async updateAccountDetails (id,data) {
            const url = '/users/' + id + '/update-account-details'
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type,data);
        },
        async completeUserRegistration (id) {
            const url = '/users/' + id + '/complete-user-registration'
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type);
        },
        async deactivateUser (id, data) {
            const url = '/users/' + id + '/deactivate'
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type, data);
        },
        async activateUser (id, data) {
            const url = '/users/' + id + '/activate'
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type, data);
        },
        async getAllPermissions() {
            const url = '/permissions'
            const type = 'get'
            return await useGlobalStore().sendRequest(url,type);
        },
        async getAllRoles() {
            const url = '/roles'
            const type = 'get'
            return await useGlobalStore().sendRequest(url,type);
        },
        async manageUserPermissions (id, data) {
            const url = '/users/' + id + '/change-permissions'
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type, data);
        },
        async manageUserRoles (id, data) {
            const url = '/users/' + id + '/change-roles'
            const type = 'post'
            return await useGlobalStore().sendRequest(url,type, data);
        },
    }
})