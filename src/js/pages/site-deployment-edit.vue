<template>
    <div>
        <div class="titlebar">
            <div class="backbtn" @click="back"><span class="fa fa-chevron-left"></span></div>
            Deploy Script
            <div class="backbtn" v-if="! saving" @click="save"><span class="fa fa-check"></span></div>
            <div class="backbtn" v-else><span class="fa fa-spinner fa-pulse"></span></div>
        </div>
        <div class="codeview">
            <input type="hidden" :value="site.name">
            <textarea :value="deployScript" ref="deployScriptBox"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            deployScript: null,
            saving: true
        }),
        computed: {
            server(){
                let server = this.$store.getters.getServerById(this.$route.params.server_id);
                return server;
            },
            site(){
                let site = this.$store.getters.getSiteById(this.$route.params.site_id)
                console.log(site);
                if(! this.deployScript){
                    this.getDeployScript(site)
                }
                return site
            }
        },
        props: [],
        methods: {
            back(){
                return this.$router.push('/servers/' + this.server.id + '/sites/' + this.site.id)
            },
            save(){
                this.saving = true;
                forge.updateSiteDeploymentScript(this.server.id, this.site.id, this.$refs.deployScriptBox.value)
                    .then(r => {
                        this.$router.push('/servers/' + this.server.id + '/sites/' + this.site.id)
                    });
            },
            getDeployScript(site){
                console.log('SITE', site.id);
                forge.siteDeploymentScript(this.server.id, site.id)
                    .then(r => {
                        console.log(r);
                        this.deployScript = r;
                        this.saving = false;
                    });
            }
        },
        mounted(){
        }
    }
</script>
