import {defineStore} from "pinia";
import icons from "../data/icons";
import menus from "../data/menus"
import users from "../data/users"
import tags from "../data/tags"

export const useGlobalStore = defineStore("globalStore", {
    state: () => {
        return {
            preloader: true,
            loading: false,
            menus: menus,
            icons: icons,
            users: users,
            tags: tags,
            user: {},
            permissions: [],
            dashboard_data: [],
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

            const response = await this.sendRequest('/spa/login', 'post', request_data)
            if (!response.status) {
                this.loading = false;
                return response;
            }

            return response;
        },
        async currentUser() {
            const response = await this.sendRequest('/user')
            if (!response.status) {
                return response;
            }

            const response_data = response.data;
            this.user = response_data.user;
            this.permissions = response_data.permissions;
            return response;
        },
        async logout() {
            return await this.sendRequest('/logout', 'post');
        },
        async sendRequest(request_url, request_method = 'get', request_data = null) {
            try{
                let response = null;
                if (request_method === 'post') {
                    response = await axios.post(request_url, request_data);
                } else {
                    response = await axios.get(request_url, request_data);
                }

                const { data } = response;

                if (data.status === false) {
                    return {status: false, message: data.message, errors: data.data}
                } else {
                    return data;
                }
            } catch (e) {
                console.log(e);
                if (e.code === "ERR_NETWORK") {
                    return {status: false, message: "Could Not Connect to the Server."}
                }

                if (e.request.status === 422) {
                    const response = e.response.data
                    const response_errors = response.data
                    let errors = {};
                    //processing errors.
                    Object.keys(response_errors).forEach( (key) => {
                        errors[key] = response_errors[key].join('<br/>')
                    })
                    return {status: false, message: "ERR_VALIDATION", errors: errors}
                }
                let message = 'An Error Occurred';
                if (e.response.data) {
                    message = e.response.data.message;
                }

                return {status: false, message: message}
            }
        },
        async dashboard() {
            return await this.sendRequest('/dashboard')
        },
    }
})