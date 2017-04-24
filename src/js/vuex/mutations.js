export default {
    'set-servers': (state, servers) => {
        state.servers = servers;
    },
    'add-sites': (state, sites) => {
        state.sites.push(...sites);
    },
    ready(state){
        state.loading = false;
    },
    'set-site': (state, site) => {
        let theIndex = state.sites.findIndex(s => s.id === site.id);
        state.sites[theIndex] = site;
    },
}