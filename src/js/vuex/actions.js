export default {
    getServers({commit, dispatch}, account){
        console.log('Adding Servers: ', account)
        account.servers()
            .then(r => {
                let servers = r.map(server => {
                    server.account = account
                    return server
                })
                console.log(account.id, servers)
                commit('set-servers', r)
                r.forEach(s => {
                    dispatch('getServerSites', s)
                })
            })
    },
    getServerSites({commit}, server){
        server.account.sites(server.id)
            .then(r => {
                commit('add-sites', r.map(site => {
                    site.server_id = server.id;
                    site.account = server.account;
                    return site;
                }))
                commit('ready')
            })
    },
    toggleQuickDeploy({commit}, {server, site}){
        if(site.quick_deploy){
            site.quick_deploy = false;
            commit('set-site', site)
            return site.account.disableQuickDeploy(server.id, site.id);
        }
        site.quick_deploy = true;
        commit('set-site', site)
        return site.account.enableQuickDeploy(server.id, site.id);
    }
}
