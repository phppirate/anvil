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
    </div>
</template>

<script>
import Forge from '../Forge.js';
let forge = config ? new Forge(config.api_token) : null;

    export default {
        data(){
            return {};
        },
        computed: {
            server(){
                let server = this.$store.getters.getServerById(this.$route.params.server_id);
                return server;
            },
            site(){
                return this.$store.getters.getSiteById(this.$route.params.site_id);
            }
        },
        props: [],
        methods: {
            back(){
                return this.$router.push('/servers/' + this.server.id)
            },
            visitSite(){
                console.log('Opening', shell);
                shell.openExternal('http://' + this.site.name);
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
            }
        }
    }
</script>