<template>
    <div>
        <div class="titlebar"><div></div>Servers<div></div></div>
        <div class="panel">
            <div class="panel-heading">Account #1</div>
            <ul class="list-group">
                <router-link tag="li" :to="'/servers/' + server.id" class="list-item flex" v-for="server in filteredList" :key="server.id">
                    <div class="list-item-title"><span class="fa fa-ban" v-show="server.revoked"></span> {{ server.name }}</div>
                    <div class="small">{{ server.ip_address }}</div>
                </router-link>
            </ul>
            <div class="panel-body" style="border-top: 1px solid #efefef" v-if="archivedServers.length">
                <button class="btn is-primary btn-block" @click="showingArchived = !showingArchived">{{ showingArchived ? 'Hide' : 'Show' }} Archived Servers</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            showingArchived: false
        }),
        props: [],
        computed: {
            servers(){
                return this.$store.state.servers;
            },
            archivedServers(){
                return this.servers.filter(server => server.revoked);
            },
            filteredList(){
                if(this.showingArchived) return this.servers
                return this.servers.filter(server => !server.revoked);
            }
        },
        methods: {}
    }
</script>