import {defineStore} from "pinia";

export const userData = defineStore('userData', {
    state: () => {
        return {
            login: null,
            authToken: null
        }
    },
    actions: {
        setLogin (login) {
            this.login = login;
        },
        setAuthToken (token) {
            this.authToken = token;
        }
    },
    getters: {
        getLogin: (state) => {
            return state.login;
        },
        getAuthToken: (state) => {
            return state.authToken;
        }
    }
});