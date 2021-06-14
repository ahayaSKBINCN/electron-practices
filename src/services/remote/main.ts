// for main process
const {
  ipcMain
} = require("electron");

ipcMain.on("remote-sync", function remoteHandler(event, scripts:string) {
  // todo change the eval to string function
  event.returnValue = eval(scripts);
})

ipcMain.on("remote", async function remoteHandler(event, scripts:string){
  // todo change the eval to string function
  const returns = await eval(scripts);
})
