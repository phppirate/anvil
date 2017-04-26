let baseRequest = (method, path, token, body = null) => {
    return fetch('https://forge.laravel.com/api/v1/' + path, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body
    }).then(r => r.json())
}
let noResponseRequest = (method, path, token, body = null) => {
    return fetch('https://forge.laravel.com/api/v1/' + path, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body
    })
}
let envRequest = (method, path, token, body = null) => {
    return fetch('https://forge.laravel.com/api/v1/' + path, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: body
    }).then(r => r.text())
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

    // Server Actions
    rebootServer(server){
        return noResponseRequest('POST', `servers/${server.id}/reboot`, this.token)
    }

    // Site Actions
    deployServerSite(server, site){
        return baseRequest('POST', `servers/${server.id}/sites/${site.id}/deployment/deploy`, this.token)
    }

    enableQuickDeploy(server, site){
        return baseRequest('POST', `servers/${server.id}/sites/${site.id}/deployment`, this.token)
    }

    disableQuickDeploy(server, site){
        return baseRequest('DELETE', `servers/${server.id}/sites/${site.id}/deployment`, this.token)
    }

    getDeployScriptForSite(site){
        return envRequest('GET', `servers/${site.server_id}/sites/${site.id}/deployment/script`, this.token)
    }

    saveDeployScriptForSite(site, script){
        return envRequest('PUT', `servers/${site.server_id}/sites/${site.id}/deployment/script`, this.token, JSON.stringify({ content: script }))
    }

    getEnvForSite(site){
        return envRequest('GET', `servers/${site.server_id}/sites/${site.id}/env`, this.token)
    }

    saveEnvForSite(site, script){
        return envRequest('PUT', `servers/${site.server_id}/sites/${site.id}/env`, this.token, JSON.stringify({ content: script }))
    }
}
