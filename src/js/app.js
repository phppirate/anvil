import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
Vue.use(VueRouter);
Vue.use(Vuex);
import routes from './routes.js';
import actions from './vuex/actions.js';
import getters from './vuex/getters.js';
import mutations from './vuex/mutations.js';
import Forge from './Forge.js';

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
            console.log(apiToken);
            let data = {
                api_token: apiToken
            };
            fs.writeFile(configPath, JSON.stringify(data), 'utf8', err => {
                window.location.reload();
                console.log(err);
            });
        },
        logOut(){
            fs.unlink(configPath, err => {
                window.location.reload();
                console.log(err);
            });
        }
    },
    mounted(){
        this.checkLoggedIn();
    },
    router,
    store
}).$mount('#app');