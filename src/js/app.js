import Vue from 'vue';


const app = new Vue({
    data: {
        servers: []
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
        this.getSites();
    }
}).$mount('#app');