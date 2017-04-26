<template>
    <div v-if="server">
        <div class="titlebar" v-if="site">
            <div class="backbtn" @click="back"><span class="fa fa-chevron-left"></span></div>
            {{ site.name }}
            <div class="spacer backbtn"><span class="fa fa-chevron-left"></span></div>
        </div>
        <div class="panel">
            <div class="panel-body">
                <button class="btn btn-block" @click="visitSite">Visit Site</button>
                <button class="btn btn-block" @click="viewOnForge">View on Forge</button>

                <div class="deployment" v-if="site.app != 'WordPress'">
                    <button class="btn is-success btn-block" @click="deployNow">Deploy Now</button>
                    <button class="btn btn-block" v-if="! site.quick_deploy" @click="toggleQuickDeploy">Enable Quick Deploy</button>
                    <button class="btn is-success btn-block" v-else @click="toggleQuickDeploy">Disble Quick Deploy</button>
                </div>
                <div v-else class="text-center">
                    <h3><span class="fa fa-wordpress"></span> WordPress Site</h3>
                </div>
            </div>
        </div>

        <div class="panel" v-if="site.app != 'WordPress'">
            <div class="panel-heading">
                <div class="title">Deploy Script</div>
                <div class="icon" @click="editDeployScript"><span class="fa fa-pencil"></span></div>
            </div>
            <!-- <div class="panel-body">
                <code><pre>{{ deployScript }}</pre></code>
            </div> -->
        </div>

        <div class="panel" v-if="site.app != 'WordPress'">
            <div class="panel-heading">
                <div class="title">ENV File</div>
                <router-link class="icon" :to="'/servers/' + server.id + '/sites/' + site.id + '/env'"><span class="fa fa-pencil"></span></router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            deployScript: null
        }),
        computed: {
            server(){
                let server = this.$store.getters.getServerById(this.$route.params.server_id);
                return server;
            },
            site(){
                let site = this.$store.getters.getSiteById(this.$route.params.site_id)
                if(! this.deployScript){
                    // this.getDeployScript(site)
                }
                return site
            }
        },
        props: [],
        methods: {
            back(){
                return this.$router.push('/servers/' + this.server.id)
            },
            getDeployScript(site){
                forge.getDeployScriptForSite(site)
                    .then(r => {
                        console.log(r);
                        this.deployScript = r;
                    });
            },
            visitSite(){
                console.log('Opening', shell);
                shell.openExternal('http://' + this.site.name);
            },
            viewOnForge(){
                console.log('Opening', shell);
                shell.openExternal('https://forge.laravel.com/servers/' + this.server.id + '/sites/' + this.site.id);
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
            },
            deployNow(){
                forge.deployServerSite(this.server, this.site);
            },
            toggleQuickDeploy(){
                // this.site.quick_deploy = !this.site.quick_deploy;
                this.$store.dispatch('toggleQuickDeploy', {server: this.server, site: this.site});
            },
            editDeployScript(){
                this.$router.push('/servers/' + this.server.id + '/sites/' + this.site.id + '/deployment/script')
            },
            shouldGetDeployScript(){
                if(this.site.app != "WordPress"){
                    return true;
                }
                return false;
            }
        }
    }
</script>
