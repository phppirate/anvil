<template>
    <div>
        <div class="titlebar"><div style="width: 32px"></div>
            Servers
            <router-link tag="div" to="/add-account" class="backbtn"><span class="fa fa-plus"></span></router-link>
        </div>
        <div class="panel" v-for="(group, index) in serverGroups">
            <div class="panel-heading">{{ index }}</div>
            <ul class="list-group">
                <router-link tag="li" :to="'/servers/' + server.id" class="list-item flex" v-for="server in group" :key="server.id">
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
                return this.$store.state.servers
            },
            archivedServers(){
                return this.servers.filter(server => server.revoked);
            },
            serverGroups(){
                let servers = null
                if(this.showingArchived) {
                    servers = this.servers
                }
                servers = this.servers.filter(server => !server.revoked)
                let groups =  _.groupBy(servers, function(i) {
                    return i.account.name
                });
                console.log()
                return groups;
            }
        },
        methods: {}
    }
</script>
