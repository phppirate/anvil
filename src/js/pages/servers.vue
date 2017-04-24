<template>
    <div>
        <div class="titlebar">Servers</div>
        <div class="panel">
            <div class="panel-heading">Account #1</div>
            <ul class="list-group">
                <router-link tag="li" :to="'/servers/' + server.id" class="list-item flex" v-for="server in servers" :key="server.id">
                    <div class="list-item-title">{{ server.name }}</div>
                    <div class="small">{{ server.ip_address }}</div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {};
        },
        props: [],
        computed: {
            servers(){
                return this.$store.state.servers;
            }
        },
        methods: {}
    }
</script>