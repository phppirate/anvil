export default {
    getServerById: (state) => (id) => {
        return state.servers.find(s => s.id.toString() === id);
    }
}