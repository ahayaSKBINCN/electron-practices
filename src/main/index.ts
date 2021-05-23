const { app, BrowserWindow } = require("electron");
const { getAssetURL } = require("../../snowpack-cli/index")


// install the development plugin
const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

async function createWindow() {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
    },
  })
  if ( process.env.NODE_ENV !== 'production' ) {
    win.webContents.openDevTools();
  }
  win.loadURL(getAssetURL('index.html'));
  return win;
}

app.whenReady().then(createWindow)
app.on("activate", () => {
  if ( BrowserWindow.getAllWindows().length === 0 ) {
    createWindow().then((win) => win.loadURL(getAssetURL('index.html')))
  }
})

app.on('window-all-closed', () => {
  if ( process.platform !== 'darwin' ) {
    app.quit()
  }
})
