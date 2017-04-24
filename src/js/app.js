import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
Vue.use(VueRouter);
Vue.use(Vuex);
import routes from './routes.js';
import actions from './vuex/actions.js';
import getters from './vuex/getters.js';
import mutations from './vuex/mutations.js';

let router = new VueRouter({
    routes: routes
});

let store = new Vuex.Store({
    state: {
        servers: [],
        loading: true
    },
    actions,
    getters,
    mutations
});

console.log(router);


window.app = new Vue({
    data: {},
    computed: {
        loading(){
            return this.$store.state.loading;
        }
    },
    methods: {
        getSites(){
            // let request = new Request();
            fetch('https://forge.laravel.com/api/v1/servers', {
                method: 'GET',
                headers: {
                   'Content-Type': 'applicatoin/json',
                   'Accept': 'applicatoin/json',
                   'Authorization': 'Bearer ' + config.api_token
                },
                mode: 'cors',
                cache: 'default'
            })
                .then(r => {
                    console.log(r);

                    return r.json()
                })
                .then(r => {
                    console.log(r);
                    this.servers = r.servers;
                });
        }
    },
    mounted(){
        this.getSites()
        this.$store.dispatch('getServers')
    },
    router,
    store
}).$mount('#app');