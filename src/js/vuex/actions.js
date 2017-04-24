import Forge from '../Forge.js';

let forge = config ? new Forge(config.api_token) : null;

export default {
    getServers({commit, dispatch}){
        forge.getServers()
            .then(r => {
                commit('set-servers', r.servers)
                r.servers.forEach(s => {
                    dispatch('getServerSites', s)
                })
            })
    },
    getServerSites({commit}, server){
        forge.getSites(server)
            .then(r => {
                commit('add-sites', r.sites.map(site => {
                    site.server_id = server.id;
                    return site;
                }))
                commit('ready')
            })
    },
    toggleQuickDeploy({commit}, {server, site}){
        if(site.quick_deploy){
            site.quick_deploy = false;
            commit('set-server-site', {server, site})
            return forge.disableQuickDeploy(server, site);
        }
        site.quick_deploy = true;
        commit('set-site', site)
        return forge.enableQuickDeploy(server, site);
    }
}