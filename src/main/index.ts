const MenuBuilder = require("./menu").default; // import the right click menu.
const { app, BrowserWindow } = require("electron"); // import electron
const { getAssetURL } = require("../../snowpack-cli/index"); // import the asset url getter
const path = require("path"); // import path module

// static resolve preloadjs
const PRELOAD_SCRIPT_PATH = path.resolve(__dirname, "../../src/preload.js");

// install the development plugin
const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [ 'REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS' ];
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
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: PRELOAD_SCRIPT_PATH
    },
  })
  if ( process.env.NODE_ENV !== 'production' ) {
    win.webContents.openDevTools();
  }

  win.loadURL(getAssetURL('index.html'));


  const menuBuilder = new MenuBuilder(win);
  menuBuilder.buildMenu();

  return win;
}

app.whenReady().then(async () => {

  const RealmDatabase = require("../services/db").default;
  const  RealmIpcHelper  = require("../services/db/helper").default;
  new RealmIpcHelper(new RealmDatabase());

  const main = await createWindow()
  main.webContents.on("did-frame-finish-load", async () => {
    if ( process.env.NODE_ENV === 'development' ) {
      await installExtensions();
    }
  });
}).catch(console.log)
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

