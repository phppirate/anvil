export default {
    getServers({commit, dispatch}){
        forge.servers()
            .then(r => {
                commit('set-servers', r)
                r.forEach(s => {
                    dispatch('getServerSites', s)
                })
            })
    },
    getServerSites({commit}, server){
        forge.sites(server.id)
            .then(r => {
                commit('add-sites', r.map(site => {
                    site.server_id = server.id;
                    return site;
                }))
                commit('ready')
            })
    },
    toggleQuickDeploy({commit}, {server, site}){
        if(site.quick_deploy){
            site.quick_deploy = false;
            commit('set-site', site)
            return forge.disableQuickDeploy(server.id, site.id);
        }
        site.quick_deploy = true;
        commit('set-site', site)
        return forge.enableQuickDeploy(server.id, site.id);
    }
}