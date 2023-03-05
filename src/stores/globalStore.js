import {defineStore} from "pinia";
import icons from "../data/icons";
import menus from  "../data/menus"
import users from  "../data/users"
import tags from  "../data/tags"
import router from "../router.js";

export const useGlobalStore = defineStore("globalStore", {
    state: () => {
        return {
            preloader: true,
            loading: false,
            menus: menus,
            icons: icons,
            users: users,
            tags: tags,
        }
    },
    actions: {
        // since we rely on `this`, we cannot use an arrow function
        on() {
            this.preloader = true;
        },
        off() {
            this.preloader = false;
        },
        async login(request_data) {
            this.loading = true;
            try{
                const { data } = await axios.post('/spa/login', request_data);
                if (!data.status) {
                    this.loading = false;
                    return {status: false, message: data.message, errors: data.data}
                } else {
                    return data;
                }
            } catch (e) {
                console.log(e);
                this.loading = false;
                const response = e.response.data
                const response_errors = response.data
                let errors = {};

                //processing errors.
                Object.keys(response_errors).forEach( (key) => {
                    errors[key] = response_errors[key].join('<br/>')
                })
                return {status: false, message: response.message, errors: errors}
            }
        },
        async currentUser() {
            try{
                const { data } = await axios.get('/user');
                if (!data.status) {
                    return {status: false, message: data.message, errors: data.data}
                } else {
                    return data;
                }
            } catch (e) {
                console.log(e);
                const response = e.response.data

                return {status: false, message: response.message}
            }
        },
        async logout() {
            try{
                const { data } = await axios.post('/logout');
                if (!data.status) {
                    return {status: false, message: data.message, errors: data.data}
                } else {
                    return data;
                }
            } catch (e) {
                console.log(e);
                const response = e.response.data

                return {status: false, message: response.message}
            }
        },
    }
})