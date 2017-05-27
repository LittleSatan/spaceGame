const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
let win

function createWindow() {
    win = new BrowserWindow({ closable: true, center: true, width: 1280, height: 720, minWidht: 800, minheight: 600, icon: __dirname + '/icon.ico', backgroundColor: 'black' })
    win.setMenu(null);

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'content/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg);
    event.sender.send('asynchronous-reply', 'pong');
})

ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg);
    event.returnValue = 'pong';
})