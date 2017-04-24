<template>
    <div>
        <div class="titlebar" v-if="server">{{ server.name }}</div>
        <div class="panel">
            <div class="panel-heading">Sites</div>
            <ul class="list-group">
                <li class="list-item" v-for="site in sites">
                    <div class="list-item-title">{{ site.name }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {};
        },
        computed: {
            server(){
                let server = this.$store.getters.getServerById(this.$route.params.server_id);
                console.log(server);
                return server;
            },
            sites(){
                return this.server.sites;
            }
        },
        props: [],
        methods: {}
    }
</script>