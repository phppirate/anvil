export default {
    getServerById: (state) => (id) => {
        return state.servers.find(s => s.id.toString() === id);
    },
    getSitesForServer: (state) => (server) => {
        return state.sites.filter(s => s.server_id === server.id);
    },
    getSiteById: (state) => (id) => {
        return state.sites.find(s => s.id.toString() === id);
    }
}