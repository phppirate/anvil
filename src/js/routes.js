export default [
    { path: '/', redirect: '/servers' },
    { path: '/servers', component: require('./pages/servers') },
    { path: '/servers/:server_id', component: require('./pages/server-details') },
    { path: '/servers/:server_id/sites/:site_id', component: require('./pages/site-details') },
    { path: '/servers/:server_id/sites/:site_id/deployment/script', component: require('./pages/site-deployment-edit') },
    { path: '/servers/:server_id/sites/:site_id/env', component: require('./pages/site-env-edit') },
]
