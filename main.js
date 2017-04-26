let electron = require('electron')
let app = electron.app
let {Menu} = electron;
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
    // let template  = [
    //     {
    //         label: "Anvil",
    //         submenu: [
    //             {
    //                 role: 'about'
    //             },
    //             {
    //                 role: 'reload'
    //             },
    //             {
    //                 role: 'copy'
    //             },
    //             {
    //                 role: 'paste'
    //             },
    //             {
    //                 role: 'quit'
    //             }
    //         ]
    //     }
    // ];

    // let menu = Menu.buildFromTemplate(template);
    // Menu.setApplicationMenu(menu);
})