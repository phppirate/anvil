import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
Vue.use(VueRouter);
Vue.use(Vuex);
import routes from './routes.js';
import actions from './vuex/actions.js';
import getters from './vuex/getters.js';
import mutations from './vuex/mutations.js';
import Forge from 'forge-sdk';

window.forge = config ? new Forge(config.api_token) : null;

let router = new VueRouter({
    routes: routes
});

let store = new Vuex.Store({
    state: {
        servers: [],
        sites: [],
        loading: true
    },
    actions,
    getters,
    mutations
});

console.log(router);


window.app = new Vue({
    data: {
        isOnline: false,
        isLoggedIn: false,
        connecting: false
    },
    computed: {
        loading(){
            return this.$store.state.loading;
        }
    },
    methods: {
        getData(){
            this.$store.dispatch('getServers')
        },
        checkLoggedIn(){
            this.isLoggedIn = loggedIn;
            if(this.isLoggedIn){
                this.getData();
            }
        },
        logIn(){
            let apiToken = this.$refs.token.value;
            let data = {
                api_token: apiToken
            };
            localStorage.setItem('config', JSON.stringify(data));
            window.location.reload();
        },
        logOut(){
            localStorage.removeItem('config');
            window.location.reload();
        },
        listen(){
            // Handle the Case that a user is Offline
            // So you don't Just see Infinate Spinner
            // We are checking net status before load
            this.isOnline = window.navigator.onLine;
            window.addEventListener('online', () => this.isOnline = true);
            window.addEventListener('offline', () => this.isOnline = false);
        }
    },
    mounted(){
        this.listen();
        this.checkLoggedIn();
    },
    router,
    store
}).$mount('#app');