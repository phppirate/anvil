import Forge from '../Forge.js';

let forge = new Forge(config.api_token);

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
                console.log('FOREACH',server);
                commit('set-sites-for-server', {'sites': r.sites, server})
                commit('ready')
            })
    }
}