<template>
    <div>
        <div class="titlebar">
            <div class="backbtn" @click="back"><span class="fa fa-chevron-left"></span></div>
            Add Account
            <div class="backbtn"></div>
        </div>

        <div class="panel">
            <div class="panel-heading">New Account Info</div>
            <div class="panel-body">
                <div>
                    <input v-model="name" class="form-control" type="text" ref="name" name="name" id="name" placeholder="Account Identifier">
                    <input v-model="apiToken" class="form-control" type="text" ref="token" name="api_token" id="api_token" placeholder="API Token">
                    <div class="help-text"><a href="#" @click.prevent="openExternal('https://forge.laravel.com/user/profile#/api')">Get one here</a></div>
                </div>
                <div>
                    <button class="btn is-success btn-block" @click="logIn" v-if="! connecting">Connect</button>
                    <button class="btn is-success btn-block disabled" v-else><span class="fa fa-spinner fa-pulse"></span></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            name: null,
            apiToken: null,
            connecting: false
        }),
        computed: {},
        props: [],
        methods: {
            back(){
                return this.$router.push('/')
            },
            logIn(){
                let data = {api_token: this.apiToken, name: this.name};
                accounts.push(data)
                localStorage.setItem('accounts', JSON.stringify(accounts));
                window.location.reload();
            }
        },
        mounted(){
        }
    }
</script>
