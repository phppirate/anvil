<template>
    <div>
        <div class="titlebar">
            <div class="backbtn" @click="back"><span class="fa fa-chevron-left"></span></div>
            ENV File
            <div class="backbtn" v-if="! saving" @click="save"><span class="fa fa-check"></span></div>
            <div class="backbtn" v-else><span class="fa fa-spinner fa-pulse"></span></div>
        </div>
        <div class="codeview">
            <input type="hidden" :value="site.name">
            <textarea v-model="env"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            env: null,
            saving: true
        }),
        computed: {
            server(){
                let server = this.$store.getters.getServerById(this.$route.params.server_id);
                return server;
            },
            site(){
                let site = this.$store.getters.getSiteById(this.$route.params.site_id)
                if(! this.env){
                    this.getEnv(site)
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
                forge.updateSiteEnvironmentFile(this.server.id, this.site.id, this.env)
                    .then(r => {
                        // this.env = r;
                        this.back()
                    });
            },
            getEnv(site){
                forge.siteEnvironmentFile(this.server.id, site.id)
                    .then(r => {
                        console.log(r);
                        this.env = r;
                        this.saving = false;
                    });
            }
        },
        mounted(){
        }
    }
</script>
