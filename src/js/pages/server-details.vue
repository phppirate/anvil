<template>
    <div>
        <div class="titlebar" v-if="server">
            <div class="backbtn" @click="back"><span class="fa fa-chevron-left"></span></div>
            {{ server.name }}
            <div class="spacer backbtn"><span class="fa fa-chevron-left"></span></div>
        </div>
        <div class="panel">
            <div class="panel-body">
                <button class="btn btn-block" @click="viewOnForge">View on Forge</button>
                <div>
                    <button class="btn is-success btn-block" @click="rebootServer" v-if="! rebooting">Reboot</button>
                    <button class="btn is-success btn-block disabled" v-else><span class="fa fa-spinner fa-pulse"></span></button>
                </div>
            </div>
        </div>

        <div class="panel">
            <div class="panel-heading">Sites</div>
            <ul class="list-group">
                <router-link tag="li" :to="'/servers/' + server.id + '/sites/' + site.id" class="list-item flex" v-for="site in sites" :key="site.id">
                    <div class="list-item-title">{{ site.name }}</div>
                    <div class="small" v-html="getSiteApp(site)"></div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            rebooting: false
        }),
        computed: {
            server(){
                let server = this.$store.getters.getServerById(this.$route.params.server_id);
                console.log(server);
                return server;
            },
            sites(){
                return this.$store.getters.getSitesForServer(this.server);
            }
        },
        props: [],
        methods: {
            back(){
                return this.$router.push('/servers')
            },
            viewOnForge(){
                shell.openExternal('https://forge.laravel.com/servers/' + this.server.id);
            },
            rebootServer(){
                this.rebooting = true;
                forge.rebootServer(this.server)
                    .then(r => {
                        this.rebooting = false;
                    });
            },
            getSiteApp(site){
                if(site.app){
                    if(site.app === 'WordPress'){
                        return `<span class="fa fa-wordpress"></span>`
                    }

                    return `<span class="fa fa-question-circle-o"></span>`
                } else if(site.repository_provider){
                    if(site.repository_provider === 'gitlab'){
                        return `<span class="fa fa-gitlab"></span>`
                    }
                    if(site.repository_provider === 'github'){
                        return `<span class="fa fa-github"></span>`
                    }

                    return `<span class="fa fa-question-circle-o"></span>`
                }

                return `<span class="fa fa-times-circle-o"></span>`
            }
        }
    }
</script>