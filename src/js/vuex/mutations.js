export default {
    'set-servers': (state, servers) => {
        state.servers = servers;
    },
    'set-sites-for-server': (state, {sites, server}) => {
        let serverIndex = state.servers.findIndex(s => {
            console.log(s);
            return s.id == server.id
        });
        server['sites'] = sites;
        state.servers[serverIndex] = server;
    },
    ready(state){
        state.loading = false;
    }
}