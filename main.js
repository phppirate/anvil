let electron = require('electron')
let app = electron.app
var menubar = require('menubar')


var mb = menubar({
    width: 300,
    height: 500,
    preloadWindow: true,
    tooltip: "Anvil",
    index: 'file://' + __dirname + "/app/index.html",
    icon: __dirname + "/app/icons/icon.png",
    transparent: true
});

mb.on('ready', () => {
    // console.log('Some Item', mb.window)
    // your app code here
})