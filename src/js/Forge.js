let baseRequest = (method, path, token) => {
    return fetch('https://forge.laravel.com/api/v1/' + path, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(r => r.json())
}

export default class Forge {
    constructor(token){
        this.token = token
    }
    getServers(){
        return baseRequest('GET', 'servers', this.token)
    }
    getSites(server){
        return baseRequest('GET', 'servers/' + server.id + '/sites', this.token)
    }
}